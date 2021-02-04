<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>

    <x-list
      ref="list"
      title="账户列表"
      :list-loading="listLoading"
      :filter-items="filterItems"
      :table-columns="tableColumns"
      :data="list"
      paging
      :total="total"
      @get-list="handlerGetList"
    >
      <template v-slot:table-header>
        <el-button class="action-button" type="primary" icon="el-icon-add"  @click="$router.push({ path: '/account/add'})" >新增</el-button>

      </template>
      <template v-slot:action="{row}">
        <el-button v-if="row.level === 'ORDINARY'" class="action-button" type="primary" icon="el-icon-edit" size="mini" @click="handlerEditRow(row)" />
        <el-button v-if="row.level === 'ORDINARY'" class="action-button" type="primary" icon="el-icon-delete" size="mini" @click="handlerDeleteRow(row)" />
      </template>
      <template v-slot:status="{row}">
        <el-switch
          :disabled="row.level === 'ROOT'"
          v-model="row.status"
          active-color="#13ce66"
          active-value="有效"
          inactive-value="无效"
          @change="toggleAccountStatus(row)"
          inactive-color="#ff4949">
        </el-switch>
      </template>
    </x-list>

  </div>
</template>

<script>
  import XList from '@/components/Template/list/index'
  import {listAccount,toggleAccountStatus,deleteAccount} from '@/api/account'
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
            label: '账号',
            placeholder: '请输入登陆账号'
          }
        ],
        tableColumns:[
          {
            label: '账号',
            prop: 'loginName'
          },
          {
            label: '角色',
            prop: 'rule',
          },
          {
            label: '最近登陆时间',
            prop: 'lastLoginTime'
          },
          {
            label: '最近登陆IP',
            prop: 'lastLoginIp'
          },
          {
            label: '激活状态',
            slot: 'status'
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
        listAccount(listQuery).then(response => {
          this.list = response.result
          this.total = response.pageInfo.totalElements
        }).finally(() => this.listLoading = false)
      },

      handlerEditRow(row){
        this.$router.push({ path: '/account/edit', query: { accountId: row.id}})
      },

      handlerDeleteRow(row){

        deleteAccount(row.id).then(response => this.$refs.list.handlerGetList(this.currentPage))
      },

      toggleAccountStatus(row){
        toggleAccountStatus(row.id)
      }
    }
  };


</script>

<style scoped>

</style>
