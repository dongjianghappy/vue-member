<template>
<div class="flex">
  <div class="p25" style="flex: 1">
    <ul class="tech-lists">
      <li class="relative" style="border-bottom: 1px dashed var(--default-border); padding:10px 0;" v-for="(item, index) in dataList.list" :key="index">
        <p class="mb10 relative">
          <span v-if="item.management_checked === '0'"><i class="iconfont icon-shenhe font18 ml0" style="color: #5bc0de"></i></span>
          <span class="art-title font16 mr5 pointer" @click="handleclick(item)">
            <i class="iconfont icon-dot"></i> {{item.title}}
          </span>
          <span v-if="item.summary !== ''">
            <i class="infos demoimg iconfont icon-article"></i>
          </span>
          <span v-if="item.image.length">
            <i class='iconfont icon-img'></i>
          </span>
          <span class="font14 cl-ccc">{{item.times}}</span>
        </p>
        <p class="pl25">
          <span class="operating f-fr font12 cl-ccc">
            <a class="cl-ccc">分类：{{item.parent || '未分类'}}</a> |
            <a title="阅读" data-model="partner" data-action="remove" data-id="22" class="remove cl-ccc">阅读({{item.visit}})</a>
          </span>
        </p>
        <div v-if="isShowBatch" style=" position: absolute; left: 0; top: 0; right: 0; bottom: 0"></div>
      </li>
    </ul>
    <div class="pt25 align_right" v-if="dataList.total > 25">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
    </div>
  </div>
  <div class="p25" style="width: 270px">
    <Directory :render="init" :data="detail" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  useStore,
  ref,
  useRouter
} from '@/utils'

import Directory from '../components/directory.vue'

const store = useStore()
const router = useRouter()
const dataList: any = ref([])
const detail: any = ref({})
const loading: any = ref(false)

function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 12
  }

  Object.assign(params, param)
  loading.value.true
  store.dispatch('common/Fetch', {
    api: "Journal",
    data: {
      type: 'all',
      ...params
    }
  }).then(res => {
    loading.value.false
    dataList.value = res.result
  })
}

function handleCate(param: any) {
  store.dispatch('common/Fetch', {
    api: "bookmarkCate",
    data: {
      uid: param.uid
    }
  }).then(res => {
    detail.value = res.result
  })
}

function handleclick(param: any) {
  router.push(`/journal?item=view&id=${param.id}`)
}

function visit(param: any) {
  window.open(param.url)
}

onMounted(() => {
  init()
})
</script>
