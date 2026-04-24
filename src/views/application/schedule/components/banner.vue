<template>
  <div class="container w1100 mb15 radius-4 relative" style="background: var(--module-background); height: 200px;">
    <div class="flex font32 p25">
      <i class="m0 mr15 iconfont icon-img font24" style="font-size: 44px !important;" />
      打卡乐园
    </div>
    <div class="flex absolute plr25 font18" style="bottom: 25px; width: 100%;">
      <div style="flex: 1">每天一小步，成长看得见</div>
      <div class="w100 align_center mr15 p10" @click="handleRecord">打卡记录</div>
      <div class="w100 align_center mr15 p10" @click="handleRanking">日程榜单</div>
      <div class="w100 align_center p10" @click="handleClick">我的日程</div>
      <!-- style="background: var(--color-primary-background); border-radius: 50px;" -->
    </div>
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
  getUid
} from '@/utils'

const {
  proxy
}: any = getCurrentInstance();
const detail: any = ref({})
const router = useRouter();

function handleRanking(){
    router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/schedule?mod=ranking`
  }))
}

function handleClick(){
    router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/schedule?mod=myschedule`
  }))
}

function handleRecord(){
    router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/schedule?mod=record`
  }))
}
</script>
