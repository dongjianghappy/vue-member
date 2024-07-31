<template>
<div class="p15 align_center" style="background: var(--card-background); border-radius: 8px;">
  <div>{{data.title}}</div>
  <div class="ptb5" style="color: #3f8600;">{{data.value}}</div>
  <div>昨日 {{data.value || '--'}}</div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps
} from 'vue'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>
