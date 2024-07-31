<template>
<div class="container w1100 mb15" style="overflow: hidden; border-radius: 4px; height: 400px">
  <div class="user-banner relative" :style="`background: url(${userInfo.home_background}) no-repeat; background-size: cover; opacity: 1;`">
    <span class="absolute" style="top: 5px; right: 0" v-if="loginuser.currentUser">
      <v-selectbackground kind="home_background" :style="{width: 1170, height: 570}" :img="{width: 1440}" :size="{width: 1000, height: 300}" /></span>
  </div>
  <div class="activity_wrap relative" style="background: var(--module-background);">
    <div class="absolute align_center" style="left: 25px; bottom: 40px;">
      <div style="border-radius: 50%; border: 3px solid #fff; width: 150px; height: 150px; overflow: hidden;">
        <img :src="userInfo.photos" width="150" height="150" style="cursor:pointer; display: inline-block;" class="userphotos">
      </div>
    </div>
    <div class="pt10" style="padding-left: 200px;">
      <div class="pb10 font16">
        <span class="mr5 font18">{{userInfo.nickname}}<i class="iconfont" :class="`icon-${userInfo.sex ? 'male': 'female'}`" /></span>
        <span style="color: #f67f00;">LV.{{userInfo.level}}</span>
        <span class="ml15" :class="userInfo.verified === '1' ? 'cl-eb7350' : 'cl-999'" @click="handleVerified" v-if="loginuser && loginuser.account">V认证</span>
        <span class="ml15 font12"><i class="iconfont icon-blogger mr5" style="color: #ffa82c;" />{{userInfo.blogger}}</span>
        <div class="right pr15">
          <div class="mb30 align_right">
            <v-share title="分享主页" :data="userInfo.homeUrl" />
          </div>
          <div>
            <span>
              <v-concernbutton :data="userInfo" type="user" class="btn-login" /></span>
            <span class="btn-login ml15">私信</span>
          </div>
        </div>
      </div>
      <div>
        <v-concern :userInfo="userInfo" />
        <!-- <span @click="handleClickss(userInfo.account, 'myconcern')">关注：{{userInfo.myconcern}}</span>
        <span class="ml15" @click="handleClickss(userInfo.account, 'concernmy')">粉丝：{{userInfo.concernmy}}</span>
        <span class="ml15">获赞：{{userInfo.myconcern}}</span> -->
      </div>
      <div class="mt10 font12">
        <span class="mr15">博客号: {{userInfo.account}}
          <v-copy name="复制博客号" :content="userInfo.account" />
        </span>
        <span>家乡：{{address.province}}</span>
      </div>
      <div class="mt5 pr25 font12 cl-999 multiple-wrap-2">{{userInfo.introduction}}</div>
    </div>
  </div>

</div>
</template>

<script setup lang="ts">
import {
  defineEmits,
  getCurrentInstance,
  computed,
  reactive,
  useRouter,
  useStore,
  getUid
} from '@/utils'
import Mood from '../../index/components/mood.vue'
import MoodList from '../../index/components/mood.vue'
import citys from '@/assets/cityData'

const emit: any = defineEmits(['onClick'])
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter();
const userInfo: any = computed(() => store.getters['user/userInfo']);
const loginuser = computed(() => store.getters['user/loginuser']);
const cityData: any = reactive(citys)

function handleclick(param: any) {
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: param
  }))
  emit('onClick')
}

function handleMood() {
  router.push(`/u/${userInfo.value.account}/mood`)
}

function handleConcern(param: any) {
  if (param === 'praise') {
    router.push(proxy.const.setUrl({
      uid: getUid(),
      query: `?mod=${param}`
    }))
  } else {
    router.push(proxy.const.setUrl({
      uid: getUid(),
      query: `/concern?mod=${param}`
    }))
  }
}

const address = computed(() => render());

function render() {
  let province = ""
  let city = ""
  let area = ""
  for (var i in cityData) {
    const arr = i.split(',');
    if (arr.length == 1) {
      province = cityData[i][userInfo.value.province]
    }
  }

  return {
    province
  }
}

function handleVerified() {
  router.push('/verified')
}

function handleClickss(uid: any, param: any) {
  store.dispatch('common/Fetch', {
    api: "verificationGrade",
    data: {
      uid: uid,
      type: 'concernList',
      query: param
    }
  }).then(res => {
    if(res.ifSuccess){
      window.location.href = proxy.const.setUrl({
        uid: uid,
        query: res.result
      })
    }else{
    proxy.$hlj.message({
      type: 'info',
      msg: res.returnMessage
    })
    }
    
  })
}
</script>

<style scoped>
.user-banner {
  height: 260px;
}

.activity_wrap {
  height: 140px
}
</style>
