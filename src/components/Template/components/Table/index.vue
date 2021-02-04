<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="table-container">
    <div class="title-box">
      <!--<span class="title title-lv2">{{ title }} List</span>-->
      <slot name="table-header"/>
    </div>
    <el-table
      :key="key"
      v-loading="listLoading"
      :data="data"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      header-cell-class-name="header-cell"
      @select="handlerSelect"
      @select-all="handlerSelectAll"
      :tree-props="treeProps"
    >
      <template v-if="tableColumns">
        <el-table-column
          v-for="(column,index) in tableColumns"
          :key="index"
          :type="column.type"
          :label="column.label"
          :prop="column.prop"
          align="center"
          :formatter="column.formatter"
        >
          <template v-if="column.radioFunction" v-slot:default="{row}">
            <div class="center-box">
              <em :class="{ionline:column.radioFunction(row),ioffline:!column.radioFunction(row)}"/>
            </div>
          </template>
          <template v-else-if="column.slot" v-slot:default="{row}">
            <slot :name="column.slot" :row="row"/>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <pagination v-show="paging && total>0" :total="total" :page.sync="page" :limit.sync="pageSize"
                @pagination="handlerGetList"/>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'

  export default {
    name: 'XTable',
    components: {Pagination},
    props: {
      /**
       * 标题
       */
      title: {
        // required: true,
        required: false,
        type: String
      },
      /**
       * 表格loading
       */
      listLoading: {
        type: Boolean,
        default: false
      },
      /**
       * 列表数据
       */
      data: {
        type: Array,
        default: () => []
      },
      tableColumns: {
        type: Array,
        default: () => []
      },
      /**
       * 以下属性分页时使用
       * 是否分页
       */
      paging: {
        type: Boolean,
        default: false
      },
      total: {
        type: Number,
        default: 0
      },
      limit: {
        type: Number,
        default: 20
      }
    },
    data() {
      return {
        page: 1,
        key: 1
      }
    },
    computed: {
      pageSize: {
        get() {
          return this.limit
        },
        set(val) {
          this.$emit('update:limit', val)
        }
      }
    },
    watch: {
      tableColumns(valArr) {
        this.key = this.key + 1
      }
    },
    methods: {
      handlerSearch() {
        this.page = 1
        this.handlerGetList()
      },
      handlerGetList() {
        this.$emit('get-list', this.page)
      },
      handlerSelect(selection, row) {
        this.$emit('select', selection, row)
      },
      handlerSelectAll(selection) {
        this.$emit('select-all', selection)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

  .table-container /deep/ {
    .title-box {
      margin-bottom: 10px;

      .title {
        margin-right: 15px;
      }
    }

    .header-cell {
      background-color: $tableHeaderCellBg;
    }

    .center-box {
      position: relative;
      float: left;
      left: 50%;

      em {
        position: relative;
        float: left;
        left: -50%;
      }
    }
  }

</style>
