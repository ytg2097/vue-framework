import { CookieUser } from '../../utils/auth'
import { login } from '@/api/login'
import router from '@/router/index'

const user = {
  namespaced: true,
  state: {
    token: CookieUser.getToken(),
    accountId: CookieUser.getAccountId(),
    userName: CookieUser.getUserName(),
    loginName: CookieUser.getLoginName()
  },
  mutations: {
  },
  actions: {
    /**
		 * 用户登录
		 */
    async loginByUserName({ commit }, userInfo) {
      userInfo.loginName.trim()
      const data = await login(userInfo)
      CookieUser.loginAction(data.result)
    },

    /**
		 * 登出
		 */
    logout({ commit }) {
      CookieUser.logoutAction()
      router.push(`/login`)
    }
  }
}

export default user
