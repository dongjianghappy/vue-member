<template>
  <div class="batch-btngroup bg-white mlr10 p10">
    <span class="mr15"
          @click="handleclick('all')">全选</span>
    <span class="mr15"
          @click="handleclick('all')">移动</span>
    <span class="mr15"
          @click="handleclick('all')">移动文档</span>
    <span class="mr15"
          @click="handleclick('all')">删除</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  emits: ['onClick'],
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();

    function handleclick(){
      alert("sss")
      context.emit('onClick')
    }
    return {
      handleclick
    }
  }
})
</script>
