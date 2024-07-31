<template>
<div class="container w1100 clearfix">
  <div class="w180 left">
    <v-aside title="用户组" v-if="loginuser.currentUser">
      <template v-slot:button>
        <v-group action='add' :data="data" :group="userGroup" :coding="coding.group" :render="Grouping" />
      </template>
      <template v-slot:aside>
        <ul>
          <li v-for="(item, index) in userGroup" :key="index" @click="handleclick(`/concern?mod=myconcern&ground=${item.id}`)" class="aside">
            <i class="iconfont icon-dot font20"></i> {{item.name}}
          </li>
        </ul>
      </template>
    </v-aside>
    <v-aside :data="module.home_nav" title="Ta的主页" v-else />
  </div>
  <div class="w280 right">
    <RightView :render="init" />
  </div>
  <div class="main-center right">
    <TalkTabs :data="[{name: '关注', value: 'myconcern'}, {name: '粉丝', value: 'concernmy'}]" :render="init" :query="{tab: 'mod', value: route.query.mod || ''}" />
    <div class="module-wrap">
      <div class="module-content p15" style="min-height: 570px;">
        <Card :data="dataList.list" :mod="mod" :group="userGroup" :render="Grouping" v-if="dataList.list && dataList.list.length> 0 " />
        <v-nodata v-else trip="对方未开启关注和粉丝列表" />
        <div class="mt25 align_center" v-if="dataList.total > 20">
          <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" :simple="true" />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  computed,
  onMounted,
  ref,
  getUid,
  codings,
  useStore,
  useRouter,
  useRoute
} from '@/utils'
import Card from './components/card.vue'
import TalkTabs from '../index/components/module/TalkTabs.vue'
import RightView from '../module/right_aside.vue'

const {
  proxy
}: any = getCurrentInstance();
const coding: any = codings.user
const store = useStore();
const router = useRouter();
const route = useRoute();
const userGroup = ref([])
const loginuser = computed(() => store.getters['user/loginuser']);
const module = computed(() => store.getters['user/config_talk']);
const dataList: any = ref({})
module.value.concern.map((item: any) => {
  item.path = `/concern${item.value}`
  item.num = item.value.indexOf('myconcern') > -1 ? loginuser.value.myconcern : loginuser.value.concernmy
})

const currentAside = computed(() => {
  let arr = module.value.concern.filter((item: any) => item.path.indexOf(route.query.mod) > -1)
  if(route.query.mod == 'myconcern' && route.query.ground !== undefined){
    arr = userGroup.value.filter((item: any) => item.id === route.query.ground)
  }
  return arr[0] || {}
});

const mod = computed(() => route.query.mod);
const concern = computed(() => store.getters['common/concernList']);

function Grouping() {
  store.dispatch('common/Fetch', {
    api: "customGroup",
    data: {
      coding: coding.group,
    }
  }).then(res => {
    userGroup.value = res.result
    init()
  })
}

function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 20
  }

  Object.assign(params, param)

  store.dispatch('common/ConcernList', {
    uid: getUid(),
    ground: route.query.ground,
    type: mod.value,
    ...params
  }).then((res: any) => {
    dataList.value = res.result
  })
}

function handleclick(param: any) {
  router.push(proxy.const.setUrl({
    uid: loginuser.value.account,
    query: param
  }))

  setTimeout(() => {
    init()
  }, 100)
}

onMounted(() => {
  Grouping()
})
</script>
