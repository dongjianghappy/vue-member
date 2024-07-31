<template>
<div class="module-wrap">
  <div class="module-content user-photos p0" style="overflow: unset;">
    <v-teststyle2 />
    <div class="user-head" :style="`background: url(${userInfo.head_background}) no-repeat; background-size: cover`">
      <v-selectbackground kind="head_background" :mask="{ w: 550, h: 350, tb: 50, lr: 50 }" />
      <div class="photos light ">
        <v-photo :data="userInfo" sub="v" />
      </div>
    </div>
    <div class="user-info">
      <div class="name-box">
        <div class="mb5 font16 bold"> {{userInfo.nickname}} <span style="color: var(--color-primary)">LV.{{userInfo.level}}</span>
          <span class="ml10" :class="userInfo.verified === '1' ? 'cl-eb7350' : 'cl-999'" @click="handleVerified">V认证</span>
          <span class="ml10" @click="handlePrivilege">权益</span>
        </div>
        <div class="font12">博客号: {{userInfo.account}}
          <v-copy name="复制博客号" :content="userInfo.account" />
          <v-qrcode :user="userInfo" />
          <span class="integration relative">
            <i class="iconfont icon-integration" />
            <v-integration :userInfo="userInfo" :style="{background: 'bg-red',color: 'cl-red', top: '60px'}" />
          </span>
          <span><i class="iconfont icon-medal" title="我的勋章" @click="handleRouter('medal')" /></span>
          <span><i class="iconfont icon-industry" title="我的卡包" @click="handleRouter('card_holder')" /></span>
        </div>
      </div>
      <div class="name-atten mb15">
        <v-concern :userInfo="userInfo" :basic="true" />
      </div>
      <ul class="name-info" v-if="module.blogger">
        <li><i class="iconfont icon-blogger mr5" /> {{userInfo.blogger}}</li>
        <li><i class="iconfont icon-article mr5" /> {{userInfo.introduction}}</li>
        <li><i class="iconfont icon-user-baisc mr5" />
          <span class="mr15">{{userInfo.sex ? '男': '女'}}</span>
          <span class="mr15">金牛座</span>
          <span>{{address.province}}</span>
        </li>
        <li><i class="iconfont icon-mood mr5" />
          【{{userInfo.mood}}】
          {{userInfo.mood_description}}
          <span>
            <Mood /></span>
        </li>
        <li class="font16 align_center">
          <v-share title="分享主页" :data="userInfo.homeUrl" />
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  useRouter,
  useStore,
  reactive,
  computed
} from '@/utils'
import Mood from '../mood.vue'
import citys from '@/assets/cityData'
const {
  proxy
}: any = getCurrentInstance();
const store = useStore()
const router = useRouter()
const module = computed(() => store.getters['user/config_talk'].personal_center || {});
const userInfo = computed(() => store.getters['user/loginuser']);
const cityData: any = reactive(citys)

const address = computed(() => {
  let province = ""
  for (var i in cityData) {
    const arr = i.split(',');
    if (arr.length == 1) {
      province = cityData[i][userInfo.value.province]
    }
  }

  return {
    province
  }
});

function handleVerified() {
  router.push('/verified')
}

function handlePrivilege(){
  router.push('/privilege')
}

function handleRouter(param: any) {
  if (param === 'mood') {
    router.push(proxy.const.setUrl({
      uid: userInfo.value.account,
      query: `/content?mod=${param}`
    }))
  } 
  else if (param === 'card_holder') {
    router.push(proxy.const.setUrl({
      uid: userInfo.value.account,
      query: `/${param}`
    }))
  }
  else {
    router.push(proxy.const.setUrl({
      uid: userInfo.value.account,
      query: `/info?mod=${param}`
    }))
  }
}
</script>
