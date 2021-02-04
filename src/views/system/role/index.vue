<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>

    <x-list
      ref="list"
      title="角色列表"
      :list-loading="listLoading"
      :filter-items="filterItems"
      :table-columns="tableColumns"
      :data="list"
      paging
      :total="total"
      @get-list="handlerGetList"
    >
      <template v-slot:table-header>
        <el-button class="action-button" type="primary" icon="el-icon-add"  @click="$router.push({ path: '/role/add'})" >新增</el-button>

      </template>
      <template v-slot:action="{row}">
        <el-button class="action-button" type="primary" icon="el-icon-edit" size="mini" @click="handlerEditRow(row)" />
        <el-button class="action-button" type="primary" icon="el-icon-delete" size="mini" @click="handlerDeleteRow(row)" />
      </template>
    </x-list>

  </div>
</template>

<script>
  import XList from '@/components/Template/list/index'
  import {listRole,deleteRole} from '@/api/role'
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
            field: 'name',
            value: '',
            label: '角色名称',
            placeholder: '请输入角色名称'
          }
        ],
        tableColumns:[
          {
            label: '名称',
            prop: 'name'
          },
          {
            label: '描述',
            prop: 'description',
          },
          {
            label: '用户数',
            prop: 'subscribers'
          },
          {
            label: '创建时间',
            prop: 'createTime'
          },
          {
            label: '最近修改时间',
            prop: 'lastModifyTime'
          },
          {
            label: '操作',
            slot: 'action'
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
            param[cur.field] = cur.value
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
        listRole(listQuery).then(response => {
          this.list = response.result
          this.total = response.pageInfo.totalElements
        }).finally(() => this.listLoading = false)
      },

      handlerEditRow(row){
        this.$router.push({ path: '/role/edit', query: { roleId: row.id }})
      },

      handlerDeleteRow(row){

        deleteRole(row.id).then(response => this.$refs.list.handlerGetList(this.currentPage))
      },

    }
  };


</script>

<style scoped>

</style>
