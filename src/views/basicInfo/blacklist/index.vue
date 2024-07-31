<template>
<div class="module-wrap">
  <div class="module-head">黑名单列表</div>
  <div class="module-content p10" style="padding-bottom: 25px !important; min-height: 650px">
    <ul class="clearfix">
  <li class="flex mb10 p10" v-for="(item, index) in dataList" :key="index">
    <div style="width: 65px">
      <v-photos :sourceData="item" />
    </div>
    <div class="bold" style="flex: 1; line-height: 50px;">{{item.nickname}}</div>
    <div class="w100">
      <v-switch :data="{ item: item, field: 'status'}" :param="{uid: item.account}" api="joinBlack" @toggle="getValue" className="right" :auth="true" />
    </div>
  </li>
</ul>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  useStore
} from '@/utils'

const store = useStore();
const dataList = computed(() => store.getters['common/blacklist']);

function init(param: any = {}) {
  store.dispatch('common/Blacklist', {
    ...param
  })
}

function getValue(param: any){
  init()
}
onMounted(init)
</script>
