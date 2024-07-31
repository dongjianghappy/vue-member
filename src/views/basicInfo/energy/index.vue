<template>
<div class="module-wrap">
  <div class="module-head">能量明细</div>
  <div class="p10 cl-white">我的能量值 {{loginuser.energy}}</div>
  <div class="module-content p10" style="padding-bottom: 25px !important; height:auto" v-for="(item, index) in appstore" :key="index">
    <div class="p10" style="color: #f67f00">{{item.day}}</div>
    <div class="flex p10" style=" border-bottom: 1px solid var(--default-border);" v-for="(list, i) in item.list" :key="i">
      <div class="w50 mr15"><i :class="`iconfont icon-${list.icon} font32`" /></div>
      <div style=" flex: 1;">
        <div class="mb5">{{list.name}}</div>
        <div class="font12" style="color: #808080">{{list.times}}</div>
      </div>
      <div class="pt15 w50 font18 align_right">+{{list.energy}}g</div>
    </div>
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
const loginuser = computed(() => store.getters['user/loginuser']);
const appstore = computed(() => store.getters['common/energyList']);

function init(param: any = {}) {
  store.dispatch('common/EnergyList', {
    ...param
  })
}
onMounted(init)
</script>
