<template>
<div class="module-wrap">
  <div class="module-head">
    收集能量球开始养鱼
    <span class="right"><i class="iconfont icon-more1" @click="handleClick"></i></span>
  </div>
  <div class="module-content plr15 font12 align_center">
    <div class="flex" style="flex-wrap: wrap; justify-content: center;">
      <div class="ptb10" style="width: 33.3333%;" v-for="(item, index) in dataList" :key="index">
        <div class="pt5" :class="`${item.image}_a`" style="width: 100%; height: 40px;"></div>
        <div>{{item.name}} X {{item.count}}</div>
      </div>
    </div>
    <div class="mt25">
      <div>当前正在饲养 39 尾</div>
    </div>
  </div>
  <div class="module-foot p15 font12 flex" style="justify-content: space-around;">
    <div style="background: var(--input-background); border-radius: 30px; color: var(--button-font); width: 65px; height: 32px; line-height: 32px; text-align: center;">
      <Detail />
    </div>
    <div style="background: var(--input-background); border-radius: 30px; color: var(--button-font); width: 115px; height: 32px; line-height: 32px; text-align: center;"> 
      <Sea />  
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  computed,
  useStore,
  ref,
  useRouter,
  getUid
} from '@/utils'

import Detail from './detail.vue'
import Sea from './sea.vue'

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter()
const dataList: any = ref([])
let current: any = ref(0)

function init() {
  store.dispatch('common/Fetch', {
    api: "seaFish",
    data: {
      type: 1
    }
  }).then(res => {
    dataList.value = res.result || []
  })
}

function handleClick(){
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/fish`
  }))
}

onMounted(init)
</script>
