<template>
<div>
  <UserInfo />
  <Sign />
  <RecommendUser />
  <HotTalk />
  <Visitor />
  <Ranking :ref="ranking" />
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
import RecommendUser from './module/recommendUser.vue'
import HotTalk from './module/hotTalk.vue'
import Visitor from './module/visitor.vue'
import Ranking from '../../..//views/activity/components/module/ranking.vue'

export default defineComponent({
  name: 'RightView',
  components: {
    UserInfo,
    Sign,
    RecommendUser,
    HotTalk,
    Visitor,
    Ranking
  },
  setup() {
    const {
      proxy
    }: any = getCurrentInstance();

    function init() {
      proxy.$scroll.init({
        win: {
          el: window,
          y: 1590,
          b: 80
        },
        doc: {
          el: 'aside_fixed'
        },
        type: "fixed"
      })
    }

    onMounted(init)
    return {}
  },
})
</script>
