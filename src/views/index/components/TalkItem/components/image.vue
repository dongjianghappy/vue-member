<template>
<div class="relative">
  <div v-if="data.display == '1'">
    <Slideshow :data="data.image" />
  </div>
  <div v-else>
    <div v-if="data.image.length === 1">
      <div style="margin-top: 25px; margin-right: 25px;" v-if="data.type === 'sign'">
        <img :src="data.image[0]" class="showimg" @click="showImg(data, data.image[0])" style=" width: 100%; height: auto; cursor: zoom-in;" />
      </div>
      <img :src="data.image[0]" class="showimg" @click="showImg(data, data.image[0])" style="border-radius: 4px; width: 125px; height: 125px; cursor: zoom-in;" v-else-if="kind=='comment'" />
      <img :src="data.image[0]" class="showimg" @click="showImg(data, data.image[0])" style="border-radius: 8px;width: 400px; height: auto; cursor: zoom-in;" v-else />
    </div>

    <ul v-else class="img-grid smallimg-wrap clearfix">
      <template v-for="(img, k) in data.image" :key="k">
        <li class="relative" style="border-radius: 8px; overflow:hidden; width: 200px; height: 200px;" @click="showImg(data, img)" v-if="data.image.length == 2 || data.image.length == 4">
          <v-img :src="img" />
          <div class="absolute align_center pt45" style="background: rgba(0, 0, 0, 0.75); top: 0; right: 0; bottom: 0; left: 0; z-index: 1" v-if="k=== 8 && data.image.length > 9">
            <span class="font18 cl-white">+{{data.image.length-9}}</span>
          </div>
        </li>
        <li class="relative" style="border-radius: 8px; overflow:hidden;" @click="showImg(data, img)" v-else-if="k < 9">
          <v-img :src="img" />
          <div class="absolute align_center pt45" style="background: rgba(0, 0, 0, 0.75); top: 0; right: 0; bottom: 0; left: 0; z-index: 1" v-if="k=== 8 && data.image.length > 9">
            <span class="font18 cl-white">+{{data.image.length-9}}</span>
          </div>
        </li>
      </template>
    </ul>
  </div>
</div>
<v-layer v-model:isShow="showFlag" :data="currentData" v-if="showFlag" type="image" :hasInfo="false" :hasComment="false" />
</template>

<script setup lang="ts">
import {
  defineProps,
  ref
} from '@/utils'
import VueEvent from '@/utils/event'
import Slideshow from './slide.vue'
const props: any = defineProps({
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
})
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
</script>
