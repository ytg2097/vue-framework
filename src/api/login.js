import request from '@/utils/request'

export const login = user =>
  request({
    url: 'auth/login',
    method: 'post',
    data: user
  })
