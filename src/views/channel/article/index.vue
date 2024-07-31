<template>
<ArticleDetail v-if="query.item === 'details'" :channel="channel" :action="query.action" :field="{album: false, color: false}" />
<ArticleView v-else-if="query.item === 'view'" :channel="channel" :action="query.action" :field="{album: false, color: false}" />
<AricleIndex v-else :channel="channel" :data="data" />
</template>

<script setup lang="ts">
import {
  defineProps,
  computed,
  useRoute,
} from '@/utils'
import AricleIndex from "./aricle_index.vue"
import ArticleDetail from "./article_action.vue"
import ArticleView from "./article_detail.vue"

const props: any = defineProps({
  channel: {
    type: String,
    default: ""
  },
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const route = useRoute()
let query: any = computed(() => route.query || "")
</script>
