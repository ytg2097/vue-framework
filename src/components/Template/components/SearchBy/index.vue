<template>
  <div class="filter-container">
    <!--<div class="title title-lv2">Search By</div>-->
    <el-form v-if="filterItems && filterItems.length>0" class="filter-form" label-position="top" :inline="true">
      <template v-for="item in filterItems">
        <el-form-item :key="item.field" :label="item.label" :class="{'is-required':item.mandatory}">
          <el-input v-if="item.type === 'input'" :ref="item.field" v-model="item.value" :placeholder="item.placeholder" class="filter-item" />
          <el-select v-else-if="item.type === 'select'" :ref="item.field" v-model="item.value" class="filter-item">
            <el-option label="All" value="" />
            <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
          <el-autocomplete
            v-else-if="item.type === 'autocomplete'"
            :ref="item.field"
            v-model="item.queryText"
            value-key="name"
            :fetch-suggestions="item.querySearch"
            placeholder="All"
            @change.native="item.value = ''"
            @select="(selectItem)=>item.value = selectItem.id"
          />
          <el-date-picker
            v-else-if="item.type === 'datePicker'"
            :ref="item.field"
            v-model="item.value"
            type="daterange"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            :picker-options="item.pickerOptions"
          />
        </el-form-item>
      </template>
      <el-form-item v-if="filterItemsMore.length>0" class="no-label">
        <el-button class="filter-item" icon="el-icon-more" type="primary" @click="handlerScreeningOpen" />
      </el-form-item>
      <el-form-item class="no-label">
        <el-button v-waves class="filter-item" style="width:150px" type="primary" @click="handlerSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <Dialog title="Screening" :visible.sync="showMoreDialog" width="25%" class="filter-more">
      <div v-for="item in innerItemsMore" :key="item.field" class="filter-more-row">
        <el-checkbox v-model="item.checked">{{ item.label }}</el-checkbox>
        <el-select v-model="item.value">
          <el-option label="All" value="" />
          <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </div>
      <div slot="footer">
        <el-button @click="handlerClear">Clear</el-button>
        <el-button type="primary" @click="handlerConfirm">确认</el-button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import Dialog from '@/components/Dialog/index'
import { deepClone } from '@/utils'

export default {
  name: 'SerachBy',
  directives: { waves },
  components: { Dialog },
  props: {
    /**
      * 过滤条件
      * type:  input、select、autocomplete
      * field: 传递给后台的字段名称
      * value：传递给后台的值
      * text:  用于前台显示的文本值
      * label: 标题
      * options: [value,label]
      * placeholder: 占位文字
      * querySearch: autocomplete时使用，queryString, cb -> cb(results);
      */
    filterItems: {
      type: Array,
      default: () => []
    },
    filterItemsMore: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showMoreDialog: false,
      innerItemsMore: []
    }
  },
  computed: {
    mandatoryFields() {
      return this.filterItems.filter(i => i.mandatory)
    }
  },
  created() {
  },
  methods: {
    validateForm() {
      let valid = true
      this.mandatoryFields.forEach(item => {
        if (!item.value) {
          valid = false
          this.$refs[item.field][0].focus()
          return
        }
      })
      return valid
    },
    handlerSearch() {
      if (this.validateForm()) {
        this.$emit('search')
      }
    },
    handlerClear() {
      this.innerItemsMore.forEach(item => item.checked = false)
    },
    handlerConfirm() {
      this.showMoreDialog = false
      this.$emit('update:filterItemsMore', deepClone(this.innerItemsMore))
    },
    handlerScreeningOpen() {
      this.innerItemsMore = deepClone(this.filterItemsMore)
      this.showMoreDialog = true
    }
  }
}
</script>
<style lang="scss" scoped>
  .filter-container /deep/ {
    margin-top:10px;
    margin-bottom: 20px;
    padding: 20px;
    background-color: #fff;

    .title{
      margin-bottom: 10px;
    }

    .filter-form{
      .filter-item {
        display: inline-block;
        vertical-align: middle;
      }

      .el-form-item.no-label{
        vertical-align: bottom;
      }

      .el-form-item--small.el-form-item{
        margin-bottom: 0;
      }

      .el-input__inner{
          width: 240px;
      }
    }

    .filter-more{
      .filter-more-row{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }
    }

  }
</style>
