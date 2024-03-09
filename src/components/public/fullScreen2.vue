<template>
<span class="cl-white" @click="fullScreen">
  <v-tooltip :content="isScreen ? '退出网页全屏' : '网页全屏'" arrow="top" offset="right" :move="-40" keys="popover-full-screen" type="hover">
    <i class="iconfont" :class="isScreen ? 'icon-screen-off' : 'icon-screen-on'" />
  </v-tooltip>
</span>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from 'vue'

export default defineComponent({
  name: 'v-FullScreen',
  setup(props, context) {
    let isScreen: any = ref(false)

    function fullScreen() {
      let swiper = document.getElementsByClassName("swiper")
      let header: any = document.getElementsByTagName("header")
      let screen: any = document.getElementsByClassName("screen-wrap")
      let el: any = swiper[0]
      if (!isScreen.value) {
        header[0].style.display = "none"
        el.classList.add('fixed')
        el.classList.remove('absolute')
        el.style.top = 0
        debugger
        for(let i = 0; i < screen.length; i++){
          screen[i].style.height = document.documentElement.clientHeight+"px"
        }
      } else {
        header[0].style.display = "block"
        el.classList.add('absolute')
        el.classList.remove('fixed')
      }
      isScreen.value = !isScreen.value
    }
    return {
      isScreen,
      fullScreen
    }
  }
})
</script>
