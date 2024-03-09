<template>
<div>
  <div class="container w1100">
    <UserInfoHead />
  </div>

  <div class="container w1100 clearfix">
    <div class="w180 left">
      <v-aside :data="module.home_nav" :isFixed="false">
        <template v-slot:button>
        </template>
      </v-aside>
    </div>
    <div class="m0 right" style="width: 910px">
      <Action v-if="query.item === 'details'" :action="query.action" />
      <ArticleView v-else-if="query.item === 'view'" />
      <List ref="list" :group="userGroup" :query="query" :data="{coding}" :render="init" v-else />
    </div>
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
import UserInfoHead from '../../home/components/UserInfoHead.vue'
import List from "./article_list.vue"
import Action from "./article_action.vue"
import ArticleView from "./article_detail.vue"
import {
  journal
} from '@/assets/const'

export default defineComponent({
  name: 'HomeView',
  components: {
    UserInfoHead,
    List,
    Action,
    ArticleView
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const coding: any = codings.talk.journal
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    let query: any = computed(() => route.query || "");
    const currentData = ref({})
    const userGroup = ref([])
    const list: any = ref(null);
    const sidebar = computed(() => {
      const sidebar = store.getters['user/config'].journal || []
      sidebar.groups && sidebar.groups.map((item: any) => {
        item.path = `/journal?item=${item.value}`
      })
      return sidebar
    });
    const module = computed(() => store.getters['user/config_talk']);

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
      list,
      currentData,
      userGroup,
      init,
      sidebar,
      module
    }
  }
})
</script>
