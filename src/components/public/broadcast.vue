<template>
<span @click="handleBroadcast(content)">
  <i class="iconfont icon-sound m0" />播报
</span>
</template>

<script setup lang="ts">
import {
  defineProps,
} from '@/utils'
import {
  handleBroadcast,
} from '@/utils/fn'
const props: any = defineProps({
  content: {
    type: String,
    default: ""
  }
})
</script>
