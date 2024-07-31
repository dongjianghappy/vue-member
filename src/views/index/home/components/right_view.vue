<template>
<div id="aside-box" style="width: 280px">
  <div class="sidebar">
    <Calendar :render="render" />
    <RecommendUser />
    <HotTalk v-if="module.hot_topic" />
    <Journal />
    <Visitor v-if="loginuser.account && module.recent_visitors" />
    <Footer id="ranking" v-if="module.footer" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  onMounted,
  computed
} from 'vue'
import {
  useStore
} from 'vuex'
import HotTalk from '../../index/components/module/hotTalk.vue'
import Calendar from '../../index/components/module/calendar.vue'
import RecommendUser from '../../index/components/module/recommendUser.vue'
import Journal from '../../index/components/module/journal.vue'
import Visitor from '../../index/components/module/visitor.vue'
import Footer from '@/views/layout/components/footer/footer.vue'

const props: any = defineProps({
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
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const loginuser = computed(() => store.getters['user/loginuser']);

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
</script>
