import { createApp } from 'vue'

const install = (Vue:any) => {

  const obj: any = {
    baiscUrl: "http://www.lmlblog.com/blog/14/js/jquery-1.10.2.min.js",
    snow: {
      js: [
        'http://www.lmlblog.com/winter/templets/xq/js/snowy.js',
        'http://www.lmlblog.com/blog/12/js/Snow.js'
      ],
      css: [],
      style: ".snow-container{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:100001;}",
      attr: "class",
      attrName: 'snow-container',
      dom: "div"
    },
    galaxy: {
      js: [
        'http://www.yunxi10.com/code/11327/js/script.js'
      ],
      css: [
        'http://www.yunxi10.com/code/11327/css/style.css'
      ],
      style: "#particle-canvas{background: none !important; z-index: -1 !important; position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:100001;}",
      attr: 'id',
      attrName: 'particle-canvas',
      dom: "canvas"
    },
    fireworks: {
      js: [
        'http://www.07sucai.com/code/16464/js/script.js'
      ],
      css: [
        'http://www.07sucai.com/code/16464/css/style.css'
      ],
      style: "#canvas{background: none !important; z-index: -1 !important; position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:100001;}",
      attr: 'id',
      attrName: 'canvas',
      dom: "canvas"
    },
    
  }

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
    const el = document.createElement(obj.dom || 'div')
    el.setAttribute(obj.attr, obj.attrName)
    document.body.appendChild(el);
  } 

  function render(obj: any, baiscUrl: any){

    createJS(baiscUrl)
    obj.style && createStyle(obj.style)
    createHtml(obj)

    for(let i=0; i< obj.css.length; i++){
      createCss(obj.css[i])
    }

    setTimeout(()=>{
      for(let i=0; i< obj.js.length; i++){
        createJS(obj.js[i])
      }
    },1000)
  }

  const user: any = sessionStorage.getItem("userInfo");
  const useInfo: any = JSON.parse(user)
  if(useInfo && useInfo.background_effects){
    render(obj[useInfo.background_effects], obj.baiscUrl)
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