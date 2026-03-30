<template>
    <div class="container w1100 clearfix">
        <div class="w180 left">
            <v-aside title="亲密好友">
                <!--  v-if="loginuser.currentUser" -->
                <template v-slot:button>
                    <Detail :data="{coding: coding.list}" :render="init" />
                </template>
                <template v-slot:aside>
                    <ul>
                        <li v-for="(item, index) in friendList" :key="index" @click="handleclick(`/close_friend?id=${item.id}`)" class="aside">
                            <i class="iconfont icon-dot font20"></i> {{item.name}}
                        </li>
                    </ul>
                </template>
            </v-aside>
        </div>
        <div class="w280 right">
            <RightView :render="init" />
        </div>
        <div class="main-center right">
            <div class="module-wrap">
                <div class="module-head">
                    <span class="pointer" :class="{'opacity': tabIndex == 1}" @click="handleTabs(0)">全部记忆</span>
                    <span class="ml15 pointer" :class="{'opacity': tabIndex == 0}" @click="handleTabs(1)">好友记忆</span>
                    <span class="right">
                        <Detail2 :data="{...currentFriend, coding: coding.content}" :render="initContent" />
                    </span>
                </div>

                <div class="module-content plr15" style="min-height: 650px;">
                    <Info :data="{...currentFriend, coding: coding.list}" v-if="tabIndex === 1" :render="init" />

                    <div class="mb5 p15" style="background: var(--card-background);" v-for="(item, index) in dataList" :key="index">
                        <div class="flex item-thum-wrap" style=" align-items: center;">
                            <div style="width: 100px">
                                {{item.times}}
                            </div>
                            <div style="width: 120px">
                                {{item.name}}
                            </div>
                            <div style="flex: 1">
                                {{item.content}}
                            </div>
                            <div class="font14 align_center" style="width: 100px">
                                <List :data="{...item, coding}" :render="init" />
                            </div>
                            <div class="font14 align_right" style="width: 50px">
                                    <Detail2 action="edit" :data="{user: item.user, id: item.id,coding: coding.content}" :render="initContent" />
                            </div>
                        </div>

                        <div class="flex">
                            <div style="flex: 1">
                                <div class="left relative align_center" style="width: 60px;" v-for="(list, i) in item.user" :key="i" @click="handleclick(`/close_friend?id=${list.id}`)">
                                    <img :src="list.photo" onerror="this.src='/images/head_normal_100.png'" class="photos p5" style="width: 50px; height: 50px; border-radius: 50%;">
                                    <div class="font12 nowrap">{{`${list.name}`}}</div>
                                </div>

                            </div>
                        </div>
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
  useRoute,
  
} from '@/utils'
import Detail from './components/detail.vue'
import Detail2 from './components/detail2.vue'
import Detail3 from './components/detail3.vue'
import Info from './components/info.vue'
import List from './components/list.vue'

import Card from './components/card.vue'
import TalkTabs from '../index/components/module/TalkTabs.vue'
import RightView from '../module/right_aside.vue'


const {
  proxy
}: any = getCurrentInstance();
const coding: any = codings.user.close_friend
const store = useStore();
const router = useRouter();
const route = useRoute();
const userGroup = ref([])
const loginuser = computed(() => store.getters['user/loginuser']);
const module = computed(() => store.getters['user/config_talk']);
const friendList: any = ref({})
const dataList: any = ref({})
const tabIndex: any = ref(0)
const currentFriend: any = ref({})
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

function handleTabs(index: any) {
  tabIndex.value = index
  init()
  initContent()
}

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
  const params: any = {
    page: 1,
    pagesize: 20
  }

  Object.assign(params, param)

  if(tabIndex.value !==0 && route.query.id){
    params.id = route.query.id
  }

  store.dispatch('common/Fetch', {
    api: 'closeFriendContent',
    data: {
      uid: getUid(),
      ...params
    }
  }).then((res: any) => {
    dataList.value = res.result
  })
}



function handleclick(param: any) {
  router.push(proxy.const.setUrl({
    uid: loginuser.value.account,
    query: param
  }))

  tabIndex.value = 1

  setTimeout(() => {
     let arr = friendList.value.filter((item:any) => item.id === route.query.id)
     if(arr.length > 0){
      currentFriend.value = arr[0];
     }
    initContent()
  }, 100)
}

onMounted(() => {
  init()
  initContent()
})
</script>
