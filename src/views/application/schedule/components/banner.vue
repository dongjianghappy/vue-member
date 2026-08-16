<template>
  <div class="container w1100 mb15 radius-4 relative" style="background: var(--module-background); height: 200px;">
    <div class="flex font32 p25">
      <div style="width: 50px;"><i class="m0 mr15 iconfont icon-img font24" style="font-size: 44px !important;" /></div>
      <div style="width: 150px;">打卡乐园</div>
      <span class="toggle ml25" @click="handleClick(route.query.mod === 'myschedule' ? '' : 'myschedule')">{{route.query.mod === 'myschedule' ? '我的' : '全部'}}<i class="iconfont icon-toggle" /></span>
    </div>
    <div class="flex absolute plr25 font18" style="bottom: 25px; width: 100%;">
      <div style="flex: 1">每天一小步，成长看得见</div>
      <div class="w100 align_center mr15 p10" @click="handleSchedule" v-if="route.query.mod === 'myschedule'">日程管理</div>
      <div class="w100 align_center mr15 p10" @click="handleClick" v-else>日程管理</div>
      <div class="w100 align_center mr15 p10" @click="handleRanking">日程榜单</div>
    </div>
    <div class="energy absolute" @click="handleEnergy">能量球:123</div>
  </div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineProps,
  ref,
  watch,
  useStore,
  useRouter,
  useRoute,
  getUid
} from '@/utils'

const {
  proxy
}: any = getCurrentInstance();
const detail: any = ref({})
const router = useRouter();
const route = useRoute();

function handleRanking(){
    router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/schedule?mod=ranking`
  }))
}

function handleClick(param: any){
  let query = ""
  if(param === 'myschedule'){
    query = `?mod=${param}`
  }

  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/schedule${query}`
  }))
}

function handleAction(){
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/schedule?mod=dynamics`
  }))
}

function handleEnergy(){
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/schedule?mod=energy`
  }))
}

function handleSchedule(){
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/schedule?mod=myschedule`
  }))
}

function handleDate(){
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/schedule?mod=myschedule&item=month`
  }))
}

// function handleRecord(){
//     router.push(proxy.const.setUrl({
//     uid: getUid(),
//     query: `/schedule?mod=record`
//   }))
// }
</script>

<style scoped>
.toggle{
    background: var(--card-background);
    padding: 10px;
    font-size: 18px;
    border-radius: 50px;
}
.energy{
  top: 30px;
  right: 25px;
  color: #8bc34a;
}
</style>