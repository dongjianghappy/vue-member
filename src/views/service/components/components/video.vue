<template>
<div class="bg-black relative" style="height: 350px; z-index: 1; border-radius: 8px;
    overflow: hidden;" v-if="data.type == 'video'">
  <div class="background-mask" style="position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%; z-index: -1;">
    <img :src="data.cover" style="width: 100%;
    height: 100%;
    -webkit-filter: blur(60px);
    filter: blur(60px);">
  </div>
  <div class="relative">
    <i class="iconfont icon-play font32 cl-white absolute" style="top: 50%;
    left: 50%; margin-left: -16px;
    margin-top: -16px;" v-if="!data.isplay" />
    <video :src="data.video" class="playmp4" :class="`video_${item.id || data.id}`" @click="handlePlay(data)" style="width: 100%; height: 350px;">
      您的浏览器不支持HTML5
    </video>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from '@/utils'

export default defineComponent({
  name: 'v-Video',
  props: {
    sourceData: {
      type: Array,
      default: () => {
        return []
      }
    },
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup(props, context) {

    function handlePlay(param: any) {
      let audio: any = document.getElementsByClassName('video_' + param.id)

      props.sourceData.map((item: any) => {
        if (param.id !== item.id && item.type == "video") {
          let audio1: any = document.getElementsByClassName('video_' + item.id)
          item.isplay = false
          audio1[0].pause()
        }
      })

      param.isplay = !param.isplay
      if (param.isplay) {
        audio[0].play()
      } else {
        audio[0].pause()
      }
    }

    return {
      handlePlay
    }
  }
})
</script>
