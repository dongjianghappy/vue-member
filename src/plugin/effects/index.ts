import { createApp } from 'vue'
import VueEvent from '../../utils/event'

const install = (Vue:any) => {
  function init(){
    const user: any = sessionStorage.getItem("theme");
    const theme: any = user != 'undefined' ? JSON.parse(user) : {}
    // 背景图和背景特效
    if(theme &&  theme.effects){
      debugger
      for(let i=0; i<theme.effects.length; i++){
        render(theme.effects[i], i)
      }
    }
    
    let pendant_box: any = document.querySelectorAll('.pendant-box')
    
    for(let i=0; i<pendant_box.length; i++){
      pendant_box[i].remove()
    }
    

    // 挂件装饰
    if(theme &&  theme.pendant){
      setCursor(theme.cursor)
      createPendant(theme.pendant)
    } 
  }

  function createStyle(css: any, i:any){
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML=css;
    style.className = 'effects_style_'+i;
    document.head.appendChild(style)
  } 

  function createCss(url: any, i: any){
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.className = 'effects_css_'+i;
    document.head.appendChild(link)
  } 
  
  function createJS(url: any, i: any){
    const jsapi=document.createElement("script");
    jsapi.charset="utf-8";
    jsapi.src=url;
    jsapi.className = 'effects_js_'+i;
    document.head.appendChild(jsapi);
  }  

  function createHtml(obj: any){
    if(!obj.attr ){
      return
    }
    const el = document.createElement(obj.dom || 'div')
    el.setAttribute(obj.attr, obj.attrName)
    const aa = document.querySelectorAll("body")[0]
    aa && aa.appendChild(el);
  } 

  function createPendant(obj: any){
    let box = JSON.parse(obj)
    
    for(let i=0; i< box.length; i++){
      let arrs = []
      let arr = box[i].img.style.split(";") 
      for(let j=0; j<arr.length; j++){
        let b = arr[j].split(":") 
        b[0].trim() && arrs.push(b[0].trim())
      }

      // 创建图片
      var img: any = document.createElement('img') //创建ul节点
      img.style = box[i].img.style
      img.src = box[i].img.src
      img.title = box[i].img.title
      img.setAttribute('data', arrs)

      var container: any = document.createElement('div') //创建ul节点
        container.style = box[i].style
        container.draggable = true
        container.classList.add(box[i].class)
        container.appendChild(img);
        
        document.body.appendChild(container)

        
    }
    Vue.config.globalProperties.$pendant.init()
  }   

  function setCursor(obj: any){
    if(!obj){
      return
    }
    document.body.style.cursor = `url(${obj}),auto`
  }

  function render(obj: any, i: any){

    // 移除style样式
    let styleObj = document.querySelectorAll('.effects_style_'+i)
    styleObj.length > 0 && styleObj[0].remove()
    
    // 移除css样式
    let cssObj: any = document.querySelectorAll('.effects_css_'+i)
    
    for(let i=0; i<cssObj.length; i++){
      cssObj[i].remove()
    }

    // 移除js文件
    let jsObj: any = document.querySelectorAll('.effects_js_'+i)
    
    for(let i=0; i<jsObj.length; i++){
      jsObj[i].remove()
    }



    if(obj.length == 0){
      return
    }
    obj.style && createStyle(obj.style, i)
    const js = obj.js.split(",")
    const css = obj.css.split(",")
    for(let i=0; i< css.length; i++){
      css[i] && createCss(css[i], i)
    }

    createHtml(obj)
    for(let i=0; i< js.length; i++){
      js[i] && createJS(js[i], i)
    }
  }

  // init()
  VueEvent.on("setTheme", (data: any) => {
    init()
  })

  // var jsapi=document.createElement("script");
  // jsapi.charset="utf-8";
  // jsapi.src=url;
  // document.head.appendChild(jsapi);
  
  // var urls="http://www.lmlblog.com/blog/14/js/jquery-1.10.2.min.js";
  // var jsapis=document.createElement("script");
  // jsapis.charset="utf-8";
  // jsapis.src=urls;
  // document.head.appendChild(jsapis);
}



export default install

function init() {
  throw new Error('Function not implemented.');
}
