<template>
<span @click="handleClick" class="cl-999">
  <i class="iconfont icon-refresh1"></i>点击刷新
</span>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  ref
} from 'vue'

const props: any = defineProps({
  data: {
    type: Array,
    default: () => {
      return
    }
  },
  number: {
    type: Number,
    default: 0
  },
  size: {
    type: String,
    default: 0
  },
})
const emit: any = defineEmits(['update:number'])
let current: any = ref(0)

function handleClick() {
  if (current.value === props.size || current.value === props.data.length - 1) {
    current.value = 0
  } else {
    current.value++
  }
  emit('update:number', current.value)
}
</script>
