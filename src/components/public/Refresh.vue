<template>
 <span @click="handleclick">
  <i class="iconfont icon-refresh1"></i>点击刷新
 </span>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'v-Refresh',
  props: {
    render: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();

    function handleclick(){
      props.render()
    }
    return {
      handleclick
    }
  }
})
</script>
