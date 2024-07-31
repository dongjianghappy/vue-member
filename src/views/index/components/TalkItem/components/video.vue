<template>
<div class="video-wrap" :style="`height: ${style.height}`" v-if="data.type == 'video'">
  <div class="background-mask" v-if="mask">
    <img :src="data.cover">
  </div>
  <div class="relative" :style="`height: ${style.height}`">
    <i class="iconfont icon-play font32 cl-white absolute" style="top: 50%;
    left: 50%; margin-left: -16px;
    margin-top: -16px;" v-if="!data.isplay" />
    <div class="control-wrap" v-if="mask">
      <v-control :data="data" />
    </div>
    <video :src="data.video" class="playmp4" :class="`video_${item.id || data.id}`" @click="handlePlay(data)" style="width: 100%;" :style="`height: ${style.height}`">
      您的浏览器不支持HTML5
    </video>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps
} from '@/utils'
import VueEvent from '@/utils/event'

const props: any = defineProps({
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
  },
  style: {
    type: Object,
    default: () => {
      return {
        width: '250px',
        height: '400px'
      }
    }
  },
  mask: {
    type: Boolean,
    default: true
  }
})

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

  VueEvent.emit("plays", param);
}
</script>

<style lang="less" scoped>
.video-wrap {
  .control-wrap {
    display: none;
    z-index: 100000;
    position: absolute;
    left: 0px;
    bottom: 0px;
    right: 0
  }

  &:hover {
    .control-wrap {
      display: block;
    }
  }
}
</style>
