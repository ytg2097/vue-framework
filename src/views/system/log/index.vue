<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>

    <x-list
      ref="list"
      title="日志列表"
      :list-loading="listLoading"
      :filter-items="filterItems"
      :table-columns="tableColumns"
      :data="list"
      paging
      :total="total"
      @get-list="handlerGetList"
    />

  </div>
</template>

<script>
  import XList from '@/components/Template/list/index'
  import {listOperationLog} from '@/api/log'
  export default {
    name: "index",
    components:{XList},
    data(){
      return {
        value: false,
        listLoading: false,
        filterItems:[
          {
            type: 'input',
            field: 'loginName',
            value: '',
            label: '搜索日志',
            placeholder: '请输入操作账号'
          },
          {
            type: 'select',
            field: 'type',
            value: '',
            label: '操作日志',
            options: [
              {
                value: 'QUERY',
                label: '查询'
              },
              {
                value: 'OPERATE',
                label: '操作'
              },
              {
                value: 'SAFETY',
                label: '安全'
              },
            ]
          },
          {
            type: 'select',
            field: 'result',
            value: '',
            label: '结果',
            options: [
              {
                value: 'SUCCESS',
                label: '成功'
              },
              {
                value: 'FAILURE',
                label: '失败'
              }
            ]
          },
          {
            type: 'datePicker',
            field: 'dateRange',
            value: [],
            label: '创建日期',
            pickerOptions: {
              shortcuts: [{
                text: '最近三天',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近七天',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近三十天',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }]
            },
          },
        ],
        tableColumns:[
          {
            label: '账号',
            prop: 'loginName'
          },
          {
            label: '操作',
            prop: 'operating',
          },
          {
            label: '目标',
            prop: 'target'
          },
          {
            label: '详情',
            prop: 'detail'
          },
          {
            label: '时间',
            prop: 'createTime'
          },
          {
            label: 'IP地址',
            prop: 'ip'
          },
          {
            label: '结果',
            prop: 'result'
          }
        ],
        list:[],
        total:0,
        currentPage: 1
      }
    },
    mounted() {
      this.$refs.list.handlerSearch()
    },
    computed: {
      listQuery() {
        return this.filterItems.reduce((param, cur) => {
          if (cur.value) {
              if (cur.field === 'dateRange' && cur.value.length === 2){
                param['beginTime'] = cur.value[0]
                param['endTime'] = cur.value[1]
              }else{
                param[cur.field] = cur.value
              }
          }
          return param
        }, {})
      }
    },
    methods:{

      handlerGetList(pageIndex, pageSize){
        this.currentPage = pageIndex
        const listQuery = Object.assign({ pageSize, pageIndex }, this.listQuery)
        this.listLoading = true
        listOperationLog(listQuery).then(response => {
          this.list = response.result
          this.total = response.pageInfo.totalElements
        }).finally(() => this.listLoading = false)
      },

    }
  };


</script>

<style scoped>

</style>
