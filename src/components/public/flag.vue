<template>
<i class="cl-red" v-if="data.flag === 'new'">新</i>
<i class="cl-red" v-if="data.flag === 'hot'">热</i>
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
