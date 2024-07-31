<template>
<div class="module-wrap">
  <div class="module-content user-photos p0" style="overflow: unset;">
    <div class="user-head" :style="`background: url(${userInfo.head_background}) no-repeat; background-size: cover`">
      
      <div class="photos ">
        <v-photo :data="userInfo" sub="v" />
      </div>
    </div>
    <div class="user-info">
      <div class="name-box">
        <div class="mb5 font16 bold"> {{userInfo.nickname}} <span style="color: var(--color-primary)">LV.{{userInfo.level}}</span>
        </div>
      </div>
      <div class="name-atten mb15">
        <v-concern :userInfo="userInfo" :basic="true" />
      </div>
      <ul class="name-info">
        <li><i class="iconfont icon-blogger mr5" /> {{userInfo.blogger || '暂无说明信息'}}</li>
        <li><i class="iconfont icon-article mr5" /> {{userInfo.introduction || '暂无简介信息'}}</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  ref,
  reactive,
  computed,
  useRouter,
  useStore,
  getUid
} from '@/utils'
import citys from '@/assets/cityData'
const {
  proxy
}: any = getCurrentInstance();
const store = useStore()
const router = useRouter()
const userInfo: any = ref({})


function init() {
  store.dispatch('common/Fetch', {
    api: "UserInfo",
    data: {
      uid: getUid()
    }
  }).then(res => {
    userInfo.value = res.result.userInfo
  })
}

onMounted(init)
</script>
