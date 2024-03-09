<template>
<img :src="src" @load="curPic($event)">
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue'

export default defineComponent({
  name: 'v-Img',
  props: {
    src: {
      type: String,
      default: ""
    },
    style: {
      type: Object,
      default: () => {
        return {}
      }
    },
    length: {
      type: Number,
      default: 0
    },
    all: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    function curPic(e: any) {
      if(!e.currentTarget.parentNode){
        return
      }
      debugger
      // 获取九宫格其中一格的宽高
      const width = e.currentTarget.parentNode.clientWidth
      const height = e.currentTarget.parentNode.clientHeight
      // 获取图片的宽高
      const realWidth = e.currentTarget.offsetWidth;
      const realHeight = e.currentTarget.offsetHeight;
      if (props.all) {
      // 获取九宫格其中一格的宽高
      const width = document.body.clientWidth-192
      const height = document.body.clientHeight-(props.length == 1 ? 0 : 90)

        let proportion = width/height // div比例
        let proportion1 = realWidth/realHeight // 图片比例

        if (proportion1 > proportion) {
          // 若是图片width大于height，就将height彻底展现，width按比例减少
          // e.currentTarget.style.width = `${realWidth * (height / realHeight)}px`;
          e.currentTarget.style.width = `${document.body.clientWidth-192}px`;
          e.currentTarget.style.height = "auto";
          if(e.currentTarget.offsetHeight < height){
            e.currentTarget.style.paddingTop = `${(height-e.currentTarget.offsetHeight)/2}px`
          }else{
            e.currentTarget.style.paddingTop = ""
          }
        } else {
          // 若是图片height大于width，就将width彻底展现，height按比例减少
          e.currentTarget.style.width = "auto";
          e.currentTarget.style.height = `${document.body.clientHeight-(props.length == 1 ? 0 : 90)}px`;
          // e.currentTarget.style.height = `${realHeight * (width / realWidth)}px`;
        }
      } else {
        if (realWidth > realHeight) {
          // 若是图片width大于height，就将height彻底展现，width按比例减少
          e.currentTarget.style.width = `${realWidth * (height / realHeight)}px`;
          e.currentTarget.style.height = `${height}px`;
          e.currentTarget.style.marginLeft = `-${(realWidth * (height / realHeight)-width)/2}px`
        } else {
          // 若是图片height大于width，就将width彻底展现，height按比例减少
          e.currentTarget.style.width = `${width}px`;
          e.currentTarget.style.height = `${realHeight * (width / realWidth)}px`;
          e.currentTarget.style.marginTop = `-${(realHeight * (width / realWidth)-height)/2}px`
        }
      }
    }

    return {
      curPic
    }
  }
})
</script>
