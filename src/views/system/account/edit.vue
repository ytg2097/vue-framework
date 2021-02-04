<template>

  <div class="app-container">
    <div class="title ">编辑账号</div>
    <div class="form-container">
      <el-row>
        <el-col :span="12">
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
              <el-form-item label="账号" prop="loginName">
                <el-input v-model="createRuleForm.loginName" placeholder="请输入登陆账号" class="form-item" disabled/>
              </el-form-item>
              <el-form-item label="联系人姓名" prop="userName">
                <el-input v-model="createRuleForm.userName" placeholder="请输入员工姓名" class="form-item"
                          :disabled="disabled"/>
              </el-form-item>
              <el-form-item label="联系人手机号" prop="phone">
                <el-input v-model="createRuleForm.phone" placeholder="请输入员工手机号" class="form-item" :disabled="disabled"/>
              </el-form-item>
              <el-form-item label="联系人邮箱">
                <el-input v-model="createRuleForm.email" placeholder="请输入员工邮箱" class="form-item" :disabled="disabled"/>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="2" style="margin: 10px 10px 10px 10px;width: 1px;height:500px;background-color:#C0C0C0;"/>
        <el-col :span="10" style="margin-left: 20px">
          <div class="title title-lv2 title-font" style="margin-left: 10px">角色</div>
          <div class="rule-container" v-for="role in roles">
            <el-checkbox  :disabled="disabled" v-model="role.checked">{{role.name}}</el-checkbox>
          </div>
        </el-col>
      </el-row>
      <div style="width: 100%;height:40px;position:relative;">

        <span style="position: absolute;left: 45%;">
          <el-button class="footer-button" @click="$router.go(-1)">取消</el-button>
          <el-button v-if="disabled" class="footer-button" type="primary" @click="handleEditClick">编辑</el-button>
          <el-button v-else class="footer-button" type="primary" :loading="saving"
                     @click="handlerCreateSave">保存</el-button>
        </span>

      </div>
    </div>
  </div>
</template>

<script>
  import { CookieUser } from "@/utils/auth";
  import { modify, detail } from "@/api/account";
  import { allRole } from "@/api/role";

  export default {
    name: "Edit",

    data() {
      return {

        disabled: true,
        saving: false,
        createRule: {
          password: [{ required: true, message: "请输入密码", trigger: "blur" }],
          userName: [{ required: true, message: "请输入联系人姓名", trigger: "blur" }],
          phone: [{ required: true, message: "请输入联系人手机号", trigger: "blur" }],
          email: [{ required: true, message: "请输入联系人邮箱", trigger: "blur" }]
        },
        createRuleForm: {

          id: null,
          password: null,
          userName: null,
          phone: null,
          email: null
        },

        roles: []
      };
    },

    created() {
      this.getAccount(this.$route.query.accountId);
    },

    methods: {

      handlerCreateSave() {
        this.$refs.createForm.validate(valid => {
          if (valid) {
            this.saving = true;
            this.createRuleForm.roleIds = this.roles.filter(row => row.checked).map(row => row.id);
            modify(this.createRuleForm)
              .then(() => {
                this.saving = false;
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.$router.go(-1);
              })
              .catch(e => this.saving = false);
          } else {
            return false;
          }
        });
      },

      async handleEditClick() {

        this.disabled = false;
        const response = await allRole();

        response.result
          .filter(row =>
            this.roles.find(role => role.id === row.id) === undefined
          )
          .map(row => {
            return Object.assign(row, { checked: false });
          })
          .forEach(r => this.roles.push(r));
      },

      getAccount(accountId) {

        detail(accountId)
          .then(response => {
            let account = response.result;
            this.createRuleForm = {
              userName: account.userName,
              phone: account.phone,
              email: account.email,
              id: account.id,
              loginName: account.loginName
            };
            this.roles = account.roleList.map(row => {
              return Object.assign(row, { checked: true });
            });
          });
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
      margin-top: 15px;
      margin-left: 10px;
    }

    .footer-button {
      margin: 0 auto;
      margin: 10px;
    }
  }
</style>
