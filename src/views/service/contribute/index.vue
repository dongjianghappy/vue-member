<template>
<div class="container w1100 clearfix">
  <div class="module-wrap">
    <div class="module-content flex" style="height: 700px;">
      <div class="p25" style="flex: 1">
        <Form />
      </div>
      <div class="p25" style="width: 450px">
        <Explanation />
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  ref,
  useStore,
  onMounted,
  codings
} from '@/utils'

import Form from "./components/form.vue"
import Explanation from "./components/explanation.vue"

const store: any = useStore()
const detail: any = ref({})
const coding: any = codings.service.contact

function init() {
  store.dispatch('common/Fetch', {
    api: 'contact',
    data: {
      coding
    }
  }).then((res: any) => {
    detail.value = res.result
  })
}

onMounted(init)
</script>
