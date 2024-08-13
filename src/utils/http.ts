import axios from 'axios'
import qs from 'qs'
import VueEvent from '@/utils/event'

export default class http {
  private baseConfig: any

  getCookieByName(name: any) {
    const cookie: any = document.cookie.split(';')
    let token: any = ""
    for (let i = 0; i < cookie.length; i++) {
      if (cookie[i].indexOf('token=') > -1) {
        token = cookie[i].split('token=')[1]
      }
    }
    return token
  }

  // 构造函数
  constructor (options?: any) {
    if (!options) {
      this.baseConfig = {
        baseURL: process.env.NODE_ENV === 'development' ? '/api/' : 'http://www.dongblog.com/api/', // 设置跨域代理接口统一的前置地址  http://www.dongblog.com
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
      // if(config.data.responseType){
      //   config.responseType = "blob"
      // }   
      if (config.method === 'post' && config.data.upload !== true) {
        config.data = qs.stringify(config.data)
      }
      if (config.data.upload === true) {
        config.data = config.data.data
      }

      config.headers.Authorization = this.getCookieByName('token')
      return config
    }, (error: any) => {
      return Promise.reject(error)
    })
  }

  // 返回状态判断
  responseHeaders (request: any) {
    request.interceptors.response.use((res: any) => {
      
      if (!res.data.ifSuccess) {
        return Promise.reject(res)
      }else if(res.data.ifSuccess == 2) {
        VueEvent.emit("login");
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
    let progress: any = params.progress ? params.progress : ()=>{}
    const request = this.axios()
    
    this.requestHeaders(request)
    this.responseHeaders(request)

    // 添加请求拦截器
    request.interceptors.request.use(config => {
      return config
    })

    // http响应拦截
    request.interceptors.response.use(response => {
      if (response && response.data.ifSuccess != 0) {
        if (response.data.result != true) {
          return response.data
        }
      } 
    }, err => {
      return err.data
    })

    return new Promise((resolve, reject) => {
      let dir = process.env.NODE_ENV === 'development' ? 'interface_new.php' : 'interface_vue.php'
      const url = params.uploadtype ? `?&type=${params.uploadtype}` : ''

      const param: any = {
        url: `${dir}${url}`,
        method: 'post',
        data: params,
        onUploadProgress: (e: any) => {
          progress(e)
        }
      }

      if(params.responseType){
        param.responseType = "blob"
      }    
      
      request.request(param) 
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
