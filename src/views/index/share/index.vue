<template>
<div class="home">
  <TalkTabs :getData="init" :style="{flex: 1}" :mod="{tab: 'mod', value: 'share'}" :data="tabs" :query="{tab: 'item', value: route.query.item}" :render="init" />
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
      <div class="user_from pb5">
        {{item.times}}
      </div>
      <div class="user_text">
        <div class="mtb5 font12">
          下载了
          <v-photos :sourceData="{...item, uid: item.to_uid, nickname: item.to_nickname}" :nickname="true" />
          的微博内容：
          <span v-html="item.summary"></span>
          <span @click="handleClick(item)">
            <i class="iconfont icon-link font14" />查看
          </span>
        </div>

        <p v-if="item.content">
          <img :src="item.content" style="border-radius: 8px; width: 150px; height: auto; cursor: zoom-in;" v-if="item.type === 'img'" />
          <Video :data="item" v-else />
        </p>
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
  useStore,
  useRoute,
  useRouter,
  onMounted,
  codings
} from '@/utils'
import TalkTabs from '../components/module/TalkTabs.vue'
import Video from '../components/TalkItem/components/video2.vue'

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const route = useRoute()
const router = useRouter()
const dataList: any = ref({})
const loading: any = ref(false)
const coding = codings.talk.download
const tabs = [{
  name: '全部',
  value: ''
}, {
  name: '分享有效',
  value: 'ing'
}, {
  name: '分享过期',
  value: 'pass'
}, {
  name: '分享失败',
  value: 'fail'
}, {
  name: '密享',
  value: 'password'
}]

function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 30
  }

  Object.assign(params, param)
  loading.value = false
  store.dispatch('talk/TalkDownload', {
    data: {
      ...params
    }
  }).then(res => {
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

function handleClick(param: any) {
  router.push(`/${param.to_uid}/${param.short_url_id}`)
}

onMounted(init)
</script>
