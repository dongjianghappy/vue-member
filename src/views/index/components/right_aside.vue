<template>
<div id="aside-box" style="width: 280px">
  <UserInfo :userInfo="loginuser" v-if="loginuser.account" />
  <UserLogin :userInfo="loginuser" v-else />
  <Sign v-if="loginuser.account && module.sign" />
  <Calendar v-if="module.calendar" :render="render" />
  <CreatorCenter v-if="loginuser.account && module.creator" />
  <RecommendUser v-if="module.recommended_users" />
  <HotTalk v-if="module.hot_topic" />
  <Visitor :userInfo="loginuser" v-if="loginuser.account && module.recent_visitors" />
  <Footer id="ranking" v-if="module.footer" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
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
import RecommendUser from './module/recommendUser.vue'
import HotTalk from './module/hotTalk.vue'
import Visitor from './module/visitor.vue'
import Ranking from './module/ranking.vue'
import Footer from '@/views/layout/components/footer/footer.vue'

export default defineComponent({
  name: 'RightView',
  components: {
    UserInfo,
    UserLogin,
    Sign,
    Calendar,
    CreatorCenter,
    RecommendUser,
    HotTalk,
    Visitor,
    Ranking,
    Footer
  },
  props: {
    render: {
      type: Function,
      default: () => {
        return
      }
    },
  },
  setup() {
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

    return {
      module,
      loginuser
    }
  }
})
</script>
