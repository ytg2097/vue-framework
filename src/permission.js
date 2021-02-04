import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {CookieUser} from './utils/auth'

NProgress.configure({showSpinner: false})
const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()

  if (CookieUser.getLoginFlag()) {
    if (to.path === '/login') {
      next({path: '/dashboard'})
    } else {
      next()
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    next({path: '/login'})
  }
})

// 关闭页面进度条
router.afterEach(() => {
  NProgress.done()
})

