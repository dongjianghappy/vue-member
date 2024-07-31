<template>
<div class="container w1100 clearfix">
  <div class="module-wrap">
    <div class="module-content p25 relative" style="min-height: 650px;">
      <span class="absolute" style="left: 15px; top: 25px; z-index: 100">
        <v-back />
      </span>
      <div class="mb50 font20 bold align_center">{{detail.title}}</div>
      <div class="mb25" style="line-height: 25px;" v-html="detail.content"></div>
      <div>
        <span @click="handelClick">立即领取</span>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  ref,
  useStore,
  onMounted,
  codings
} from '@/utils'
const {
  proxy
}: any = getCurrentInstance();
const store: any = useStore()
const detail: any = ref({})
const coding: any = codings.service.contact

function handelClick() {
  store.dispatch('common/Fetch', {
    api: 'receive',
    data: {
      artid: detail.value.id
    }
  }).then((res: any) => {
    proxy.$hlj.message({
      type: 'info',
      msg: res.returnMessage
    })
  })
}

function init() {
  store.dispatch('common/Fetch', {
    api: 'huodong',
    data: {
      coding
    }
  }).then((res: any) => {
    detail.value = res.result
  })
}

onMounted(init)
</script>
