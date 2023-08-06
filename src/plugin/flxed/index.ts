const install = (Vue:any) => {
  Vue.config.globalProperties.$scroll = {

    init(param: any){
      const {win, doc} = param
      window.addEventListener("scroll", function (e: any): void {
        fixed(win, doc)
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
