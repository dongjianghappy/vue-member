import { parse } from "querystring";

export const getToken = () => {
  return localStorage.getItem('token')
}

export const setToken = (token: any) => {
  return localStorage.setItem('token', token)
}

export const isLogined = (token: any) => {
  if (localStorage.getItem('token')) {
    return true
  }
  return false
}

export const clearToken = () => {
  localStorage.removeItem('token')
}

export const getUid = () => {
 let uid = ""
 const arr = window.location.pathname.split("/u/")
 if(arr.length > 1){
   uid = arr[1].split("/")[0]
 }
 return uid
}

export const getChannel = () => {

  let channel = ""

 const arr = window.location.pathname.split("/")
 if(arr.length > 1){
  channel = arr[arr.length-1]
 }
 return channel
}


export const chooseCate = (param: any, coding: any) => {
  let configData = {}
  if (param === 'album') {
    configData = {
      coding: coding, // 'U40001',
      api: 'userCategory',
      type: "album",
      name: "",
      value: "",
      title: "选择专辑"
    }
  } else if (param === 'cate') {
    configData = {
      coding: coding,
      api: 'systemCate',
      type: "cate",
      name: "",
      value: "",
      title: "选择分类"
    }
  }
 return configData
}

// 将urlquery参数转换成对象形式
export const getParam = () => {
  let str = window.location.search.split("?")[1]
  str = str.split('&')[1]
  return str ? `&${str}` : '';
};

// 将urlquery参数转换成对象形式
export const getQuery = () => {
  return parse(window.location.search.split("?")[1]);
};

export const getParent = (current: any, value: any) => {
  let index = current.findIndex((item: any) => item.value === value)
  return index > -1 ? true : false
}
export const showParent = (current: any) => {
 
  return current
}