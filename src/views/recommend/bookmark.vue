<template>
<div class="relative" style="height: -webkit-fill-available;">
<div class="flex" style="background: var(--card-background); position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0; border-radius: 8px; overflow: hidden;" v-if="dataList.list && dataList.list.length">
    <div class="p25" style="flex: 1">
      <div class="notes-list relative" v-for="(item, index) in dataList.list" :key="index">
        <div class="notes-content plr5 ptb10" style="background: none; margin-bottom: 0px; border: 0px solid #f3f3f3">
          <div>
          <div class="flex pb10 font12">
            <!-- <div style="width: 30px"><v-photos :sourceData="item" :style="{width: 20, height: 20}" /></div> -->
            <div>
              <span class="mr10">{{item.nickname || '博主'}}</span>
              <span class="mr10">{{item.times}}</span>
              <span @click="handleCate(item)">Ta的书签分类</span>
            </div>
          </div>
          <span class="bold">{{item.parent || '未分类'}} <i class="iconfont icon-dot" /> </span>
          <span>{{item.name}}</span>
          <span class="ml10" @click="visit(item)">查看</span>
          </div>
        </div>
      </div>
    </div>
    <div class="p25" style="width: 270px">
      <Directory :render="init" :data="detail" />
    </div>
</div>
<div :style="`padding: ${height/2}px`" v-else>
  <v-loding v-if="!loading" />
</div>
</div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  onMounted,
  useStore,
  ref
} from '@/utils'

import Directory from './components/directory.vue'

const store = useStore()
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
    api: "bookmark",
    data: {
      type: 'all',
      ...params
    }
  }).then(res => {
    loading.value.false
    dataList.value = res.result
  })
}

function handleCate(param: any){
  store.dispatch('common/Fetch', {
    api: "bookmarkCate",
    data: {
      uid: param.uid
    }
  }).then(res => {
    detail.value = res.result
  })
}

function visit(param: any) {
  window.open(param.url)
}

onMounted(() => {
  init()
})
</script>
