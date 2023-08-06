<template>
<div class="container w1100 clearfix">
  <div class="w180 left">
    <v-aside :data="sidebar.groups" title="我的书签">
      <template v-slot:button>
        <v-group action='add' :data="data" :group="userGroup" :coding="coding.cate" :render="init" />
      </template>
      <template v-slot:aside>
        <ul>
          <li v-for="(item, index) in userGroup" :key="index" @click="handleclick(`/bookmark?item=list&id=${item.id}`)" class="aside">
            <i class="iconfont icon-dot font20"></i> {{item.name}}
          </li>
        </ul>
      </template>
    </v-aside>
  </div>
  <div class="m0 right" style="width: 910px">
    <Action v-if="query.item === 'details'" :action="query.action" />
    <ArticleView v-else-if="query.item === 'view'" />
    <List ref="list" :data="{coding: coding.art}" :group="userGroup" :query="query" v-else />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  useStore,
  useRouter,
  useRoute,
  ref,
  getUid,
  codings
} from '@/utils'
import List from "./article_list.vue"
import Action from "./article_action.vue"
import ArticleView from "./article_detail.vue"
import {
  journal
} from '@/assets/const'

export default defineComponent({
  name: 'HomeView',
  components: {
    List,
    Action,
    ArticleView
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const coding: any = codings.talk.favorites
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    let query: any = computed(() => route.query || "");
    const currentData = ref({})
    const userGroup = ref([])
    const list: any = ref(null);

    const sidebar = computed(() => {
      const sidebar = store.getters['user/config'].bookmark || []
      sidebar.groups && sidebar.groups.map((item: any) => {
        item.path = `/bookmark?item=${item.value}`
      })
      return sidebar
    });

    function init() {
      store.dispatch('common/Fetch', {
        api: "customGroup",
        data: {
          coding: coding.cate,
          uid: getUid()
        }
      }).then(res => {

        userGroup.value = res.result

      })
    }

    function handleclick(param: any) {
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: param
      }))

      setTimeout(() => {
        list.value.init()
      }, 100)

    }

    onMounted(() => {
      init()
    })

    return {
      coding,
      handleclick,
      query,
      sidebar,
      list,
      currentData,
      userGroup,
      init
    }
  }
})
</script>
