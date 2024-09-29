<template>
<v-button v-model:show="isShow">
  <img :src="data.cover" style="width: 200px; height: 100px" />
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="上传图片" :style="{width: 800, height: 650}" @submit="submit">
  <template v-slot:content>
    <div>
      {{data.image}}
      <div class="font12 cl-666" @click="upload.handleclick()">
          上传图片
        </div>
        
      <v-upload ref="upload" :dataList="data.image || []" @imgList="image" file="talk" :mask="true" />
              
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
    type: Array,
    default: []
  }
})

const emit: any = defineEmits(['upload'])
const isShow = ref(false)
const img: any = ref("")
const upload: any = ref(null);

// 监听图片上传
function image(a: any) {
  img.value = a
}

function submit() {
  let arr = img.value.split('|')
  let newArr = arr.splice(arr.length-2)
  emit('upload', newArr)
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
