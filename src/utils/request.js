import axios from 'axios'
import { Message } from 'element-ui'
import { CookieUser } from '@/utils/auth'
import { MessageBox } from 'element-ui'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.API_ROOT,
  timeout: 5 * 60 * 1000
})

service.interceptors.request.use(
  config => {
    if (CookieUser.getToken()) {
      config.headers['operatorToken'] = CookieUser.getToken()
      config.headers['operatorId'] = CookieUser.getAccountId() || 0
      config.headers['operatorName'] = CookieUser.getLoginName() || ''
      config.headers['tid'] = CookieUser.getTenantId() || 0
    }

    if (!config.params) {
      config.params = {}
    }

    // 时间戳添加
    config.params.timestamp = new Date().getTime()
    config.params.operatorToken = CookieUser.getToken()
    config.params.userClient = 'pc'

    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    response = response.data
    // 先判断是否登录失效
    if (response.status.code && response.status.code === 401) {
      MessageBox.alert('您已登出，可以取消停留在此页面上，或者再次登录', '提示', {
        confirmButtonText: 'ok',
        callback: action => {
          store.dispatch('user/logout')
        }
      })
      return Promise.reject()
    }
    if (response.status.code === 0) {
      return response
    }
    else {
      Message({
        message: response.status.msg,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(response)
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(-1)
  }
)

export default service
