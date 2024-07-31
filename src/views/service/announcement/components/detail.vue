<template>
  <div class="module-wrap">
    <div class="module-content basic-info" style="height: 560px;">
      <div class="mb25 font20 bold align_center">{{detail.title}}</div>
      <div class="module-content form-wrap-box font18" v-html="detail.content">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  useStore,
  onMounted,
  codings,
  useRoute
} from '@/utils'

const store: any = useStore()
const route: any = useRoute()
const detail: any = ref({})
const coding: any = codings.service.announcement

function init() {
  store.dispatch('common/Fetch', {
    api: 'detail',
    data: {
      coding,
      id: route.query.id
    }
  }).then((res: any) => {
    detail.value = res.result
  })
}

onMounted(init)
</script>
