<template>
  <div>
    <Ranking />
    <HotTalk />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@/utils'
import HotTalk from '../../index/components/module/hotTalk.vue'
import Ranking from '../../index/components/module/ranking.vue'

export default defineComponent({
  name: 'RightView',
  components: {
   HotTalk,
   Ranking
  }
})
</script>
