<template>
<div class="home">
  <TalkTabs ref="talktabs" :data="tabs" :render="init" name="search" :query="{tab: 'type', value: query.type}" :param="{tab: 'q', value: query.q}" />
  <SearchUser :type="query.type" v-if="!query.type" />
  <TalkItem :sourceData="search.talk" v-if="query.type === 'talk'" />
  <TalkItem :sourceData="search.article" v-else-if="query.type === 'article'" />
  <TalkItem :sourceData="search.tech" v-else-if="query.type === 'tech'" />
  <TalkItem :sourceData="search.picture" v-else-if="query.type === 'picture'" />
  <TalkItem :sourceData="search.notes" v-else-if="query.type === 'notes'" />
  <TalkItem :sourceData="search.website" v-else-if="query.type === 'website'" />
  <SearchUser :type="query.type" v-else-if="query.type === 'user'" />
  <TalkItem :sourceData="search.source" v-else-if="query.type === 'source'" />
  <TalkItem :sourceData="search.all" v-else />
  <v-loding v-if="!loading" />
</div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  ref,
  watch,
  useStore,
  useRoute,
  getUid,
  getParam,
  codings
} from '@/utils'
import TalkTabs from '../../index/components/module/TalkTabs.vue'
import TalkItem from '../../index/components/TalkItem/index.vue'
import SearchUser from '../components/search_userList.vue'
import User from '../components/user.vue'
import Source from '../components/source.vue'
import Website from '../components/website.vue'
import Notes from '../components/notes.vue'
const store = useStore();
const route = useRoute();
const module = computed(() => store.getters['user/config_talk'].personal_center);
const coding: any = codings
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
const search: any = computed(() => store.getters['talk/search']);
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
  if (!route.query.q) {
    return
  }
  let obj: any = {}

  const params: any = {
    page: 1,
    pagesize: 10
  }

  Object.assign(params, param)
  obj.state = 'all'
  loading.value = false
  let module_arr = ['talk', 'source', 'picture', 'tech', 'funny', 'notes', 'website', "words"]

  if (module_arr.indexOf(param.type) > -1) {
    obj.state = param.type
    params.coding = coding[param.type].art
  }

  store.dispatch(`talk/search`, {
    ...obj,
    data: {
      uid: getUid(),
      word: route.query.q,
      ...params
    }
  }).then((res) => {
    loading.value = true
  })

  // store.dispatch('talk/search', {
  //   data: {
  //     page: 1,
  //     word: route.query.q,
  //     ...param
  //   }
  // }).then(res => {
  //   loading.value = true
  //   data.value[param.type] = res.result === true ? [] : res.result
  // })
}

onMounted(() => {
  init({
    type: route.query.type
  })

})
</script>
