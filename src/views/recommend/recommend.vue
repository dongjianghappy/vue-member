<template>
<div class="swiper-wrap" :class="className" style="height: -webkit-fill-available; overflow: hidden; border-radius: 16px;">
  <div class="swiper absolute" style=" left: 0; right: 0; transition: top 0.1s ease; z-index: 1000000">
    <template v-if="dataList.length">
      <screen ref="screens" :dataList="dataList" :data="item" v-model:currentIndex="currentIndex" v-for="(item, index) in dataList" :key="index" :number="index" :height="height">
        <Video :sourceData="[]" :data="item" :style="{width: '420px', height: 'calc(100vh - 150px)'}" :mask="false" :number="index" v-if="item.type === 'video'" />
        <Slideshow ref="slide" :data="item.image" :style="{width: '420px', height: 'inherit'}" :mask="false" :number="index" v-if="item.type == 'img'" />
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
    const slide: any = ref(null)
    let height: any = ref("")
    let currentIndex: any = ref(0)
    const keyStatus: any = ref(false)

    function init(param: any) {
      screens.value[0].getComment(param)
    }

    onMounted(() => {
      keyStatus.value = true
      document.addEventListener("keydown", (e: any) => {
        if (!keyStatus.value) {
          return
        }

        let _slide = slide.value && slide.value.filter((item: any) => item.number === currentIndex.value)

        if (e.keyCode == '37' && (_slide && _slide.length > 0)) {
          const number = _slide[0].index == 0 ? _slide[0].data.length - 1 : _slide[0].index - 1
          _slide[0].handleHover(number)
          _slide[0].time()
        }
        if (e.keyCode == '39' && (_slide && _slide.length > 0)) {
          const number = _slide[0].data.length - 1 == _slide[0].index ? 0 : _slide[0].index + 1
          _slide[0].handleHover(number)
          _slide[0].time()
        }
        if (screens.value.length < 2) {
          return
        }
        if (e.keyCode == '38' && currentIndex.value != '0') {
          screens.value[currentIndex.value].toggle(-1, currentIndex.value)
        }
        if (e.keyCode == '40' && currentIndex.value < screens.value.length - 1) {
          screens.value[currentIndex.value].toggle(1, currentIndex.value)
        }
      });
    })

    onMounted(() => {
      height.value = document.getElementsByClassName('swiper-wrap')[0].clientHeight
    })

    return {
      screens,
      height,
      init,
      currentIndex,
      slide
    }
  }
})
</script>
