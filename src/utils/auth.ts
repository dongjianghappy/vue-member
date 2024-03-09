import { color } from "@/assets/common_const";
import { parse } from "querystring";
import { colorHex2Rgb, colorRgb2Hex } from "./color";

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

// 时长转换
export const  durationTrans = (duration: any) => {
  
  let b: any = ""
  let h: any = Math.floor(duration/3600),
      m: any = Math.floor(duration%3600/60),
      s: any = Math.floor(duration%3600%60);
  if(h>0){
    h = h<10 ? '0'+h : h
    b += h+":"
  }
  m = m < 10 ? '0'+m : m 
  s = s < 10 ? '0'+s : s 
  b+=m+":"+s
  return b;
}

export const getParent = (current: any, value: any) => {
  let index = current.findIndex((item: any) => item.value === value)
  return index > -1 ? true : false
}
export const showParent = (current: any) => {
 
  return current
}


// 定义需要改变颜色的变量
const formula: any = {
  '--color-shade-1': 'color(primary shade(10%))',
  '--color-light-1': 'color(primary shade(10%))',
  '--color-light-2': 'color(primary shade(20%))',
  '--color-light-3': 'color(primary shade(30%))',
  '--color-light-4': 'color(primary shade(40%))',
  '--color-light-5': 'color(primary shade(50%))',
  '--color-light-6': 'color(primary shade(60%))',
  '--color-light-7': 'color(primary shade(70%))',
  '--color-light-8': 'color(primary shade(80%))',
  '--color-light-9': 'color(primary shade(90%))'
}

const generateClolors = (primary: any) => {
  const colors: any = {}
  Object.keys(formula).forEach((key: any) => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = color.convert(value)
  })
  const convertedColors = colors //convertRgbToHex(colors)
  return convertedColors
}

// 设置颜色变量值、替换变量为相对应的颜色值
export const writeNewStyle = () => {
  
  let theme: any = sessionStorage.getItem("theme")
  theme = JSON.parse(theme)

  if(theme === null){
    return
  }
  let mode = localStorage.getItem('mode')
  let cssProperties: any = {}
  
  if(mode === 'moon'){
    
    cssProperties = {
      '--page-background': '#000',
      '--color-primary': "#5c5c5c",
      '--color-primary-5': "#383838",
      '--color-primary-2': "#b1722e",
      '--default-font': "#bfbfbf",
      '--default-border': "#222",
      '--default-border-dotted': "#222",
      '--card-background': '#2c2c2c',
      '--active-background': "#1b1b1b",
      '--label-background': "#333",
      '--label-hover-background': "#555",
      '--upload-background': "#333",
      '--datetime-background': "#222",
      '--datetime-font': "#bfbfbf",
      '--calendar-hover-background': "#333",
      '--vertical-line': '#333',
      '--w-sub': '#797979',
      '--w-input-div-background': '#2c2c2c',
      '--w-input-background': '#2c2c2c',
      '--nav-hover-background': "#2c2c2c",
      '--nav-hover-font': "#fff",    
      '--module-background': "#191919",
      '--module-font': "#fff",
      '--link-hover-background': "#2c2c2c",
      '--link-hover-font': "#fff",
      '--tabs-button-background': "#e9d1b9",
      '--tabs-button-font': "#eb7350",
      '--button-background': "#d39c7f",
      '--button-border': "#fbbd9e",
      '--button-font': "#fff",
      '--button-hover': "#d39c7f",
      '--tool-hover-background': "#2c2c2c",
      '--popover-background': "#2c2c2c",
      '--comment-background' : "#2c2c2c"
    }
  }else{
    let primary = theme.primary_color
    let rgb = colorHex2Rgb(primary)
    let rgbs = colorHex2Rgb(theme.module_background)
    
    cssProperties = {
      '--page-background': theme ? theme.theme_background : "",
      '--color-primary': primary || "#f67f00",
      '--color-primary-5': rgb.replace(')', ', 0.5)'),
      '--color-primary-2': rgb.replace(')', ', 0.2)'),
      '--default-font': theme.font_color,
      '--default-border': rgb.replace(')', ', 0.1)') || "#f9f9f9",
      '--default-border-dotted': "#f9f9f9",
      '--card-background': '#f9f9f9',
      '--active-background': theme.module_background || "#fff",
      '--label-background': "#f3f4f9",
      '--label-hover-background': primary || "#f67f00",
      '--upload-background': "#f9f9f9",
      '--datetime-background': "#8bc34a",
      '--calendar-hover-background': "#eee",
      '--datetime-font': "#fff",
      '--vertical-line': '#d9d9d9',
      '--w-input-div-background': theme.input_color || '#f0f1f4',
      '--w-input-background': '#fff',
      '--nav-hover-background': primary,
      '--nav-hover-font': "#fff",    
      '--module-background': theme.module_background,
      '--module-font': theme.font_color || "#333",
      '--link-hover-background': rgb.replace(')', ', 0.1)') || "#f2f2f2",
      '--link-hover-font': "#333",
      '--tabs-button-background': rgb.replace(')', ', 0.1)'),
      '--tabs-button-font': primary || "#eb7350",
      '--button-background': "#ffc09f",
      '--button-border': "#fbbd9e",
      '--button-font': "#fff",
      '--button-hover': "#ffc09f",
      '--tool-hover-background': "#eee",
      '--popover-background': theme.module_background || "#fff",
      '--comment-background' : "#f2f2f5"
    }
  }

  cssProperties = Object.assign({}, cssProperties) //  generateColors(color)
  debugger
  // 把对象转成css
  const cssString = Object.keys(cssProperties).map((property) => `${property}: ${cssProperties[property]}`).join(';')
  let aa: any = document.querySelector('#root')
  // aa.setAttribute('style', cssString)
  let ddd: any = document.styleSheets;
    if(aa !== null){
      aa.remove()
    }
    const style: any = document.createElement('style');
    style.type = 'text/css';
    style.id = 'root';
    debugger
    style.textContent = `:root{${cssString}}`
    document.head.appendChild(style)
}