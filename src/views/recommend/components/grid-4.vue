<template>
<div class="relative">
    <ul class="img-grid smallimg-wrap flex p15" style="flex-wrap: wrap; width: initial">
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
