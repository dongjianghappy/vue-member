<template>
  <div class="module-wrap three-left m0">
    <div class="module-content p0">
      <Item :data="data" />
      <Layer :data="data" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  computed,
  useStore
} from '@/utils'


import Item from './item.vue'
import Layer from './layer/index.vue'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

</script>
