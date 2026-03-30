<template>
<div class="home">
  <TalkSend v-if="loginuser.account" />
  <div class="module-wrap mb10" v-else>
    <div class="module-content send_info p0" style="overflow: inherit;">
      <v-scrolltext :dataList="announcement" />
    </div>
  </div>
  <div class="mb10" v-if="module && module.slideshow && Object.keys(slideshow).length > 0">
    <v-slideshow :data="slideshow" />
  </div>
  
  <TalkTabs ref="talktabs" field="category" :data="yaerArray" :render="init" :query="{tab: 'mod', value: route.query.mod || ''}" />
  <TalkItem :sourceData="channel.talk" :deleteTalk="deleteTalk" :render="init" />
  <!-- <v-loding v-if="!loading" /> -->
  <div class="con-list" v-if="channel.talk.length === 0">
    <div class="con-wrap" style=" padding-top:100px; height:350px; text-align: center;">
      <p v-if="route.query.mod">暂时还没有{{route.query.mod}}年的记忆呢，先看看其他年份吧~</p>
      <p v-else>暂时还没有记忆~</p>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
  watch,
  useStore,
  useRoute,
  getUid,
  codings
} from '@/utils'
import TalkSend from '../../views/index/components/module/talk_send.vue'
import TalkTabs from '../index/components/module/TalkTabs.vue'
import TalkItem from '../index/components/TalkItem/index.vue'

const store = useStore();
const route = useRoute();
const coding: any = codings
const loginuser = computed(() => store.getters['user/loginuser']);
const module = computed(() => store.getters['user/config_talk'].personal_center);
const tabs: any = computed(() => store.getters['user/config_talk'].talk_tabs);
const talk: any = computed(() => store.getters['talk/talkList']);
const channel: any = computed(() => store.getters['talk/channel']);
const talktabs: any = ref(null)
const loading: any = ref(false)
const query: any = ref(route.query)
const currentYear: any = new Date().getFullYear()
const yaerArray: any = ref([
  {name: '全部', value: ''}
])

console.log("vvvvvvvvv");

for(let i = 1; i < 7; i ++){
  yaerArray.value.push({
    name: currentYear - i,
    value: currentYear - i
  })
}

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

function init(param: any = {}) {
  loading.value = false
  
  let date: any = new Date()

  const params: any = {
    page: 1,
    pagesize: 10,
    month: date.getMonth()+1,
    day: date.getDate()
  }

  if(param.category){
    params.year = param.category
  }
  
  store.dispatch(`talk/comprehensive`, {
    state: 'talk',
    data: {
      uid: getUid(),
      coding: coding['talk'].art,
      ...params
    }
  }).then((res) => {
    loading.value = true
  })
}

function loadData() {
  if (loading.value === true) {
    loading.value = false
    setTimeout(() => {
      init({
        type: query.value.mod,
        page: parseInt(channel.value.page) + 1,
        key: route.query.q,
      })
    }, 1000)
  }
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

onMounted(() => {
  window.addEventListener("scroll", function (e: any): void {
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    if (document.documentElement.scrollTop > scrollHeight - window.innerHeight && channel.value.page < channel.value.pages) {
      loadData()
    }
  })

  init()
})
</script>
