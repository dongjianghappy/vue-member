<template>
<div class="mr10 relative" style=" width: 32px; height: 32px; display: inline-block; float: left;">
  <img :src="data.photos || require('@/assets/image/head_normal_100.png')">
  <span class="absolute font12 cl-white align_center" style="background: #00a4ff; border-radius: 50%; width: 16px; height: 16px; right: -2px; bottom: -2px" v-if="condition.tag">
    {{condition.value}}
  </span>
</div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'
export default defineComponent({
  name: 'v-Avatar',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    condition: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped>
img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  float: left
}
</style>
