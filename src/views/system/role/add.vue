<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div class="app-container">
    <div class="title ">新增角色</div>
    <div class="form-container">
      <el-row>
        <el-col :span="8">
          <div class="title title-lv2 title-font">基本信息</div>
          <div class="info-container">
            <el-form
              ref="createForm"
              :model="createRuleForm"
              :rules="createRule"
              label-width="70px"
              hide-required-asterisk
              label-position="top"
            >
              <el-form-item label="名称" prop="name">
                <el-input v-model="createRuleForm.name" placeholder="请输入角色名称" class="form-item"/>
              </el-form-item>
              <el-form-item label="描述" prop="description">
                <el-input type="textarea" rows="5" v-model="createRuleForm.description" placeholder="请输入描述"
                          class="form-item"/>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="2" style="margin: 10px 10px 10px 10px;width: 1px;height:500px;background-color:#C0C0C0;"/>
        <el-col :span="15" style="margin-left:20px">
          <div class="title title-lv2 title-font" style="margin-left: 10px">资源分配</div>
          <div class="rule-container">
            <x-table
              :table-columns="resourceTableColumns"
              :data="resourceTableData"
            >
              <template v-slot:view="{row}">
                <el-checkbox v-model="row.view" @change="onViewChange(row)"/>
              </template>
              <template v-slot:create="{row}">
                <el-checkbox v-model="row.create" @change="onCreateChange(row)"/>
              </template>
              <template v-slot:modify="{row}">
                <el-checkbox v-model="row.modify" @change="onModifyChange(row)"/>
              </template>
              <template v-slot:delete="{row}">
                <el-checkbox v-model="row.delete" @change="onDeleteChange(row)"/>
              </template>
            </x-table>
          </div>
        </el-col>
      </el-row>
      <div style="width: 100%;height:40px;position:relative;">
        <span style="position: absolute;left: 45%;">
          <el-button class="footer-button" @click="$router.go(-1)">取消</el-button>
          <el-button class="footer-button" type="primary" :loading="saving" @click="handlerCreateSave">保存</el-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { CookieUser } from "@/utils/auth";
  import { create } from "@/api/role";
  import { allMenu } from "@/api/menu";
  import XTable from "@/components/Template/components/Table/index";

  export default {
    name: "Add",

    components:{XTable},
    data() {
      return {

        saving: false,
        createRule: {
          name: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
        },

        createRuleForm: {

          name: "角色一",
          description: "asdasddddddd"
        },

        resourceTableColumns: [
          {
            label: "资源",
            prop: 'name',
          },
          {
            label: "查看",
            slot: 'view'
          },
          {
            label: "增加",
            slot: 'create'
          },
          {
            label: "修改",
            slot: 'modify'
          },
          {
            label: "删除",
            slot: 'delete'
          },

        ],

        resourceTableData:[]
      };
    },
    mounted() {

      this.allMenu()
    },
    methods: {

      handlerCreateSave() {
        this.$refs.createForm.validate(valid => {
          if (valid) {
            this.saving = true;
            this.createRuleForm.menuList = this.resourceTableData.map(row => {
              return {menuId:row.id,create:row.create,modify:row.modify,delete:row.delete,view:row.view}
            })
            create(this.createRuleForm)
              .then(() => {
                this.saving = false;
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.$router.go(-1);
              }).catch(e => this.saving = false);
          } else {
            return false;
          }
        });
      },

      allMenu(){

        allMenu().then(response => {
          this.resourceTableData = response.result.map(row => {

            return Object.assign(row,{create: false,modify:false,view: false,delete: false})
          })
        })
      },

      onViewChange(row){

        if (!row.view)
          row.modify = false
        row.delete = false
        row.create = false
      },

      onCreateChange(row){
        if (row.create)
          row.view = true
      },

      onModifyChange(row){
        if (row.modify)
          row.view = true
      },

      onDeleteChange(row){
        if (row.delete)
          row.view = true
      }

    }
  };


</script>

<style lang="scss" scoped>

  .form-container /deep/ {
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 20px;
    background-color: #fff;

    .form-item {
      width: 80%;
    }

    .title-font {
      color: #99a9bf;

    }

    .info-container {
      margin-top: 10px;
    }

    .rule-container {
      margin-top: 10px;
      margin-left: 10px;
    }

    .footer-button {
      margin: 0 auto;
      margin: 10px;
    }
  }
</style>
