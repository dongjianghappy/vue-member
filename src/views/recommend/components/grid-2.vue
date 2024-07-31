<template>
<div class="relative">
    <ul class="img-grid smallimg-wrap flex p15" style="flex-wrap: wrap; width: initial">
      <template v-for="(img, k) in data.image" :key="k">
        <li class="relative m0 radius-4 img-box" style=" overflow:hidden; width: 100%; height: calc(50% - 5px);" :class="{mb10: k==0}" @click="showImg(data, img)">
          <v-img :src="img" />
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
