<template>
<div v-if="dataList.list && dataList.list.length">
  <div class="clearfix">
  <div class="col-md-3 p10" v-for="(item, index) in dataList.list" :key="index">
    <div class="radius-8" style=" background: #252632; overflow:hidden; height: auto">
      <Grid1 :data="item" />
      <div class="p15 pt0">
        <div class="mb10 nowrap font16">
          {{item.name}}
          <!-- <span class="right">{{item.image.length}} 张</span> -->
        </div>
        <div class="flex">
          <div class="cl-666" style="flex: 1">@{{item.nickname}}</div>
          <div class="font12 cl-666" style="flex: 1; padding-top: 3px;">{{item.times}}</div>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div class="mt25 align_center" v-if="dataList.total > 12">
    <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" :simple="true" />
  </div>
</div>
<div :style="`padding: ${height/2}px`" v-else>
  <v-loding v-if="!loading" />
</div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  onMounted,
  useStore,
  ref
} from '@/utils'

import Grid1 from './components/grid-1.vue'

const store = useStore()
const dataList: any = ref([])

function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 12
  }

  Object.assign(params, param)
  store.dispatch('common/Fetch', {
    api: "getAlbum",
    data: {
      ...params
    }
  }).then(res => {
    dataList.value = res.result
  })
}

onMounted(() => {
  init()
})
</script>
