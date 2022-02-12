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
    const aa = document.querySelectorAll("#main")[0]
    aa && aa.appendChild(el);
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
  if(useInfo && useInfo.background_effects){
    render(useInfo.background_effects)
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