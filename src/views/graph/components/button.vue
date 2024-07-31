<template>
<v-button v-if="type !== 'text'" @click="handleclick">
  <i class="iconfont icon-chart" style="color: #f67f00;"></i>
</v-button>
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

function handleclick(param: any) {
  VueEvent.emit("graph", props.data);
}
</script>
