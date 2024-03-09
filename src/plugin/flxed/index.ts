const install = (Vue:any) => {
  Vue.config.globalProperties.$scroll = {

    init(param: any){
      const {win, doc, type} = param
      window.addEventListener("scroll", (e: any) => {
        let scroll = this.scrollY
        if(type === 'fixed'){
          fixed(win, doc)
        }else if(type === 'sideFixed'){
          sideFixed(win, doc, scroll)
        }
      })
    },


  }
}



export default install

// 加载
function fixed(win: any, doc:any) {
  const scrolltop = win.el.scrollY;
  const el:any = document.getElementsByClassName(doc.el) && document.getElementsByClassName(doc.el)[0] || {}
  const docE =document.documentElement;
    if (scrolltop >= 60) {
    document.getElementsByClassName("gotop-2")[0].classList.remove("hide")
    }else{
    document.getElementsByClassName("gotop-2")[0].classList.add("hide")
    }

    if (scrolltop >= win.y) {
    el.classList && el.classList.add("fixed")
    el.classList && el.classList.remove("customize")
    } else {
    el.classList && el.classList.remove("fixed")
    el.classList && el.classList.remove("customize")
    }
  }

 // 加载
function sideFixed(win: any, doc:any, scroll: any) {
  const el:any = document.getElementsByClassName(doc.el) && document.getElementsByClassName(doc.el)[0] || {}
  const parent:any = document.querySelector(`#${doc.p}`) || {};
  const ranking: any = document.querySelector('#ranking');
    if (ranking && window.scrollY > win.y && parseInt(ranking.getBoundingClientRect().top+ranking.offsetHeight+15) <= window.innerHeight) {
      parent.style.position = "fixed"
      parent.style.bottom = 0      
      if (parseInt(ranking.getBoundingClientRect().top+ranking.offsetHeight+15) == window.innerHeight) {
        if(win.y == 0){
          win.y = window.scrollY
        }
      }
    } else {
      win.y = 0
      if(parent.style){
        parent.style.position = ""
      }
    }
  } 
