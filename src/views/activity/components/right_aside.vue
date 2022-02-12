<template>
  <div>
    <Ranking />
    <HotTalk />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@/utils'
import HotTalk from './module/hotTalk.vue'
import Ranking from './module/ranking.vue'

export default defineComponent({
  name: 'RightView',
  components: {
   HotTalk,
   Ranking
  }
})
</script>
