<template>
<span @click="handleClick">
  <i class="iconfont icon-refresh1"></i>点击刷新
</span>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from 'vue'

export default defineComponent({
  name: 'v-Refresh',
  props: {
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
  },
  emits: ['update:number'],
  setup(props, context) {
    let current: any = ref(0)

    function handleClick() {
      if (current.value === props.size || current.value === props.data.length - 1) {
        current.value = 0
      } else {
        current.value++
      }
      context.emit('update:number', current.value)
    }
    return {
      handleClick
    }
  }
})
</script>
