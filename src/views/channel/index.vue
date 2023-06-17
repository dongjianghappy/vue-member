<template>
<div class="container w1100 clearfix" v-if="query.item !== 'graph'">
  <div class="w180 left">
    <v-aside :data="sidebar.groups" :title="sidebar.name">
      <template v-slot:button>
        <v-group action='add' :data="data" :group="userGroup" :coding="codding.group" :render="init" />
      </template>
    </v-aside>
  </div>
  <div class="mb15 radius-4 right" style="width: 910px; min-height: 650px; background: #fff">
    <CateList :dataList="userGroup" v-if="query.item === 'category'" :data="{codding: codding}" />
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
  ref,
  useStore,
  onMounted,
} from '@/utils'
import CateList from "./cate/index.vue"
import Article from "./article/index.vue"
import Collect from './collect/index.vue'
import Praise from './praise/index.vue'
import Download from './download/index.vue'
import Graph from "../graph/index.vue"
import {
  noColumns
} from '@/assets/const'

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
    const userGroup = ref([])
    const sidebar = computed(() => {
      const sidebar = store.getters['user/config'][channel] && store.getters['user/config'][channel]
      sidebar.groups && sidebar.groups.map((item: any) => {
        item.path = `/${channel}?item=${item.value}`
      })
      return sidebar
    });

    function init() {
      store.dispatch('common/Fetch', {
        api: "AlbumList",
        data: {
          uid: ''
        }
      }).then(res => {

        userGroup.value = res.result

      })
    }

    onMounted(init)

    return {
      channel,
      codding,
      query,
      sidebar,
      columns,
      userGroup
    }
  }
})
</script>
