<template>
<div>
  <UserInfo :userInfo="userInfo" />
  <Sign v-if="module.sign" />
  <!-- <Navigation /> -->
  <RecommendUser v-if="module.recommended_users" />
  <HotTalk v-if="module.hot_topic" />
  <Visitor :userInfo="userInfo" v-if="module.recent_visitors" />
  <Ranking id="ranking" v-if="module.ranking" :style="{width: '280px'}" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted
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
    },
    userInfo: {
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

    onMounted(() => {
      proxy.$scroll.init({
        win: {
          el: window,
          y: 1590,
          id: 'ranking',
          b: 80
        },
        doc: {
          el: 'aside_fixed'
        },
        type: "fixed"
      })
    })
  }
})
</script>
