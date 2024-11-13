import VueEvent from '@/utils/event'

const install = (Vue:any) => {
  Vue.config.globalProperties.$pendant = {
    init(){
      const boxs: any = document.getElementsByClassName("pendant-box")
      for(let i=0; i<boxs.length;i++){
        const box = boxs[i]
      var deg = 0
      // 当时是否在拖动鼠标
      let isDrag = false
      
      let isEdit = false
      VueEvent.on("saveTheme", (data: any) => {
        isEdit = data
        
        const pendantBox: any = document.getElementsByClassName("pendant-box")
        for(let i = 0; i < pendantBox.length; i++){
          if(isEdit){
            pendantBox[i].style.zIndex = "101"
          }else{
            pendantBox[i].style.zIndex = "9"
          }
        }
        
        console.log(isEdit);
        
      })

      box.addEventListener('mousedown', (ev: any) => {
        if(!isEdit){
          return
        }          
        isDrag = true
        ev.preventDefault()
      
        document.onmousemove = function (e: any) {
          if(!isEdit){
            return
          }          
          if(!isDrag){
            return
          }
          const dashed: any = document.querySelector(".dashed")
          const side = Math.sqrt(
            Math.pow(box.clientWidth, 2) + Math.pow(box.clientHeight, 2)
          )

          box.style.top = e.clientY-ev.layerY+"px"
          box.style.left = e.clientX-ev.layerX+"px"
          if(dashed.style){
            dashed.style.top = box.offsetTop-(side - box.clientHeight) / 2 - 24+'px' 
            dashed.style.left = box.offsetLeft-(side - box.clientWidth) / 2+'px' 
          }
        }
      })


      box.addEventListener('mouseup', (ev: any) => {
        isDrag = false
      })

      box.addEventListener('mouseenter', (e: any) => {
        if(!isEdit){
          return
        }
        box.style.cursor = 'move'
        if(document.querySelector(".dashed") !== null){
          const dashed: any = document.querySelector(".dashed")
          dashed.remove()
        }
        
        const side = Math.sqrt(
          Math.pow(box.clientWidth, 2) + Math.pow(box.clientHeight, 2)
        )
        const dashed = document.createElement('div')
        dashed.classList.add('dashed')
        dashed.style.position = box.style.position
        dashed.style.width = side + 'px'
        dashed.style.height = side + 24 + 'px'
          dashed.style.top = box.offsetTop-(side - box.clientHeight) / 2 - 24+'px'
          dashed.style.left = box.offsetLeft-(side - box.clientWidth) / 2+'px'
        dashed.innerHTML = `<div class="tool">
          <div class="tool-btn"><i class="iconfont icon-alpha-desc cl-white"></i></div>
          <div class="tool-btn"><i class="iconfont icon-alpha-asc font14 cl-white"></i></div>
          <div class="rotate-left tool-btn"><i class="iconfont icon-rotate-left cl-white"></i></div>
          <div class="rotate-right tool-btn"><i class="iconfont icon-rotate-right cl-white"></i></div>
          <div class="min-btn"><i class="iconfont icon-suoxiao cl-white"></i></div>
          <div class="max-btn"><i class="iconfont icon-fangda font14 cl-white"></i></div>
          <div class="positioning tool-btn"><i class="iconfont icon-positioning ${box.style.position === 'fixed' ? 'cl-red' : 'cl-white'}"></i></div>
          <div class="tool-btn"><i class="iconfont icon-close font12 cl-white"></i></div>
        </div>`

        document.body.appendChild(dashed)
        dashed.addEventListener('mouseleave', () => {
          dashed.remove()
        })

        const alphaDesc = dashed.children[0].children[0]
        const alphaAsc = dashed.children[0].children[1]        
        const rotateLeft = dashed.children[0].children[2]
        const rotateRight = dashed.children[0].children[3]
        const min = dashed.children[0].children[4]
        const max = dashed.children[0].children[5]
        const positioning = dashed.children[0].children[6]
        const deletes = dashed.children[0].children[7]

        alphaAsc.addEventListener('click', () => {
          const opacity = box.children[0].style.opacity
          if(opacity === 1 || opacity === ""){
            return
          }
          box.children[0].style.opacity = parseFloat(opacity) + 0.05
        })
        alphaDesc.addEventListener('click', () => {
          let opacity = box.children[0].style.opacity
          if(opacity !== "" && opacity <= 0){
            return
          }else if(opacity === ""){
            opacity = 1
          }
          box.children[0].style.opacity = parseFloat(opacity) - 0.05       
        })        
        rotateLeft.addEventListener('click', () => {
          deg += -15
          box.style.transform = `rotate(${deg}deg)`
        })
        rotateRight.addEventListener('click', () => {
          deg += 15
          box.style.transform = `rotate(${deg}deg)`
        })
        max.addEventListener('click', () => {
          const width = box.children[0].clientWidth
          box.children[0].style.width = `${width / 0.75}px`
        })
        min.addEventListener('click', () => {
          const width = box.children[0].clientWidth
          if(width <= 75){
            return
          }
          box.children[0].style.width = `${width * 0.75}px`
        })

        positioning.addEventListener('click', () => {
          if(box.style.position === 'absolute'){
            box.style.position = "fixed"
            positioning.children[0].classList.add('cl-red')
            positioning.children[0].classList.remove('cl-white')
          }else{
            box.style.position = "absolute"
            positioning.children[0].classList.add('cl-white')
            positioning.children[0].classList.remove('cl-red')
          }
        })
        deletes.addEventListener('click', () => {
          box.remove()
          dashed.remove()
        })
      })

      box.addEventListener('mouseleave', () => {
        box.style.cursor = ''
      })
    }
  }
  }
}
export default install