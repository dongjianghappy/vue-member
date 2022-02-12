import axios from 'axios'
import qs from 'qs'

import { getToken } from './auth'

export default class http {
  private baseConfig: any

  // 构造函数
  constructor (options?: any) {
    if (!options) {
      this.baseConfig = {
        baseURL: '/api/', // 设置跨域代理接口统一的前置地址  http://www.dongblog.com
        timeout: 300000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Header': "*"
        }
      }
    } else {
      this.baseConfig = options
    }
  }

  // 请求头设置
  requestHeaders (request: any) {
    // POST传参序列化
    request.interceptors.request.use((config: any) => {
      if (config.method === 'post' && config.data.upload !== true) {
        config.data = qs.stringify(config.data)
      }
      if (config.data.upload === true) {
        config.data = config.data.data
      }
      return config
    }, (error: any) => {
      return Promise.reject(error)
    })
  }

  // 返回状态判断
  responseHeaders (request: any) {
    request.interceptors.response.use((res: any) => {
      if (!res.data.ifSuccess) {
        // _.toast(res.data.msg);
        return Promise.reject(res)
      }
      return res
    }, (error: any) => {
      return Promise.reject(error)
    })
  }

  // 请求方法
  axios () {
    return axios.create(this.baseConfig)
  }

  // 请求方法
  request (m: string, n: string, params: any) {
    params = params || {}

    params.n = n
    params.m = params.m ? params.m : m

    const request = this.axios()

    this.requestHeaders(request)
    this.responseHeaders(request)

    // 添加请求拦截器
    request.interceptors.request.use(config => {
      // config.headers.authoriziation = 'Beartr ' + getToken()
      return config
    })

    // http响应拦截
    request.interceptors.response.use(response => {
      if (response.data.ifSuccess === 1) {
        if (response.data.result === true) {
          console.log('sd')
        } else {
          return response.data
        }
      } else {
        console.log('sd')
      }
    }, err => {
      return err.data
    })

    return new Promise((resolve, reject) => {
      const url = params.uploadtype ? `?&type=${params.uploadtype}` : ''
      request.post(`interface_new.php${url}`, params) // interface_vue【线上博客接口】
        .then(response => {
          resolve({
            result: response
          })
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
