<template>
    <div class="container w1100 relative clearfix">
        <!-- 侧边菜单 -->
        <div class="left-sidebar left">
            <v-aside title="亲密好友">
                <template v-slot:button>
                    <Detail :data="{coding: coding.list}" :render="init" />
                </template>
                <template v-slot:aside>
                    <div style="height: 400px; overflow-y: scroll;">
                        <ul>
                            <li v-for="(item, index) in friendList" :key="index" @click="handleclick(item)" class="aside" style="height: 60px;">
                                <img :src="item.photo" onerror="this.src='/images/head_normal_100.png'" style="width: 50px; height: 50px; border-radius: 50px;"> {{item.name}}
                            </li>
                        </ul>
                    </div>
                </template>
            </v-aside>
        </div>
        <!-- 主内容 -->
        <div class="main-center left" style="width: 620px;">
            <Info :data="{...currentFriend, coding: coding.list}" :render="init" v-if="route.query.id" />
            <BaiscInfo v-else />
            <TalkTabs :mod="mod" :data="[{name: '全部记忆', value: ''}, {name: '今天记忆', value: 'today'}]" :render="initContent" :query="{tab: 'item', value: route.query.item}">
                <template v-slot:extra>
                    <span class="absolute" style="top: 12px; right: 15px">
                      <v-space>
                      <span @click="handleAll" v-if="route.query.id">全部好友</span>
                        <Detail2 :data="{...currentFriend, coding: coding.content}" :render="initContent" />
                        </v-space>
                    </span>
                </template>
            </TalkTabs>
            <ItemList :sourceData="dataList || []" :data="{coding}" :render="initContent" @chooseUser="handleclick " />
            <div class="con-list ptb15 align_center" @click="handelLoad" v-if="loading && (result.page < result.pages)">点击加载</div>
            <v-loding v-if="!loading" />
        </div>
        <!-- 右侧 -->
        <div class="w280 right">
            <RightView :module="module.personal_center" :userInfo="userInfo" :render="init" />
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
  useRoute,
  
} from '@/utils'
import Detail from './components/detail.vue'
import Detail2 from './components/detail2.vue'
import Detail3 from './components/detail3.vue'
import BaiscInfo from './components/baiscInfo.vue'
import Info from './components/info.vue'

import ItemList from './components/item.vue'
import TalkTabs from '../index/components/module/TalkTabs.vue'

import RightView from '../index/components/right_aside.vue'


const {
  proxy
}: any = getCurrentInstance();
const coding: any = codings.user.close_friend
const store = useStore();
const router = useRouter();
const route = useRoute();
const mod: any = ref({})
const loginuser = computed(() => store.getters['user/loginuser']);
const module = computed(() => store.getters['user/config_talk']);
const friendList: any = ref({})
const result: any = ref({})
const dataList: any = ref([])
const currentFriend: any = ref({})
const loading: any = ref(false)

function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 20
  }

  Object.assign(params, param)

  store.dispatch('common/Fetch', {
    api: 'closeFriend',
    data: {
      uid: getUid()
    }
  }).then((res: any) => {
    friendList.value = res.result || []
     let arr = friendList.value.filter((item:any) => item.id === route.query.id)
     if(arr.length > 0){
      currentFriend.value = arr[0];
     }
  })
}

function initContent(param: any = {}) {
  loading.value = false
  const params: any = {
    page: 1,
    pagesize: 10
  }

  Object.assign(params, param)


  if(params.page === 1){
    dataList.value = []
  }

  if(route.query.id){
    params.id = route.query.id
  }
  
  store.dispatch('common/Fetch', {
    api: 'closeFriendContent',
    data: {
      uid: getUid(),
      ...params
    }
  }).then((res: any) => {
    loading.value = true
    result.value = res.result
    
    dataList.value.push(...(res.result.list || []))
  })
}

function handleAll(){
    router.push(proxy.const.setUrl({
      uid: loginuser.value.account,
      query: `/close_friend`
    }))

    mod.value = {}
    document.documentElement.scrollTop = 0
    setTimeout(() => {
      initContent({
        page: 1
      })
    }, 100)
}

function handleclick(param: any) {
  router.push(proxy.const.setUrl({
    uid: loginuser.value.account,
    query: `/close_friend?id=${param.id}`
  }))
  mod.value = {tab: 'id', value: param.id}
  document.documentElement.scrollTop = 0
  setTimeout(() => {
     let arr = friendList.value.filter((item:any) => item.id === route.query.id)
     if(arr.length > 0){
      currentFriend.value = arr[0];
     }
    initContent({
      page: 1
    })
  }, 100)
}

function handelLoad(){
  initContent({
    page: parseInt(result.value.page) + 1
  })
}

onMounted(() => {
  init()
  initContent({
    page: 1
  })
})
</script>
