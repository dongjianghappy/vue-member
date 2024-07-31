<template>
<div id="aside-box" style="width: 280px; height: 500px;">
  <Ask />
  <Recommend />
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted
} from '@/utils'
import Recommend from './recommend.vue'
import Ask from './asks.vue'

const {
  proxy
}: any = getCurrentInstance();

onMounted(() => {
  proxy.$scroll.init({
    win: {
      el: window,
      y: 0,
      id: 'ranking',
      b: 80
    },
    doc: {
      p: 'aside-box',
      el: 'aside_fixed'
    },
    type: "sideFixed"
  })
})
</script>
