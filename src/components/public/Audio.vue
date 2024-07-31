<template>
  <i class="iconfont listen" :class="`icon-${isplay ? 'audio' : 'listen'}`" @click="handlePlay"></i>
</template>

<script setup lang="ts">
import {
  defineProps
} from '@/utils'
import VueEvent from '@/utils/event'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

function handlePlay(e: any, index: any, status: any) {
  VueEvent.emit("musicPley", props.data);
}
</script>
