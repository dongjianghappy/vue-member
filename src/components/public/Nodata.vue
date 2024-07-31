<template>
<div class="p50 align_center font14" v-if="data.length === 0">
  <div class="mb10" v-if="icon"><i class="iconfont icon-info font32" /></div>
  {{trip}}</div>
</template>

<script setup lang="ts">
import {
  defineProps
} from 'vue'
const props: any = defineProps({
  data: {
    type: Array,
    default: []
  },
  icon: {
    type: Boolean,
    default: true
  },
  trip: {
    type: String,
    default: "暂时没有数据"
  }
})
</script>
