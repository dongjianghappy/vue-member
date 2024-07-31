<template>
<div class="home">
  <TalkTabs :getData="init" :style="{flex: 1}" :mod="{tab: 'mod', value: 'comment'}" :data="[{name: `评论我的`, value: ''}, {name: '我评论的', value: 'comment'}]" :query="{tab: 'item', value: route.query.item}" :render="init" />
  <div class="con-list" v-for="(item, index) in dataList" :key="index">
    <div class="con-wrap">
      <div class="photos">
        <v-photos :sourceData="item" />
      </div>
      <div class="user_info pb5">
        <span class="username">{{item.nickname}}</span>
        <span class="right span-icon">
          <v-popover content="<i class='iconfont icon-down font18 icon-btn'></i>" arrow="tb" offset="right" :move="-50" :keys="`popover-${item.id}`">
            <div style="width: 80px">
              <ul class="font14">
                <li @click="handleDelete(item.id)">删除</li>
              </ul>
            </div>
          </v-popover>
        </span>      
      </div>
      <div class="user_from pb5">{{item.times}}</div>
      <div class="user_text font14">
        {{item.content}}
        <p v-if="item.image.length>0">
          <Images :data="item" kind="comment" />
        </p>
        <div class="radius-4 p10" style="background: var(--card-background); margin-top:5px; font-size: 12px;">
          评论
          <v-photos :sourceData="{...item, uid: item.to_uid, nickname: item.to_nickname}" :nickname="true" />
          的微博：<span v-html="item.summary"></span>
          <span @click="handleClick(item)">
            <i class="iconfont icon-link font14" />查看
          </span>
        </div>
      </div>
    </div>
  </div>
  <v-loding v-if="!loading" />
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  computed,
  ref,
  onMounted,
  useStore,
  useRouter,
  useRoute,
  codings
} from '@/utils'
import TalkTabs from '../components/module/TalkTabs.vue'
import Images from '@/views/content/expression/detail.vue'

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter()
const route = useRoute()
const talkCollect = computed(() => store.getters['talk/talkCollect']);
const dataList: any = ref({})
const loading: any = ref(false)
const coding = codings.talk.comment

function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 30
  }

  Object.assign(params, param)
  loading.value = false
  store.dispatch('talk/TalkComment', {
    data: {
      ...params
    }
  }).then((res) => {
    loading.value = true
    dataList.value = res.result
  })
}

function handleDelete(id: any) {
  store.dispatch('common/Fetch', {
    api: 'delete',
    data: {
      id,
      coding: coding
    }
  }).then(res => {
    proxy.$hlj.message({
      type: 'info',
      msg: res.returnMessage
    })
     init()
  })
}

function handleClick(param: any){
  router.push(`/${param.to_uid}/${param.short_url_id}`)
}

function show(name: any) {
  router.push(`/activity?item=${name}`)
}

onMounted(init)
</script>
