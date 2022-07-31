<template>
<div class="home">
  <TalkTabs ref="talktabs" :data="tabs" :render="init" :loading="loading" :mod="{tab: 'type', value: query.type}" :query="getParam()" />
  <TalkItem :dataList="data.talk" :loading="loading" v-if="query.type === 'talk'" />
  <Notes :dataList="data.notes" :loading="loading" v-else-if="query.type === 'notes'" />
  <Website :dataList="data.website" :loading="loading" v-else-if="query.type === 'website'" />
  <User :dataList="data.user" :loading="loading" v-else-if="query.type === 'user'" />
  <Source :dataList="data.source" :loading="loading" v-else />
  <v-loding v-if="!loading" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  ref,
  watch,
  useStore,
  useRoute,
  getUid,
  getParam
} from '@/utils'
import TalkTabs from '../../index/components/module/TalkTabs.vue'
import TalkItem from '../components/talkItem.vue'
import User from '../components/user.vue'
import Source from '../components/source.vue'
import Website from '../components/website.vue'
import Notes from '../components/notes.vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    TalkTabs,
    TalkItem,
    User,
    Source,
    Notes,
    Website
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const module = computed(() => store.getters['user/config_talk'].personal_center);

    const data: any = ref({
      talk: [],
      source: [],
      website: [],
      notes: [],
      user: []
    })

    const tabs: any = computed(() => store.getters['user/config_talk'].search_tabs);
    const downloadList: any = ref([]);
    const notesList: any = computed(() => store.getters['talk/notesList']);
    const talktabs: any = ref(null)
    const loading: any = ref(false)
    const query: any = ref(route.query)
    const keyword: any = ref("")

    // 监听弹窗变量
    watch(route, (newValues, prevValues) => {
      loading.value = false
      init({
        type: route.query.type
      })

      // 如果搜索词改变，则初始化所有列表
      if (route.query.q !== keyword.value) {
        keyword.value = route.query.q
        data.value = {
          talk: [],
          source: [],
          notes: [],
          user: []
        }
      }
      query.value = route.query
    }, {
      deep: true
    })

    function init(param: any) {
      loading.value = false
      store.dispatch('common/Fetch', {
        api: "search",
        data: {
          page: 1,
          key: route.query.q,
          ...param
        }
      }).then(res => {
        loading.value = true
        data.value[param.type] = res.result === true ? [] : res.result
      })
    }

    onMounted(() => {
      init({
        type: route.query.type
      })

    })
    return {
      module,
      query,
      talktabs,
      tabs,
      init,
      loading,
      data,
      notesList,
      getParam
    }
  },
})
</script>
