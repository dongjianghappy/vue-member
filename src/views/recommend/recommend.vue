<template>
<div class="swiper-wrap" :class="className" style="height: -webkit-fill-available; overflow: hidden; border-radius: 16px;">
  <div class="swiper absolute" style=" left: 0; right: 0; transition: top 0.1s ease; z-index: 1000000">
    <template v-if="dataList.length">
      <screen ref="screens" :dataList="dataList" :data="item" v-model:currentIndex="currentIndex" v-for="(item, index) in dataList" :key="index" :number="index" :height="height">
        <Video :sourceData="[]" :data="item" :style="{width: '420px', height: 'calc(100vh - 150px)'}" :mask="false" v-if="item.type === 'video'" />
        <Slideshow :data="item.image" :style="{width: '420px', height: 'inherit'}" :mask="false" v-if="item.type == 'img'" />
      </screen>
    </template>
    <div :style="`padding: ${height/2}px`" v-else>
      <v-loding v-if="!loading" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref
} from '@/utils'

import Screen from '../index/components/TalkItem/components/screen.vue'
import Slideshow from '../index/components/TalkItem/components/slide.vue'
import Video from '../index/components/TalkItem/components/video.vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    Screen,
    Slideshow,
    Video
  },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return {}
      }
    },
    className: {
      type: String,
      default: "relative"
    }
  },
  setup(props, context) {
    const screens: any = ref(null)
    let height: any = ref("")
    let currentIndex: any = ref(0)
    const keyStatus: any = ref(false)

    function init(param: any) {
      screens.value[0].getComment(param)
    }

    onMounted(() => {
      keyStatus.value = true
      document.onkeydown = (e: any) => {
        if (!keyStatus.value) {
          return
        }
        if (e.keyCode == '38' && currentIndex.value != '0') {
          screens.value[currentIndex.value].toggle(-1, currentIndex.value)
        }
        if (e.keyCode == '40') {
          screens.value[currentIndex.value].toggle(1, currentIndex.value)
        }
      }
    })

    onMounted(() => {
      height.value = document.getElementsByClassName('swiper-wrap')[0].clientHeight
    })

    return {
      screens,
      height,
      init,
      currentIndex
    }
  }
})
</script>
