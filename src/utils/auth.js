/**
 * 存储变量
 */
const TOKEN_KEY = 'accessToken'
const LOGIN_NAME = 'loginName'
const ACCOUNT_ID_KEY = 'accountId'
const USER_NAME_KEY = 'userName'
const TID_KEY = 'tid'
const LOGIN_FLAG_KEY = 'loginFlag'

/**
 * Cookie User
 */
class Cookie_User {
  /**
   * Token
   */
  getToken() {
    return sessionStorage.getItem(TOKEN_KEY)
  }

  /*  saveToken() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }

      sessionStorage.setItem(TOKEN_KEY, S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
    }*/

  saveToken(token) {

    sessionStorage.setItem(TOKEN_KEY,token)
  }

  removeToken() {
    sessionStorage.removeItem(TOKEN_KEY)
  }

  /**
   * tid
   */
  getTenantId() {
    return sessionStorage.getItem(TID_KEY)
  }

  saveTenantId(tid) {
    sessionStorage.setItem(TID_KEY, tid)
  }

  removeTenantId() {
    sessionStorage.removeItem(TID_KEY)
  }

  /**
   * account ID
   * @returns {string}
   */
  getAccountId() {
    return sessionStorage.getItem(ACCOUNT_ID_KEY)
  }

  saveAccountId(id) {
    sessionStorage.setItem(ACCOUNT_ID_KEY, id)
  }

  removeAccountId() {
    sessionStorage.removeItem(ACCOUNT_ID_KEY)
  }

  /**
   * UserName
   */

  getUserName() {
    return sessionStorage.getItem(USER_NAME_KEY)
  }

  saveUserName(username) {
    sessionStorage.setItem(USER_NAME_KEY, username)
  }

  removeUserName() {

    sessionStorage.removeItem(USER_NAME_KEY)
  }

  /**
   * LoginName
   */

  getLoginName() {
    return sessionStorage.getItem(LOGIN_NAME)
  }

  saveLoginName(loginName) {
    sessionStorage.setItem(LOGIN_NAME, loginName)
  }

  removeLoginName() {

    sessionStorage.removeItem(LOGIN_NAME)
  }


  /**
   * LoginFlag
   */
  getLoginFlag() {
    return sessionStorage.getItem(LOGIN_FLAG_KEY)
  }

  saveLoginFlag() {
    sessionStorage.setItem(LOGIN_FLAG_KEY, true)
  }

  removeLoginFlag() {
    sessionStorage.removeItem(LOGIN_FLAG_KEY)
  }

  /**
   * 登陆设置
   */
  loginAction(user) {
    this.saveToken(user.token)
    this.saveTenantId(user.tenantId)
    this.saveUserName(user.userName)
    this.saveAccountId(user.accountId)
    this.saveLoginName(user.loginName)
    this.saveLoginFlag()
  }

  /**
   * 退出登录设置
   */
  logoutAction() {
    this.removeToken()
    this.removeTenantId()
    this.removeUserName()
    this.removeAccountId()
    this.removeLoginName()
    this.removeLoginFlag()
  }
}

export const CookieUser = new Cookie_User()
