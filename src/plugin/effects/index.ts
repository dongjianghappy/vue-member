import { createApp } from 'vue'

const install = (Vue:any) => {
  function createJS(url: any){
    const jsapi=document.createElement("script");
    jsapi.charset="utf-8";
    jsapi.src=url;
    document.head.appendChild(jsapi);
  }

  function createStyle(css: any){
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML=css;
    document.head.appendChild(style)
  } 

  function createCss(url: any){
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link)
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

      // 创建图片
      var img: any = document.createElement('img') //创建ul节点
      img.style = box[i].img.style
      img.src = box[i].img.src

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

  function render(obj: any){
    obj.style && createStyle(obj.style)
    const js = obj.js.split(",")
    const css = obj.css.split(",")
    for(let i=0; i< css.length; i++){
      css[i] && createCss(css[i])
    }

    setTimeout(()=>{
      createHtml(obj)
      for(let i=0; i< js.length; i++){
        js[i] && createJS(js[i])
      }
    },3000)
  }

  const user: any = sessionStorage.getItem("otherUser");
  const useInfo: any = JSON.parse(user)
  if(useInfo && useInfo.theme &&  useInfo.theme.effects){
    render(useInfo.theme.effects)
  }
  if(useInfo && useInfo.theme &&  useInfo.theme.pendant){
    setTimeout(()=>{
      setCursor(useInfo.theme.cursor)
      createPendant(useInfo.theme.pendant)
    },3000)
    
  }
  
  


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