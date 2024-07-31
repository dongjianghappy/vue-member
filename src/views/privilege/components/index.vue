<template>
<div class="module-wrap">
  <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 510px">
    <div class="mb15 font18 bold">数据概览</div>
    <div class="col-md-3 p10">
      <v-cards :data="{title: '昨日阅读', value: '0'}" />
    </div>
    <div class="col-md-3 p10">
      <v-cards :data="{title: '昨日播放', value: '0'}" />
    </div>
    <div class="col-md-3 p10">
      <v-cards :data="{title: '昨日转评赞', value: '0'}" />
    </div>
    <div class="col-md-3 p10">
      <v-cards :data="{title: '新增粉丝', value: '0'}" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  useStore,
  getUid
} from '@/utils'

const store = useStore();
const dataList: any = ref([])

function init() {
  store.dispatch('common/Fetch', {
    api: 'visitorList',
    data: {
      uid: getUid()
    }
  }).then(res => {
    dataList.value = res.result
  })
}

onMounted(init)
</script>
