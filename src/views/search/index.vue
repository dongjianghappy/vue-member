<template>
<div>
  <div class="container w1100 relative pb25 clearfix">
    <div class="main-center left" style="width: 800px; min-height: 500px">
      <Center />
    </div>
    <div class="w280 right">
      <RightView :module="module.search" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  computed,
  useStore
} from '@/utils'

import Center from './center/index.vue'
import RightView from './components/right_aside.vue'

const store = useStore();
const module = computed(() => store.getters['user/config_talk']);
</script>
