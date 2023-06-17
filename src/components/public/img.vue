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
      debugger
      // 获取九宫格其中一格的宽高
      const width = e.target.parentNode.clientWidth
      const height = e.target.parentNode.clientHeight
      // 获取图片的宽高
      const realWidth = e.target.offsetWidth;
      const realHeight = e.target.offsetHeight;
      if (props.all) {
      // 获取九宫格其中一格的宽高
      const width = document.body.clientWidth-192
      const height = document.body.clientHeight-(props.length == 1 ? 0 : 90)

        let proportion = width/height // div比例
        let proportion1 = realWidth/realHeight // 图片比例

        if (proportion1 > proportion) {
          // 若是图片width大于height，就将height彻底展现，width按比例减少
          // e.target.style.width = `${realWidth * (height / realHeight)}px`;
          e.target.style.width = `${document.body.clientWidth-192}px`;
          e.target.style.height = "auto";
          if(e.target.offsetHeight < height){
            e.target.style.paddingTop = `${(height-e.target.offsetHeight)/2}px`
          }else{
            e.target.style.paddingTop = ""
          }
        } else {
          // 若是图片height大于width，就将width彻底展现，height按比例减少
          e.target.style.width = "auto";
          e.target.style.height = `${document.body.clientHeight-(props.length == 1 ? 0 : 90)}px`;
          // e.target.style.height = `${realHeight * (width / realWidth)}px`;
        }
      } else {
        if (realWidth > realHeight) {
          // 若是图片width大于height，就将height彻底展现，width按比例减少
          e.target.style.width = `${realWidth * (height / realHeight)}px`;
          e.target.style.height = `${height}px`;
          e.target.style.marginLeft = `-${(realWidth * (height / realHeight)-width)/2}px`
        } else {
          // 若是图片height大于width，就将width彻底展现，height按比例减少
          e.target.style.width = `${width}px`;
          e.target.style.height = `${realHeight * (width / realWidth)}px`;
          e.target.style.marginTop = `-${(realHeight * (width / realWidth)-height)/2}px`
        }
      }
    }

    return {
      curPic
    }
  }
})
</script>
