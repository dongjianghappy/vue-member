<template>
<span class="cl-white" @click="fullScreen">
  <v-tooltip content="进入全屏" arrow="top" offset="right" :move="-40" keys="popover-full-screen" type="hover">
    <i class="iconfont icon-full-screen" style="font-size: 20px !important;" />
  </v-tooltip>
</span>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue'

export default defineComponent({
  name: 'v-FullScreen',
  setup(props, context) {

    function fullScreen() {
      // documentElement 属性以一个元素对象返回一个文档的文档元素
      const el: any = document.documentElement;
      el.requestFullscreen || el.mozRequestFullScreen || el.webkitRequestFullscreen || el.msRequestFullScreen ?
        el.requestFullscreen() || el.mozRequestFullScreen() || el.webkitRequestFullscreen() || el.msRequestFullscreen() : null;

    }
    return {
      fullScreen
    }
  }
})
</script>
