<template>
<div>
  <div class="sidebar">
    <HotTalk v-if="module.hot_topic" />
    <Visitor v-if="module.recent_visitors" />
    <Ranking :style="{width: '300px'}" v-if="module.ranking" />
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
import HotTalk from '../../index/components/module/hotTalk.vue'
import Ranking from '../../index/components/module/ranking.vue'
import Visitor from '../../index/components/module/visitor.vue'
export default defineComponent({
  name: 'AsideView',
  components: {
    HotTalk,
    Ranking,
    Visitor
  },
  props: {
    module: {
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
    const store = useStore();
    const userInfo = computed(() => store.getters['user/userInfo']);
    const messageBoard = computed(() => store.getters['common/messageBoard']);
    const recentJournal = computed(() => store.getters['common/recentJournal']);
    const recentPhotos = computed(() => store.getters['common/recentPhotos']);
    const currentUser = computed(() => store.getters['user/currentUser']);

    function init() {
      store.dispatch('common/MessageBoard', {

      })
      // store.dispatch('common/RecentJournal', {

      // })
    }

    onMounted(() => {
      proxy.$scroll.init({
        win: {
          el: window,
          y: 535,
          b: 80
        },
        doc: {
          el: 'aside_fixed'
        },
        type: "fixed"
      })
    })

    init()
    return {
      init,
      userInfo,
      currentUser,
      messageBoard,
      recentJournal,
      recentPhotos,
    }
  },
})
</script>
