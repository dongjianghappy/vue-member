<template>
<v-button v-model:show="isShow">
  选择封面
  <!-- <img :src="isEmit ? value : data.cover" onerror="this.src='/images/noimage.png'" :style="style" /> -->
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="选择图片" :style="{width: 600, height: 500}" @submit="submit">
  <template v-slot:content>
    <div>
      <div class="album-list col-md-4 pb20 plr10" :class="{current: item === cover }" v-for="(item, index) in data" :key="index">
        <img :src="item" onerror="this.src='/images/noimage.png'" style="width: 100%; height: 200px" @click="handleClick(item)" />
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
  },
  value: {
    type: String,
    default: ""
  },
  isEmit: {
    type: Boolean,
    default: false
  },
  style: {
    type: Object,
    default: () => {
      return {
        with: '160px',
        height: '120px'
      }
    }
  }
})
const emit: any = defineEmits(['update:value'])
const isShow = ref(false)

const cover: any = ref(props.value)

function handleClick(param: any) {
  cover.value = param
}

function submit() {
  emit('update:value', cover.value)
  // if (props.isEmit === true) {
  //   emit('update:value', cover.value)
  // }else{
  //   props.data.cover = cover.value
  // }
  console.log("sssssssddddddddddd");
  
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
