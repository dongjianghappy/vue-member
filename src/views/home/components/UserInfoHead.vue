<template>
<div class="container w1100 mb15" style="overflow: hidden; border-radius: 4px; height: 400px">
  <div class="user-banner relative" :style="`background: url(${userInfo.home_background}) no-repeat; background-size: cover; opacity: 1;`">
    <!-- <div class="mask-background absolute" style="background: rgba(0, 0, 0, 0.35); top: 0; left: 0; right: 0; bottom: 0"></div> -->
    <span class="absolute" style="top: 5px; right: 0" v-if="loginuser.currentUser">
      <v-selectbackground kind="home_background" :style="{width: 1170, height: 570}" :img="{width: 1440}" :size="{width: 1000, height: 300}" /></span>
  </div>
  <div class="activity_wrap relative" style="background: var(--module-background);">
    <div class="absolute align_center" style="left: 25px; bottom: 40px;">
      <div style="border-radius: 50%; border: 3px solid #fff; width: 150px; height: 150px; overflow: hidden;">
        <img :src="userInfo.photos" onerror="this.src='http://www.yunxi10.com/source/public/images/head_normal_100.png'" width="150" height="150" style="cursor:pointer; display: inline-block;" class="userphotos">
      </div>
    </div>
    <div class="pt10" style="padding-left: 200px;">
      <div class="pb10 font16">
        <span class="mr5 font18">{{userInfo.nickname}}</span>
        <span style="color: #f67f00;">LV.{{userInfo.level}}</span>
        <span class="ml15" :class="userInfo.verified === '1' ? 'cl-eb7350' : 'cl-999'" @click="handleVerified" v-if="loginuser && loginuser.account">V认证</span>
        <span class="ml15"><v-concernbutton :data="userInfo" type="user" /></span>
        <span class="ml15">私信</span>
      </div>
      <div>
        <span>粉丝：{{userInfo.concernmy}}</span>
        <span class="mr15">关注：{{userInfo.myconcern}}</span>
        <span class="mr15">获赞：{{userInfo.myconcern}}</span>
        <span class="mr15">IP属地：广州</span>
      </div>
      <div class="mt5 pr25 font12 cl-999 multiple-wrap-2">{{userInfo.introduction}}</div>
    </div>
    <!-- <ul class="mt10 align_right">
    <li class="inline font14 bold plr25" v-for="(item, index) in home_nav" :key="index" @click="handleclick(item.value)">{{item.name}}</li>
  </ul> -->
  </div>
  
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  useRouter,
  useStore,
  ref,
  getUid
} from '@/utils'
import Mood from '../../index/components/mood.vue'
import MoodList from '../../index/components/mood.vue'

export default defineComponent({
  name: 'v-Search',
  components: {
    Mood,
    MoodList
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const userInfo: any = computed(() => store.getters['user/userInfo']);
    const loginuser = computed(() => store.getters['user/loginuser']);
    const userSetting: any = computed(() => store.getters['user/userSetting'])
    const home_nav = computed(() => store.getters['user/config_talk'].home_nav);

    function handleclick(param: any) {
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: param
      }))
      context.emit('onClick')
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

    function handleVerified(){
      router.push('/verified')
    }

    return {
      handleclick,
      handleConcern,
      userInfo,
      loginuser,
      userSetting,
      handleMood,
      home_nav,
      handleVerified
    }
  }
})
</script>

<style scoped>
.user-banner {
  height: 260px;
}

.activity_wrap {
  height: 140px
}
</style>
