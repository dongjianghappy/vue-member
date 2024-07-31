<template>
<div id="aside-box" style="width: 280px">
  <UserInfo v-if="loginuser.account" />
  <UserLogin v-else />
  <Sign v-if="loginuser.account && module.sign" />
  <Calendar v-if="module.calendar" :render="render" />
  <CreatorCenter v-if="loginuser.account && module.creator" />
  <Hot v-if="module.hot_search" />
  <RecommendUser v-if="module.recommended_users" />
  <HotTalk v-if="module.hot_topic" />
  <Visitor :userInfo="loginuser" v-if="loginuser.account && module.recent_visitors" />
  <Footer id="ranking" v-if="module.footer" />
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  onMounted,
  computed,
  useStore
} from '@/utils'
import UserInfo from './module/userInfo.vue'
import UserLogin from './module/userLogin.vue'
import Sign from './module/sign.vue'
import Calendar from './module/calendar.vue'
import CreatorCenter from './module/creatorCenter.vue'
import Hot from '@/views/module/hot.vue'
import RecommendUser from './module/recommendUser.vue'
import HotTalk from './module/hotTalk.vue'
import Visitor from './module/visitor.vue'
import Footer from '@/views/layout/components/footer/footer.vue'

const props: any = defineProps({
  render: {
    type: Function,
    default: () => {
      return
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore()
const module = computed(() => store.getters['user/config_talk'].personal_center || {});
const loginuser = computed(() => store.getters['user/loginuser']);
onMounted(() => {
  proxy.$scroll.init({
    win: {
      el: window,
      y: 0,
      id: 'ranking',
      b: 80
    },
    doc: {
      p: 'aside-box',
      el: 'aside_fixed'
    },
    type: "sideFixed"
  })
})
</script>
