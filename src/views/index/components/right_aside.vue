<template>
<div>
  <UserInfo :userInfo="userInfo" />
  <Sign v-if="module.sign" />
  <Navigation />
  <RecommendUser v-if="module.recommended_users" />
  <HotTalk v-if="module.hot_topic" />
  <Visitor v-if="module.recent_visitors" />
  <Ranking :ref="ranking" v-if="module.ranking" :style="{width: '280px'}" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useStore,
  onMounted,
  computed
} from '@/utils'
import UserInfo from './module/userInfo.vue'
import Sign from './module/sign.vue'
import Navigation from './module/navigation.vue'
import RecommendUser from './module/recommendUser.vue'
import HotTalk from './module/hotTalk.vue'
import Visitor from './module/visitor.vue'
import Ranking from './module/ranking.vue'

export default defineComponent({
  name: 'RightView',
  components: {
    UserInfo,
    Sign,
    Navigation,
    RecommendUser,
    HotTalk,
    Visitor,
    Ranking
  },
  props: {
    module: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup() {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const userInfo = computed(() => store.getters['user/loginuser']);

    onMounted(() => {
      // const Doc: any = document.getElementsByClassName("aside_fixed")[0];
      // Doc.offsetTop
      
      proxy.$scroll.init({
        win: {
          el: window,
          y: 1156,
          b: 80
        },
        doc: {
          el: 'aside_fixed'
        },
        type: "fixed"
      })
    })

    return {
      userInfo
    }    
  },
})
</script>
