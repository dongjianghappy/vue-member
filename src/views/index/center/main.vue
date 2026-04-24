<template>
    <div class="home">
        <TalkTabs ref="talktabs" :data="tabs" :render="init" :query="{tab: 'mod', value: query.mod || ''}" v-if="query.mod !== 'friend' && query.mod !== 'concern'" />
        <div class="p10 align_center" style="color: #808080" v-if="query.mod === 'talk' && channel.checked_num" @click="handelClick">您有{{channel.checked_num}}条微博内容待审核。</div>
        <v-slidertext :data="{coding: coding.user.schedule.cate}" @onClick="handleSchedule" :dataList="cateList" v-if="query.mod === 'schedule'" />
        <TalkItem :loading="loading" :sourceData="query.mod ? channel[query.mod] : channel.all" :deleteTalk="deleteTalk" :render="init" />
        <div class="con-list ptb15 align_center" @click="handelLoad" v-if="loading && (channel.page < channel.pages)">点击加载</div>
        <v-loding v-if="!loading" />
    </div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineExpose,
  computed,
  onMounted,
  ref,
  watch,
  useStore,
  useRoute,
  getUid,
  codings,
  useRouter
} from '@/utils'
import TalkTabs from '../components/module/TalkTabs.vue'
import TalkItem from '../components/TalkItem/index.vue'
import ScheduleInfo from '../components/module/scheduleInfo.vue'

defineExpose({
  init
})

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter()
const route = useRoute();
const coding: any = codings
const module = computed(() => store.getters['user/config_talk'].personal_center);
const tabs: any = computed(() => store.getters['user/config_talk'].talk_tabs);
const talk: any = computed(() => store.getters['talk/talkList']);
const channel: any = computed(() => store.getters['talk/channel']);
const talktabs: any = ref(null)
const loading: any = ref(false)
const query: any = ref(route.query)
const cateList: any = ref([])

// 监听弹窗变量
watch(route, (newValues, prevValues) => {
  if (route.path === "/") {
    loading.value = false
    init({
      page: 1,
      key: route.query.q
    })
  }
  query.value = route.query
}, {
  deep: true
})

function init(param: any) {
  loading.value = false
  let module_arr = ['talk', 'source', 'article', 'picture', 'tech', 'funny', 'notes', 'questions', 'website', "words"]
  let other_arr = ['download', 'blog', 'hanyu', 'schedule']
  let dispatch = 'Talk'
  let obj: any = {}

  const params: any = {
    page: 1,
    pagesize: 10
  }

  Object.assign(params, param)

  if (module_arr.indexOf(param.type) > -1) {
    dispatch = 'Module'
    obj.state = param.type
    params.coding = coding[param.type].art
  } else if (other_arr.indexOf(param.type) > -1) {
    if (param.type === 'hanyu') {
      dispatch = 'commonSenseQuotes'
    } else {
      obj.state = param.type
      dispatch = param.type
    }
  }

  if (param.type === undefined || param.type === "") {
    obj.state = 'all'
    dispatch = 'comprehensive'
  }

  if (query.value.mod == 'concern') {
    params.coding = coding['talk'].art
    params.list_id = '2'
    obj.state = 'concern'
  } else if (query.value.mod == 'friend') {
    params.coding = coding['talk'].art
    params.list_id = '3'
    obj.state = 'friend'
  }

  store.dispatch(`talk/comprehensive`, {
    ...obj,
    data: {
      uid: getUid(),
      ...params
    }
  }).then((res) => {
    loading.value = true
  })

  // if(param.type !== "schedule" || (param.type === "schedule" &&  param.schedule_id !== undefined)){
  //   return
  // }


}

function getSchedule(){
    store.dispatch('common/Fetch', {
    api: "scheduleList"
  }).then(res => {
    let cateArray = [{
      id: '-1',
      name: "打卡",
      style: "background: var(--color-primary) !important; color: #fff !important;"
    },
    {
      name: "全部"
    }]
    cateList.value = [...cateArray, ...res.result.system]
  })
}



function deleteTalk(id: any) {
  store.dispatch('common/Fetch', {
    api: 'deleteTalk',
    data: {
      id
    }
  }).then(res => {
    let index = talk.value.list.findIndex((item: any) => item.id === id)
    talk.value.list.splice(index, 1)
  })
}

function handelClick(){
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/talk?mod=checked`
  }))
}

function handelLoad(){
  init({
    type: query.value.mod,
    page: parseInt(channel.value.page) + 1,
    key: route.query.q,
  })
}

function handleSchedule(param: any){
  if(param.id === "-1"){
    router.push(proxy.const.setUrl({
      uid: getUid(),
      query: "/schedule?mod=myschedule"
    }))
  }else{
    init({
      type: "schedule",
      schedule_id: param.id,
      page: 1
    })
  }
}

onMounted(() => {
  // 在没有置顶页面时，初始化页面进入到默认tabs项中
  if (!query.value.mod) {
    const defaultTab = tabs.value ? tabs.value.filter((item: any) => item.default === '1') : []
    if (defaultTab.length > 0) {
      talktabs.value.handelClick(defaultTab[0].value)
    }
  }
  getSchedule()
})
</script>

