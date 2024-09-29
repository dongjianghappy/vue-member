<template>
<div class="relative">
  <ul class="recommend-album img-grid smallimg-wrap p15" style="flex-wrap: wrap; width: auto" v-if="data.image.length === 1">
    <template v-for="(img, k) in data.image" :key="k">
      <li class="relative m0 radius-4 img-box" style="overflow:hidden; width: 100%; height: 100%;" @click="showImg(data, img)" v-if="data.image.length == 1">
        <v-img :src="img" />
      </li>
    </template>
  </ul>
  <ul class="recommend-album img-grid smallimg-wrap flex p15" style="flex-wrap: wrap; width: initial" v-else-if="data.image.length === 2">
    <template v-for="(img, k) in data.image" :key="k">
      <li class="relative m0 radius-4 img-box" style=" overflow:hidden; width: 100%; height: calc(50% - 5px);" :class="{mb10: k==0}" @click="showImg(data, img)">
        <v-img :src="img" />
      </li>
    </template>
  </ul>
  <ul class="recommend-album img-grid smallimg-wrap flex p15" style="flex-wrap: wrap; width: initial" v-else-if="data.image.length === 3">
    <li class="relative m0 mr10  radius-4 img-box flex" style="align-items: center; overflow:hidden; width: calc(50% - 5px); height: 100%;" @click="showImg(data, data.image[0])">
      <v-img :src="data.image[0]" />
    </li>
    <li class="m0" style="width: calc(50% - 5px); height: 100%">
      <div class="relative m0 mb10 radius-4 img-box" :id="`img-${k}`" style="overflow:hidden; width: 100%; height: calc(50% - 5px);" @click="showImg(data, data.image[1])">
        <v-img :src="data.image[1]" />
      </div>
      <div class="relative m0 radius-4 img-box" :id="`img-${k}`" style="overflow:hidden; width: 100%; height: calc(50% - 5px);" @click="showImg(data, data.image[2])">
        <v-img :src="data.image[2]" />
      </div>
    </li>
  </ul>
  <ul class="recommend-album img-grid smallimg-wrap flex p15" style="flex-wrap: wrap; width: initial" v-else>
    <template v-for="(img, k) in data.image" :key="k">
      <li class="relative m0 radius-4 img-box" style="overflow:hidden; width: calc(50% - 5px); height: calc(50% - 5px);" :class="{'mr5': k === 0 || k === 2, 'ml5': k === 1 || k === 3, 'mb5': k === 0 || k === 1, 'mt5': k === 2 || k === 3, }" @click="showImg(data, img)" v-if="k<4">
        <v-img :src="img" />
        <div class="absolute align_center pt45" style="background: rgba(0, 0, 0, 0.75); top: 0; right: 0; bottom: 0; left: 0; z-index: 1" v-if="k=== 3 && data.image.length > 4">
          <span class="font18 cl-white">+{{data.image.length-4}}</span>
        </div>
      </li>
    </template>
  </ul>
</div>
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
