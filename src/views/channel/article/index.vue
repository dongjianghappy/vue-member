<template>
<ArticleDetail v-if="query.item === 'details'" :channel="channel" :action="query.action" :field="{album: false, color: false}" />
<ArticleView v-else-if="query.item === 'view'" :channel="channel" :action="query.action" :field="{album: false, color: false}" />
<AricleIndex v-else :channel="channel" :data="data" />
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  useRoute,
} from '@/utils'
import AricleIndex from "./aricle_index.vue"
import ArticleDetail from "./article_action.vue"
import ArticleView from "./article_detail.vue"

export default defineComponent({
  name: 'HomeView',
  components: {
    AricleIndex,
    ArticleDetail,
    ArticleView
  },
  props: {
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
  },
  setup(props, context) {
    const route = useRoute()
    let query: any = computed(() => route.query || "")

    return {
      query
    }
  }
})
</script>
