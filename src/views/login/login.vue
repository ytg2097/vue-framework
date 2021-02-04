<template>
  <div class="login-container">
    <el-form ref="loginForm" class="login-form" auto-complete="on" :model="loginFormData" :rules="loginRules"
             label-position="left">
      <div class="title-text"><b>AC Cloud</b></div>
      <!--用户名-->
      <el-form-item prop="username">
        <el-input
          v-model="loginFormData.username"
          sid="usernameInput"
          name="username"
          type="text"
          prefix-icon="el-icon-message"
          placeholder="username"
          auto-complete="on"
        />
      </el-form-item>

      <!--密码-->
      <el-form-item prop="password">
        <el-input
          v-model="loginFormData.password"
          prefix-icon="el-icon-lock"
          sid="passwordInput"
          name="password"
          :type="passwordType"
          placeholder="password"
          auto-complete="on"
          @keyup.enter.native="onLoginBtnClick"
        />
        <span class="show-pwd" @click="onShowPwdBtnClicks">
         <i slot="suffix" class="el-icon-view" @click="showPwd"></i>
        </span>
      </el-form-item>

      <!--登陆-->
      <el-button type="primary" style="width:100%" :loading="loginLoading" @click.native.prevent="onLoginBtnClick">Sign In
      </el-button>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: 'Login',
    data() {
      return {
        // 登陆数据
        loginFormData: {
          username: null,
          password: null
        },
        // 登陆规则
        loginRules: {
          username: [{required: true, trigger: 'blur', message: 'Please enter account name'}],
          password: [{required: true, trigger: 'blur', message: 'Please enter password'}]
        },
        // style
        loginLoading: false,

        passwordType: 'password'
      }
    },

    methods: {

      showPwd () {
        this.passwordType === 'password' ? this.pwdType = '' : this.pwdType = 'password';
        let e = document.getElementsByClassName('el-icon-view')[0];
        this.passwordType === '' ? e.setAttribute('style', 'color: #409EFF') : e.setAttribute('style', 'color: #c0c4cc');
      },
      /**
       * 显示密码按钮点击
       */
      onShowPwdBtnClicks() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },
      /**
       * 登陆按钮点击
       */
      onLoginBtnClick() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loginLoading = true

            const params = {
              loginName: this.loginFormData.username,
              password: this.loginFormData.password
            }

            this.$store.dispatch('user/loginByUserName', params).then((res) => {
              this.$router.push('/')
            }).finally(() => {
              this.loginLoading = false
            })
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '~@/styles/variables';

  .login-container {
    display: flex;
    height: 100%;
    width: 100%;
    background: url(../../assets/imgs/login_background.jpg);

    .login-form {
      width: 350px;
      padding: 40px;
      margin: auto;
      background-color: #fff;

      .title-text {
        padding-bottom: 20px;
        width: 100%;
        text-align: center;
        font-size: 36px;
      }

      .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        cursor: pointer;
        user-select: none;
      }
    }
  }
</style>
