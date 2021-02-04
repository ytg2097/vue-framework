<template>
  <el-card class="card-box">
    <div slot="header" class="clearfix">
      <span class="title-lv2">{{ title }}</span>
    </div>
    <el-form label-position="top" :inline="true">
      <el-row v-for="(row,index) in items" :key="index" :gutter="20" type="flex" justify="space-between">
        <el-col v-for=" item in row" :key="item.field" :span="5">
          <el-form-item :label="item.label">
            <el-input v-if="item.type=='input'" v-model="item.value" :disabled="item.readonly" />
            <el-select v-else-if="item.type == 'select'" v-model="item.value">
              <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="row.length == 2" :span="5">
          <el-form-item>
            <div>caoleia</div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'XCard',
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .card-box /deep/{
    margin-top:10px;
    .el-form-item{
       width: 100%;
      .el-input__inner{
        width: 100%;
      }
    }
  }
</style>
