<template>
<div class="relative">
    <ul class="img-grid smallimg-wrap flex p15 pt10" style="flex-wrap: wrap; justify-content: center; width: auto">
      <template v-for="(img, k) in data.image" :key="k">
        <li class="relative p5 img-box" style=" width: 30%; height: 30.33333%; overflow: hidden;" @click="showImg(data, img)">
          <v-img :src="img" />
          <div class="absolute align_center pt45" style="background: rgba(0, 0, 0, 0.75); top: 0; right: 0; bottom: 0; left: 0; z-index: 1" v-if="k=== 8 && data.image.length > 9">
            <span class="font18 cl-white">+{{data.image.length-9}}</span>
          </div>
        </li>
      </template>
    </ul>
</div>
<v-layer v-model:isShow="showFlag" :data="currentData" v-if="showFlag" type="image" :hasInfo="false" :hasComment="false" />
</template>

<script setup lang="ts">
import {
  defineProps,
  onMounted,
  ref
} from '@/utils'
import VueEvent from '@/utils/event'
const props: any = defineProps({
  data: {
    type: Array,
    default: () => {
      return []
    }
  }
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
