import axios from 'axios'
import ErrorMessage from './ErrorMessage'
import UserModel from '../model/UserModel.js'

import {apiHost} from "@/common/config/index.js";


const axiosInstance = axios.create({
  baseURL: apiHost, //服务器地址
  timeout: 1000 * 60 * 60

})

// 拦截器（请求拦截）
axiosInstance.interceptors.request.use((config) => {
  let token = 'Bearer ' + UserModel.getToken()
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
})

// 拦截器（响应拦截）
axiosInstance.interceptors.response.use((res) => {
  return res
})

export const get = function (url, params = {}) {
  return new Promise((resolve, reject) => {
    axiosInstance.get(url, {
      params: params,
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err.response ? err.response.data : ErrorMessage.timeOut)
    })
  })
}


export const post = function (url, params = {}) {
  return new Promise((resolve, reject) => {
    axiosInstance.post(url, params, {}).then((res) => {
      resolve(res.data)

    }).catch((err) => {

      reject(err.response ? err.response.data : ErrorMessage.timeOut)
    })
  })
}

export const put = function (url, {id, params = {}}) {
  return new Promise((resolve, reject) => {
    let rurl = url
    if (id != undefined && id != '') {
      rurl = url + '/' + id
    }
    axiosInstance.put(rurl, params).then((res) => {
      resolve(res.data)
    })
      .catch((err) => {
        reject(err.response ? err.response.data : ErrorMessage.timeOut)
      })
  })
}


export const deleter = function (url, id) {
  return new Promise((resolve, reject) => {
    axiosInstance.delete(url + '/' + id, {}).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err.response ? err.response.data : ErrorMessage.timeOut)
    })
  })
}


export const patch = function (url, {id, params = {}}) {
  return new Promise((resolve, reject) => {
    let rurl = url
    if (id !== undefined && id !== '') {
      rurl = url + '/' + id
    }
    axiosInstance.patch(rurl, params).then((res) => {
      resolve(res.data)
    })
      .catch((err) => {
        reject(err.response ? err.response.data : ErrorMessage.timeOut)
      })
  })
}
