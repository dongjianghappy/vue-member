<template>
<div class="relative">
  <!-- <div class="absolute pointer" style="left: -30px; top: 0" :title="data.display == '1' ? '切换到九宫格模式' : '切换到图集模式'" @click="() => data.display = data.display == '1' ? '0' : '1'">
    <i class="iconfont icon-toggle" />
  </div> -->
  <div v-if="data.display == '1'">
    <Slideshow :data="data.image" />
  </div>
  <div v-else>
    <div v-if="data.image.length === 1">
      <div style="margin-top: 25px; margin-right: 25px;" v-if="data.type === 'sign'">
        <img :src="data.image[0]" onerror="this.src='http://yunxi10.com/source/public/images/noimage.png'" class="showimg" @click="showImg(data, data.image[0])" style=" width: 100%; height: auto; cursor: zoom-in;" />
      </div>
      <img :src="data.image[0]" onerror="this.src='http://yunxi10.com/source/public/images/noimage.png'" class="showimg" @click="showImg(data, data.image[0])" style="border-radius: 4px; width: 125px; height: 125px; cursor: zoom-in;" v-else-if="kind=='comment'" />
      <img :src="data.image[0]" onerror="this.src='http://yunxi10.com/source/public/images/noimage.png'" class="showimg" @click="showImg(data, data.image[0])" style="border-radius: 8px;width: 400px; height: auto; cursor: zoom-in;" v-else />
    </div>

    <ul v-else class="img-grid smallimg-wrap clearfix">
      <template v-for="(img, k) in data.image" :key="k">
        <li class="relative" style="border-radius: 8px; overflow:hidden; width: 200px; height: 200px;" @click="showImg(data, img)" v-if="data.image.length == 2 || data.image.length == 4">
          <v-img :src="img" onerror="this.src='http://yunxi10.com/source/public/images/noimage.png'" />
          <div class="absolute align_center pt45" style="background: rgba(0, 0, 0, 0.75); top: 0; right: 0; bottom: 0; left: 0; z-index: 1" v-if="k=== 8 && data.image.length > 9">
            <span class="font18 cl-white">+{{data.image.length-9}}</span>
          </div>
        </li>
        <li class="relative" style="border-radius: 8px; overflow:hidden;" @click="showImg(data, img)" v-else-if="k < 9">
          <v-img :src="img" onerror="this.src='http://yunxi10.com/source/public/images/noimage.png'" />
          <div class="absolute align_center pt45" style="background: rgba(0, 0, 0, 0.75); top: 0; right: 0; bottom: 0; left: 0; z-index: 1" v-if="k=== 8 && data.image.length > 9">
            <span class="font18 cl-white">+{{data.image.length-9}}</span>
          </div>
        </li>
      </template>
    </ul>
  </div>
</div>
<!-- <v-layer v-model:isShow="showFlag" :data="currentData" :img="currentImg" v-if="showFlag" type="image" :hasComment="false" /> -->
<v-layer v-model:isShow="showFlag" :data="currentData" v-if="showFlag" type="image" :hasInfo="false" :hasComment="false" />
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from '@/utils'
import VueEvent from '@/utils/event'
import Slideshow from './slide.vue'
export default defineComponent({
  name: 'v-Image',
  components: {
    Slideshow
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    kind: {
      type: String,
      default: ""
    },
  },
  setup(props, context) {
    const showFlag = ref(false)
    const currentData = ref()
    const currentImg = ref()
    const isSlide = ref(false)

    function showImg(data: any, img: any) {
      VueEvent.emit("layout", {
        data,
        img
      });
    }

    return {
      showFlag,
      currentData,
      currentImg,
      showImg,
      isSlide
    }
  }
})
</script>
