import { color } from "@/assets/common_const";
import { parse } from "querystring";
import { setColor, colorHex2Rgb, colorRgb2Hex} from "./color";

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

// 转成blob文件
export const toBlob = async (fileList: any) => {
  for(let i=0; i<fileList.length; i++){
    
    await fetch(`/uploadfile/${(fileList[i].file || fileList[i].music_file).split('uploadfile')[1]}`,{
          method: 'GET',
          mode: 'cors',
          // credentials: 'same-origin',
          // headers: {
          //   'Content-Type': 'application/json'
          // }
        })
        .then(response => response.blob())
        .then(blob => {
          // 在这里处理Blob对象
          fileList[i].file = URL.createObjectURL(blob)
        })
        .catch(error => {
          // 处理错误
          console.error('Error fetching file:', error);
        });
  }

  // const aaa = fileList && fileList.map(async (item: any) => {
  //   // 使用fetch获取文件并将其转换为Blob
  //   await fetch(`/uploadfile/${item.file.split('uploadfile')[1]}`,{
  //     method: 'GET',
  //     mode: 'cors',
  //     // credentials: 'same-origin',
  //     // headers: {
  //     //   'Content-Type': 'application/json'
  //     // }
  //   })
  //   .then(response => response.blob())
  //   .then(blob => {
  //     // 在这里处理Blob对象
  //     item.file = URL.createObjectURL(blob)
  //   })
  //   .catch(error => {
  //     // 处理错误
  //     console.error('Error fetching file:', error);
  //   });

  //   return item
  // })
}

export const getUid = () => {

  
 let uid = ""
 if( window.location.pathname.indexOf("/u/") != -1){
  const arr = window.location.pathname.split("/u/")
  if(arr.length > 1){
    uid = arr[1].split("/")[0]
  }
 }
 else if( window.location.pathname.indexOf("/home") != -1){
  let userInfo: any = sessionStorage.getItem("userInfo")
  userInfo = JSON.parse(userInfo || '{}')
  uid = userInfo.account
 } 
 else{
  uid = window.location.pathname.split("/")[1]
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

// 秒转换currentTime
export const timeToSeconds = (timeStr: any) => {
  var parts = timeStr.split(':');
  return parts[0] * 3600 + // 小时数乘以3600秒
         parts[1] * 60 +   // 分钟数乘以60秒
         parseFloat(parts[2]); // 秒数
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
export const writeNewStyle = (param: any = "") => {
  let theme: any = sessionStorage.getItem("theme")
  theme = JSON.parse(theme)

  if(param){
    theme = param
  }

  if(theme === null){
    return
  }
  let mode = localStorage.getItem('mode')
  let cssProperties: any = {}
  
  if(mode === 'moon'){
    
    cssProperties = {
     }
  }else{
    // let primary = theme.primary_color
    let rgb = theme.primary_color
    let color: any = {}
    let rgb_arrs: any = {
      rgb25: []
    } 
    
    let primarys: any = {}
    if(theme.intelligent == '1'){
      color = setColor(theme.module_background)
      const {r, g, b} = color.rgb
      const {h, s, l} = color.hsl
      for(let i=1; i<10; i++){
        primarys[`rgb${i}0`] = `rgb(calc(30 * 0.${i} + ${r} * (1 - 0.${i})), calc(30 * 0.${i} + ${g} * (1 - 0.${i})), calc(30 * 0.${i} + ${b} * (1 - 0.${i})));`
      }
      primarys['highlight'] = `hsl(${h}, calc(${s} * 1%), min(calc(${l} * 1% + 10%), 100%))`
      primarys['primary_background'] = `hsl(${h}, calc(${s} * 1%), min(calc(${l} * 1% + 10%), 20%))`
      
    }else{
      let rgb = colorHex2Rgb(theme.module_background)
      let rgb_arr = rgb.substring(4, rgb.length-1).split(',')
      
      for(let i = 0; i < rgb_arr.length; i++){
        rgb_arrs.rgb25.push(`calc(${rgb_arr[i]} * (1 + 0.25))`)
      }
      primarys = {
        rgb25: `rgb(${rgb_arrs.rgb25.join(',')})`
      }
    }
    
    
    // 智能主题
    if(theme.intelligent == '1'){
      color = {
        module: primarys.rgb90, // 模块背景色
        primary: primarys.highlight, // 主色
        primary_background: primarys.primary_background, // 主色背景色
        background: primarys.rgb70, // 背景色有: 边框色、表单色、卡片色、标签色、经过高亮色
        input: primarys.rgb80,
        font: theme.font_color, // 字体色
      } 
    }else{
      let rgb = colorHex2Rgb(theme.primary_color)
      color = {
        module: theme.module_background, // 模块背景色
        primary: rgb, // 主色
        primary_background: rgb.replace(')', ', 0.2)'), // 主色背景色
        background: rgb.replace(')', ', 0.1)'), // 背景色有: 边框色、表单色、卡片色、标签色、经过高亮色
        input: primarys.rgb25, // 表单色
        font: theme.font_color, // 字体色
      }
    }
  
    cssProperties = {
      '--page-background': theme ? theme.theme : "", // 背景色
      '--page-transparent': theme ? theme.background_transparent : '0', // 背景透明度
      '--module-background': color.module, // 模块背景色
      '--input-background': color.input, // 表单色
      '--card-background': color.background, // 卡片色
      '--link-hover-background': color.background, // 鼠标经过高亮背景
      '--label-background': color.input, // 标签背景色
      '--default-border': color.input, // 边框色
      '--default-font': color.font, // 字体色
      '--color-primary': color.primary, // 主色
      '--color-primary-background': color.primary_background, // 主色背景色
      '--calendar-hover-background': "#eee",
      '--datetime-font': "#fff",
      '--button-font': "#fff",
      '--button-hover': "#ffc09f",
      '--tool-hover-background': "#eee"
    }
  }

  cssProperties = Object.assign({}, cssProperties)
  
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
    
    style.textContent = `:root{${cssString}}`
    document.head.appendChild(style)
}