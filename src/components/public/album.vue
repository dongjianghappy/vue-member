<template>
<v-button v-model:show="isShow">
  <img :src="data.cover" style="width: 200px; height: 100px" />
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="选择图片" :style="{width: 800, height: 650}" @submit="submit">
  <template v-slot:content>
    <div>
      <div class="album-list col-md-4 pb20 plr10" :class="{current: item === currentImage }" v-for="(item, index) in data.image" :key="index">
        <img :src="item" style="width: 100%; height: 200px" @click="handleClick(item)" />
      </div>
    </div>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  computed,
  ref
} from '@/utils'
import QrcodeVue from 'qrcode.vue'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const isShow = ref(false)
const currentImage: any = ref(props.data.cover)

function handleClick(param: any) {
  currentImage.value = param
}

function submit() {
  props.data.cover = currentImage.value
  isShow.value = false
}
</script>

<style lang="less" scoped>
.album-list {
  img {
    filter: brightness(0.35);
  }

  &.current {
    img {
      filter: brightness(1);
    }
  }
}
</style>
