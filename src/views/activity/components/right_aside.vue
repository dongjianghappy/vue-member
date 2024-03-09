<template>
  <div id="aside-box">
    <!-- <Ranking /> -->
    <HotTalk />
    <Footer id="ranking" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, getCurrentInstance } from '@/utils'
import HotTalk from '../../index/components/module/hotTalk.vue'
import Ranking from '../../index/components/module/ranking.vue'
import Footer from '@/views/layout/components/footer/footer.vue'

export default defineComponent({
  name: 'RightView',
  components: {
   HotTalk,
   Ranking,
   Footer
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
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

    }
  },
})
</script>
