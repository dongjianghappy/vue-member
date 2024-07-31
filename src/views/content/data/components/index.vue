<template>
<TalkData :data="total" />
</template>

<script setup lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore
} from '@/utils'

import TalkData from './talk.vue'

const store = useStore();
const total: any = ref({});

function init() {
  store.dispatch('common/Fetch', {
    api: 'totalStatistics'
  }).then((res: any) => {
    total.value = res.result.total
  })
}

onMounted(init)
</script>
