<template>
<div class="flex">
  <div style="padding-top: 15px; width: 30px" @click="toggle(-1)">
    <div class="deg180" style="width: 30px; height: auto"><i class="iconfont icon-arrow" style="font-size: 18px !important;" />
    </div>
  </div>
  <div class="relative" style="flex: 1; height: 55px; overflow: hidden;">
    <div class="absolute slider" style="height: 55px; transition: all 0.3s;" :style="{width: `${112*dataList.length}px`}">
      <div class="p5 left" style="width: 112px" v-for="(item, index) in dataList" :key="index">
        <div class="p10 align_center pointer radius-4" :class="{'slider-current': currentIndex == index}" @click="handleClick(item, index)" :style="item.style ? item.style : 'background: var(--module-background);'">
        {{item.name}}
        </div>
      </div>
    </div>
  </div>
  <div style="padding-top: 15px; width: 30px" @click="toggle(1)">
    <div style="width: 30px; height: auto">
      <i class="iconfont icon-arrow" style="font-size: 18px !important;" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  ref,
  useStore
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  dataList: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const emit: any = defineEmits(['onClick'])
const store = useStore()
let index: any = ref(0) //播放指针
let currentIndex: any = ref(0)

function handleClick(param: any, index: any) {
  currentIndex.value = index
  emit('onClick', param)
}

// 图片预览
function toggle(num: any) {
  let slider: any = document.getElementsByClassName('slider')
  if ((num == '-1' && index.value == '0') || (num == '1' && index.value == props.dataList.length - 5)) {
    return
  }
  index.value = index.value + num
  slider[0].style.left = `-${index.value*112*5}px`
}

function handleSetting(data: any, param: any) {
  store.dispatch('common/Fetch', {
    api: 'Update',
    data: {
      coding: props.data.coding,
      id: param.id,
      visible: data
    }
  })
}
</script>

<style scoped>
.slider-current {
  background: var(--input-background) !important;
  color: var(--color-primary) !important;
}
</style>
