<template>
  <div id="aside-box"
       style="width: 280px">
    <!-- <Ranking /> -->
    <RecommendUser v-if="module.recommended_users" />
    <HotTalk />
    <Footer id="ranking" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, getCurrentInstance, computed, useStore } from '@/utils'
import RecommendUser from '../../index/components/module/recommendUser.vue'
import HotTalk from '../../index/components/module/hotTalk.vue'
import Ranking from '../../index/components/module/ranking.vue'
import Footer from '@/views/layout/components/footer/footer.vue'

export default defineComponent({
  name: 'RightView',
  components: {
   RecommendUser,
   HotTalk,
   Ranking,
   Footer
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore()
    const module = computed(() => store.getters['user/config_talk'].personal_center || {});

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

    return {
      module
    }
  },
})
</script>
