<template>
<div class="module-wrap">
  <div class="module-content user-photos p0" style="overflow: unset;">
    <div class="user-head" :style="`background: url(${userInfo.head_background}) no-repeat; background-size: cover`">
      <v-selectbackground kind="head_background" />
      <div class="photos ">
        <v-photo :data="userInfo" :v="false" />
      </div>
    </div>
    <div class="user-info">
      <div class="name-box">
        <div class="mb5 font16 bold"> {{userInfo.nickname}} <span style="color: var(--color-primary)">LV.{{userInfo.level}}</span>
          <span class="ml10" :class="userInfo.verified === '1' ? 'cl-eb7350' : 'cl-999'" @click="handleVerified">V认证</span>
        </div>
        <div class="font12">博客号: {{userInfo.account}}
          <v-copy name="复制博客号" :data="userInfo.account" />

          <v-qrcode :user="userInfo" />
          
          <v-copy icon="share" name="分享主页" data="123123" />

          <span class="integration relative">
            <i class="iconfont icon-integration" />
            <v-integration :userInfo="userInfo" :style="{background: 'bg-red',color: 'cl-red', top: '60px'}" />
          </span>

          <span><i class="iconfont icon-medal" title="我的勋章" @click="handleRouter('medal')" /></span>
          <!-- <Mood /> -->
        </div>
      </div>
      <div class="name-atten mb15">
        <v-concern />
      </div>
      <!-- <ul class="name-info">
        <li><i class="iconfont icon-blogger mr5" /> {{userInfo.blogger}}</li>
        <li><i class="iconfont icon-article mr5" /> {{userInfo.introduction}}</li>
        <li><i class="iconfont icon-user-baisc mr5" />
          <span class="mr15">{{userInfo.sex ? '男': '女'}}</span>
          <span class="mr15">金牛座</span>
          <span>{{address.province}}</span>
        </li>
      </ul> -->
    </div>
  </div>
</div>
<!-- <div class="module-wrap">
  <div class="module-content user-photos p15 align_center pointer" @click="handleClick(userInfo.account)">
    查看个人主页 <i class="iconfont icon-arrow" />
  </div>
</div> -->
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useRouter,
  reactive,
  computed
} from '@/utils'
import Mood from '../mood.vue'
import citys from '@/assets/cityData'
export default defineComponent({
  name: 'UserInfoView',
  components: {
    Mood
  },
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const router = useRouter()
    const cityData: any = reactive(citys)

    function handleVerified() {
      router.push('/verified')
    }

    const address = computed(() => render());

    function render() {
      let province = ""
      let city = ""
      let area = ""
      for (var i in cityData) {
        const arr = i.split(',');
        if (arr.length == 1) {
          province = cityData[i][props.userInfo.province]
        }
      }

      return {
        province
      }
    }

    function handleClick(uid: any) {
      router.push(`${proxy.const.u}${uid}/home`)
    }

    function handleRouter(param: any) {
      router.push(proxy.const.setUrl({
        uid: props.userInfo.account,
        query: `/setting?mod=${param}`
      }))
    }

    return {
      handleVerified,
      address,
      handleClick,
      handleRouter
    }
  },
})
</script>
