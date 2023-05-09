<template>
<img :src="data.photos || require('@/assets/image/head_normal_100.png')" class="mr10">
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
