<template>
<span @click="handleCopy($event, content)">
  <span v-if="title">{{title}}</span>
  <i class="iconfont icon-copy" :title="name" v-else></i>
</span>
</template>

<script setup lang="ts">
import {
  defineProps,
} from 'vue'
import {
  handleCopy,
} from '@/utils/fn'

const props: any = defineProps({
  title: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: '复制'
  },
  content: {
    type: String,
    default: ""
  }
})
</script>
