<template>
<div class="p15 align_center" style=" background: #f9f9f9; border-radius: 8px;">
  <div>{{data.title}}</div>
  <div class="ptb5">{{data.value}}</div>
  <div>较前日--</div>
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
