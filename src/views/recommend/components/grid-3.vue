<template>
<div class="relative">
    <ul class="img-grid smallimg-wrap flex p15" style="flex-wrap: wrap; width: initial">
        <li class="relative m0 mr10  radius-4 img-box left" style="overflow:hidden; width: calc(50% - 5px); height: 100%;" @click="showImg(data, data.image[0])">
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
