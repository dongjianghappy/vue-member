<template>
<Audio :dataList="dataList" :data="data" />
</template>

<script setup lang="ts">
import {
  defineProps,
  ref
} from '@/utils'
import Audio from '../../../../frontend/sound/components/audio.vue'

const props: any = defineProps({
  dataList: {
    type: Array,
    default: () => {
      return []
    }
  },
  data: {
    type: Array,
    default: () => {
      return []
    }
  }
})
</script>
