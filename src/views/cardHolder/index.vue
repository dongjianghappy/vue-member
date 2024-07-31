<template>
<div class="container w1100 clearfix">
  <div class="module-wrap">
    <div class="module-content" style="height: 650px;">
      <v-tabs :tabs="[{name: '优惠劵',value: 'image'}, {name: '会员卡',value: 'talk'}, {name: '纪念卡',value: 'jinian'}]" :isEmit="true" v-model:index="index">
        <template v-slot:content1>
          <Card1 :dataList="dataList.filter(item=>item.type === '0')" />
        </template>
        <template v-slot:content2>
          <Card :dataList="dataList.filter(item=>item.type === '1')" />
        </template>
        <template v-slot:content3>
          <Card :dataList="dataList.filter(item=>item.type === '2')" />
        </template>
      </v-tabs>
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

import Card from './components/card.vue'
import Card1 from './components/card1.vue'

const store: any = useStore()
const dataList: any = ref([])

function init() {
  store.dispatch('common/Fetch', {
    api: 'cardHolder',
  }).then((res: any) => {
    dataList.value = res.result
  })
}

onMounted(init)
</script>
