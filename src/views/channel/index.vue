<template>
<div class="container w1100 clearfix" v-if="query.item !== 'graph'">
  <div class="w180 left">
    <v-aside :data="groups" title="资讯管理" />
  </div>
  <div class="m0  right" style="width: 910px; min-height: 650px; background: #fff">
    <CateList v-if="query.item === 'category'" :data="{codding: codding}" />
    <Collect v-else-if="query.item === 'collect'" :channel="channel" :data="{coding: codding}" />
    <Praise v-else-if="query.item === 'praise'" :channel="channel" :data="{coding: codding}" />
    <Download v-else-if="query.item === 'download'" :channel="channel" />
    <Article v-else :channel="channel" :data="{codding: codding}" :columns="columns" />
  </div>
</div>
<Graph v-else :channel="channel" :action="query.action" :field="{album: false, color: false}" />
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useRoute,
  codings,
  getChannel,
  useStore,
} from '@/utils'
import CateList from "./cate/index.vue"
import Article from "./article/index.vue"
import Collect from './collect/index.vue'
import Praise from './praise/index.vue'
import Download from './download/index.vue'
import Graph from "../graph/index.vue"
import {noColumns} from '@/assets/const'

export default defineComponent({
  name: 'HomeView',
  components: {
    CateList,
    Article,
    Collect,
    Praise,
    Download,
    Graph
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    let query: any = computed(() => route.query || "");
    const channel: any = getChannel()
    const codding: any = codings[channel]
    const columns: any = noColumns[channel]
    const groups = computed(() => {
      const sidebar = store.getters['user/config'][channel] && store.getters['user/config'][channel].groups
      sidebar && sidebar.map((item: any) => {
        item.path = `/${channel}?item=${item.value}`
      })
      return sidebar
    });

    return {
      channel,
      codding,
      query,
      groups,
      columns
    }
  }
})
</script>
