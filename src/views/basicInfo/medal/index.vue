<template>
<div class="module-wrap">
  <div class="module-head">勋章墙</div>
  <div class="module-content p10" style="padding-bottom: 25px !important; height:auto">
    <v-tabs :tabs="tabs" :isEmit="true" v-model:index="index">
      
      <template v-slot:[name]="slotName" v-for="name in slotName" :key="name">
        <div class="col-md-3 align_center" v-for="(item, i) in list" :key="i">
          <div>
            <Detail :data="item" :render="init" />
          </div>
          <div class="mt15 font16">{{item.name}}</div>
          <div class="font12">{{item.earned === '1' ? "已获得" : "未获得"}}</div>
        </div>
      </template>
      
    </v-tabs>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  codings,
  computed,
  onMounted,
  ref,
  useStore
} from '@/utils'
import detailVue from '@/views/content/visitor/components/detail.vue';

import Detail from "./detail.vue"

const coding = codings
const store = useStore();
const index: any = ref(0)
const tabs: any = ref([])
const dataList: any = ref([]);
const slotName: any = ref([])

const list: any = computed((item: any) => {
  console.log("ssssssssssss");
  let list = []
  if(dataList.value.length > 0){
    list = dataList.value[index.value].list
  }
  // dataList.value && dataList.value[index].list
  return list
})

function init() {
  store.dispatch('common/Fetch', {
    api: "medalList"
  }).then(res => {
    dataList.value = res.result
    tabs.value = []
    slotName.value = []
    res.result.map((item: any, index: any) => {
      tabs.value.push({
        name: item.name,
        value: item.id
      })
      slotName.value.push('content'+(parseInt(index)+1))
    })
  })
}

onMounted(init)
</script>
