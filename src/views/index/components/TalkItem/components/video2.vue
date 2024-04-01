<template>
  <div class="video-wrap relative"
       style="background: #252632; height: auto; z-index: 1; border-radius: 8px;
    overflow: hidden;"
       @mousemove="handleHover(data)"
       @mouseout="mouseout(data)">
    <div style="position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 220px; z-index: 100;">
      <!-- <img class="cover" :src="data.cover" style="width: 100%;
    height: 100%;" > -->
      <v-img :src="data.cover"
             onerror="this.src='http://yunxi10.com/source/public/images/noimage.png'"
             v-if="!data.isplay" />
    </div>
    <div class="relative">
      <div class="control-wrap">
        <v-control2 ref="control"
                    :data="data" />
      </div>
      <video :src="data.video"
             class="playmp4"
             :class="`video_${item.id || data.id}`"
             @click="handlePlay(data)"
             style="width: 100%; height: 220px;">
        您的浏览器不支持HTML5
      </video>
    </div>
    <div class="ptb15 plr10"
         v-if="hasName">
      <div class="mb10"
           v-html="data.summary"></div>
      <div class="flex font12">
        <div class="cl-666"
             style="flex: 1">@{{data.nickname}}</div>
        <div class="cl-666"
             style="flex: 1">{{data.times}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from '@/utils'
import VueEvent from '@/utils/event'

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
    hasName: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup(props, context) {

    function handlePlay(param: any, isplay: any = "") {
      let audio: any = document.getElementsByClassName('video_' + param.id)

      props.sourceData.map((item: any) => {
        if (param.id !== item.id && item.type == "video") {
          let audio1: any = document.getElementsByClassName('video_' + item.id)
          item.isplay = false
          audio1[0].pause()
        }
      })

      param.isplay = isplay ? isplay : !param.isplay
      if (param.isplay) {
        audio[0].play()
      } else {
        audio[0].pause()
      }

      VueEvent.emit("plays", param);
    }

    function handleHover(param: any) {
      handlePlay(param, true)
    }

    function mouseout(param: any) {
      let audio: any = document.getElementsByClassName('video_' + param.id)
      audio[0].pause()
      param.isplay = false
    }

    return {
      handlePlay,
      handleHover,
      mouseout
    }
  }
})
</script>

<style lang="less" scoped>
.video-wrap {
  &:hover img {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    transition: all 0.5s ease;
  }

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
