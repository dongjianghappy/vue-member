<template>
<img ref="img" :src="src" @load="curPic($event)">
<!-- @load="curPic($event)" -->
</template>

<script setup lang="ts">
import {
  defineProps,
  onMounted,
  ref
} from 'vue'

const props: any = defineProps({
  src: {
    type: String,
    default: ""
  },
  length: {
    type: Number,
    default: 0
  },
  all: {
    type: Boolean,
    default: false
  }
})

const img: any = ref(null)

function curPic(e: any) {

  const el =e instanceof HTMLElement ? e : e.currentTarget

  if (!el.parentNode) {
    return
  }
  // 获取九宫格其中一格的宽高
  const width = el.parentNode.clientWidth
  const height = el.parentNode.clientHeight
  // 获取图片的宽高
  const realWidth = el.offsetWidth;
  const realHeight = el.offsetHeight;
  if (props.all) {
    // 获取九宫格其中一格的宽高
    const width = document.body.clientWidth - 192
    const height = document.body.clientHeight - (props.length == 1 ? 0 : 90)

    let proportion = width / height // div比例
    let proportion1 = realWidth / realHeight // 图片比例

    if (proportion1 > proportion) {
      // 若是图片width大于height，就将height彻底展现，width按比例减少
      el.style.width = `${document.body.clientWidth-192}px`;
      el.style.height = "auto";
      if (el.offsetHeight < height) {
        el.style.paddingTop = `${(height-el.offsetHeight)/2}px`
      } else {
        el.style.paddingTop = ""
      }
    } else {
      // 若是图片height大于width，就将width彻底展现，height按比例减少
      el.style.width = "auto";
      el.style.height = `${document.body.clientHeight-(props.length == 1 ? 0 : 90)}px`;
    }
  } else {
    if (realWidth > realHeight) {
      let _width = realWidth * (height / realHeight)
      let _height = height
      if(width > _width){
        _height = height * (width/_width)
        _width = width
      }
      
      // 若是图片width大于height，就将height彻底展现，width按比例减少
      el.style.width = `${_width}px`;
      el.style.height = `${_height}px`;
      if(width > realWidth * (height / realHeight)){
        el.style.marginTop = `-${(_height-height)/2}px`
      }else{
        el.style.marginLeft = `-${(_width-width)/2}px`
      }
    } else {
      // 若是图片height大于width，就将width彻底展现，height按比例减少
      el.style.width = `${width}px`;
      el.style.height = `${realHeight * (width / realWidth)}px`;
      el.style.marginTop = `-${(realHeight * (width / realWidth)-height)/2}px`
    }
  }
}
onMounted(() => {
  const div: any = document.querySelectorAll('.img-box')
  const grids: any = document.querySelectorAll('.img-grid')

  grids.forEach((item: any) => {
    item.style.height = item.clientWidth+"px"
  });

  const size = new ResizeObserver((items: any) => {

    grids.forEach((grid: any) => {
      grid.style.height = grid.clientWidth+"px"
    });

    items.forEach((item: any) => {
      const { width, height } = item.contentRect  
      let len = item.target.parentNode.children.length

      switch(len){
        case 1 :
          item.target.style.height = width+"px"
          break;
        case 2 :
          item.target.style.height = width/2+"px"
          break; 
        case 3 :
          item.target.parentNode.children[0].style.width = item.target.parentNode.clientWidth/2-10+"px"
          item.target.parentNode.children[0].style.height = item.target.parentNode.clientHeight+"px"

          item.target.parentNode.children[1].style.width = item.target.parentNode.clientWidth/2-25+"px"
          item.target.parentNode.children[1].style.height = item.target.parentNode.clientHeight/2+"px"

          item.target.parentNode.children[2].style.width = item.target.parentNode.clientWidth/2-25+"px"
          item.target.parentNode.children[2].style.height = item.target.parentNode.clientHeight/2+"px"
          // if(item.target.getAttribute('id') == 'img-0'){
          //   item.target.style.height = width/2+"px"
          // }else{
          //   item.target.style.width = width/2+"px"
          //   item.target.style.height = width/2+"px"
          // }
          break;
        case 4 :
          item.target.style.height = width+"px"
          break;
        default :
          item.target.style.height = width+"px"
          break;
      }

      // item.target.style.height = width+"px"
      curPic(img.value) 
    })
  })

  // div.forEach((list: any, index: any) => {
  //   size.observe(list)
  // });
  
})
</script>
