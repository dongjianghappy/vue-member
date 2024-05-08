<template>
<div class="container w1100 clearfix" v-if="query.item !== 'graph'">
  <div class="w180 left">
    <v-aside :data="sidebar.groups" :title="sidebar.name">
      <template v-slot:button>
        <span class="absolute vertical-text" @click="handleRouter">内容管理</span>
        <v-group action='add' :data="data" :group="userGroup" :coding="coding.group" :render="init" />
      </template>
    </v-aside>
  </div>
  <div class="mb15 radius-4 right" style="width: 910px; min-height: 650px; background: var(--module-background)">
    <CateList :dataList="userGroup" v-if="query.item === 'category'" :data="{coding: coding}" />
    <Collect v-else-if="query.item === 'collect'" :channel="channel" :data="{coding: coding}" />
    <Praise v-else-if="query.item === 'praise'" :channel="channel" :data="{coding: coding}" />
    <Download v-else-if="query.item === 'download'" :channel="channel" />
    <template v-else>
      <Haosite :channel="channel" v-if="channel === 'haosite'" />
      <Article v-else :channel="channel" :data="{coding: coding}" :columns="columns" />
    </template>
  </div>
</div>
<Graph v-else :channel="channel" :action="query.action" :field="{album: false, color: false}" />
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  useRoute,
  codings,
  getChannel,
  ref,
  useStore,
  onMounted,
  getUid,
  useRouter
} from '@/utils'
import CateList from "./cate/index.vue"
import Article from "./article/index.vue"
import Collect from './collect/index.vue'
import Praise from './praise/index.vue'
import Download from './download/index.vue'
import Haosite from "./article/haosite/index.vue"
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
    Haosite,
    Graph
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const router = useRouter()
    let query: any = computed(() => route.query || "");
    const channel: any = getChannel()
    const coding: any = codings[channel]
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
        api: "customGroup",
        data: {
          coding: coding.group,
          uid: getUid()
        }
      }).then(res => {
        userGroup.value = res.result

      })
    }

    function handleRouter(){
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: `/content?mod=channel`
      }))
    }

    onMounted(init)

    return {
      channel,
      coding,
      query,
      sidebar,
      columns,
      userGroup,
      init,
      handleRouter
    }
  }
})
</script>

<style lang="less" scoped>
.vertical-text {
  background: var(--module-background);
  left: -55px;
  top: 70px;
  border-radius: 4px;
  padding: 15px;
  writing-mode: vertical-lr;
  /* 文字从上到下，从右到左 */
  cursor: pointer;
  letter-spacing: 8px;
  // transform: rotate(180deg); /* 可选，使文字从上到下，从左到右 */
}
</style>
