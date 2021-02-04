<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>

    <x-list
      ref="list"
      title="员工列表"
      :list-loading="listLoading"
      :filter-items="filterItems"
      :table-columns="tableColumns"
      :data="list"
      paging
      :total="total"
      @get-list="handlerGetList"
    >
      <template v-slot:table-header>
        <el-button class="action-button" type="primary" icon="el-icon-add"  @click="createDialogVisible = true" >新增</el-button>
      </template>

      <template v-slot:action="{row}">
        <el-button  class="action-button" type="primary" icon="el-icon-edit" size="mini" @click="handlerEditRow(row)" />
        <el-button  class="action-button" type="primary" icon="el-icon-delete" size="mini" @click="handlerDeleteRow(row)" />
      </template>
    </x-list>


    <Dialog title="新增员工" :visible.sync="createDialogVisible" class="dialog" width="25%">
      <el-form
        ref="createForm"
        :model="createRuleForm"
        :rules="createRule"
        label-width="70px"
        hide-required-asterisk
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="createRuleForm.name" placeholder="请输入员工姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="createRuleForm.phone" placeholder="请输入员工手机号" />
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input v-model="createRuleForm.email" placeholder="请输入员工邮箱" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="createDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="dialogLoading" @click="handlerCreateSave">保存</el-button>
      </div>
    </Dialog>

    <Dialog title="编辑" :visible.sync="editDialogVisible" class="dialog" width="25%">
      <el-form
        ref="createForm"
        :model="editRuleForm"
        :rules="createRule"
        label-width="70px"
        hide-required-asterisk
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editRuleForm.name" placeholder="请输入员工姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editRuleForm.phone" placeholder="请输入员工手机号" />
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input v-model="editRuleForm.email" placeholder="请输入员工邮箱" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="dialogLoading" @click="handlerEditSave">保存</el-button>
      </div>
    </Dialog>
  </div>

</template>

<script>
  import XList from '@/components/Template/list/index'
  import Dialog from '@/components/Dialog/index'
  import {listEmployee,create,modify,remove} from '@/api/employee'
  export default {
    name: "index",
    components:{XList,Dialog},
    data(){
      return {
        value: false,
        listLoading: false,
        createDialogVisible: false,
        editDialogVisible: false,
        dialogLoading: false,
        createRule: {
          name: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
          phone: [{ required: true, message: '请输入员工手机号', trigger: 'blur' }]
        },
        createRuleForm:{

          name: null,
          phone: null,
          email: null
        },

        editRuleForm:{

          id: null,
          name: null,
          phone: null,
          email: null
        },

        filterItems:[
          {
            type: 'input',
            field: 'name',
            value: '',
            label: '姓名',
            placeholder: '请输入员工姓名'
          },
          {
            type: 'input',
            field: 'phone',
            value: '',
            label: '手机号',
            placeholder: '请输入员工手机号'
          }
        ],
        tableColumns:[
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '手机号',
            prop: 'phone',
          },
          {
            label: '邮箱',
            prop: 'email'
          },
          {
            label: '添加时间',
            prop: 'createTime'
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
        listEmployee(listQuery).then(response => {
          this.list = response.result
          this.total = response.pageInfo.totalElements
        }).finally(() => this.listLoading = false)
      },

      handlerCreateSave(){
        this.$refs.createForm.validate(valid => {
          if (valid) {
            this.dialogLoading = true
            create(this.createRuleForm)
              .then(response => {
                this.createDialogVisible = false
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.$refs.list.handlerSearch()
              })
              .finally(() => (this.dialogLoading = false))
          }
          else {
            return false
          }
        })
      },

      handlerEditSave(){
        this.$refs.createForm.validate(valid => {
          if (valid) {
            this.dialogLoading = true
            modify(this.editRuleForm)
              .then(response => {
                this.editDialogVisible = false
                this.editRuleForm = {
                  email: null,
                  phone: null,
                  name: null,
                  id: null
                }
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.$refs.list.handlerSearch()
              })
              .finally(() => (this.dialogLoading = false))
          }
          else {
            return false
          }
        })
      },

      handlerEditRow(row){

        this.editDialogVisible = true
        this.editRuleForm.email = row.email
        this.editRuleForm.phone = row.phone
        this.editRuleForm.name = row.name
        this.editRuleForm.id = row.id
      },

      handlerDeleteRow(row){

        remove(row.id).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.$refs.list.handlerGetList(this.currentPage)
        })
      },


    }
  };


</script>

<style scoped>

</style>
