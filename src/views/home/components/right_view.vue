<template>
<div id="aside-box" style="width: 280px">
  <div class="sidebar">
    <!-- <v-content /> -->
    <!-- <UserLogin v-if="!loginuser.account" /> -->
    <Calendar :render="render" />
    <RecommendUser />
    <HotTalk v-if="module.hot_topic" />
    <Journal />
    <Visitor v-if="loginuser.account && module.recent_visitors" />
    <!-- <Feedback /> -->
    <Footer id="ranking" v-if="module.footer"/>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed
} from 'vue'
import {
  useStore
} from 'vuex'
// import UserLogin from '../../index/components/module/userLogin.vue'
import HotTalk from '../../index/components/module/hotTalk.vue'
import Calendar from '../../index/components/module/calendar.vue'
import RecommendUser from '../../index/components/module/recommendUser.vue'
// import Feedback from '../../index/components/module/feedback.vue'
import Journal from '../../index/components/module/journal.vue'
import Visitor from '../../index/components/module/visitor.vue'
import Footer from '@/views/layout/components/footer/footer.vue'
export default defineComponent({
  name: 'AsideView',
  components: {
    // UserLogin,
    HotTalk,
    Calendar,
    RecommendUser,
    // Feedback,
    Journal,
    Visitor,
    Footer
  },
  props: {
    module: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    },
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const loginuser = computed(() => store.getters['user/loginuser']);
    const userInfo = computed(() => store.getters['user/userInfo']);
    const messageBoard = computed(() => store.getters['common/messageBoard']);
    const recentJournal = computed(() => store.getters['common/recentJournal']);
    const recentPhotos = computed(() => store.getters['common/recentPhotos']);

    function init() {
      // store.dispatch('common/MessageBoard', {

      // })
      // store.dispatch('common/RecentJournal', {

      // })
    }

    onMounted(() => {
      proxy.$scroll.init({
        win: {
          el: window,
          y: 0,
          b: 80
        },
        doc: {
          p: 'aside-box',
          el: 'aside_fixed'
        },
        type: "sideFixed"
      })
    })

    init()
    return {
      init,
      loginuser,
      userInfo,
      messageBoard,
      recentJournal,
      recentPhotos,
    }
  },
})
</script>
