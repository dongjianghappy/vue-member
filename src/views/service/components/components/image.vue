<template>
<div v-if="data.image.length === 1">
  <div style="margin-top: 25px; margin-right: 25px;" v-if="data.type === 'sign'">
    <img :src="data.image[0]" class="showimg" @click="showImg(data, data.image[0])" style=" width: 100%; height: auto; cursor: zoom-in;" />
  </div>
  <img :src="data.image[0]" class="showimg" @click="showImg(data, data.image[0])" style="border-radius: 8px;width: 250px; height: auto; cursor: zoom-in;" v-else />
</div>
<ul v-else class="img-grid smallimg-wrap clearfix">
  <li v-for="(img, k) in data.image" :key="k" style="border-radius: 8px; overflow:hidden;">
    <v-img :src="img" @click="showImg(data, img)" />
  </li>
</ul>
<v-layer v-model:isShow="showFlag" :data="currentData" :img="currentImg" v-if="showFlag" type="image" :hasComment="true" />
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from '@/utils'

export default defineComponent({
  name: 'v-Image',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup(props, context) {
    const showFlag: any = ref(false)
    const currentData: any = ref()
    const currentImg: any = ref()

    function showImg(data: any, img: any) {
      currentData.value = data
      currentImg.value = img
      showFlag.value = !showFlag.value
    }

    return {
      showFlag,
      currentData,
      currentImg,
      showImg
    }
  }
})
</script>
