<template>
<div class="module-wrap">
  <div class="module-content">
    <template v-if="dataList.list && dataList.list.length">
      <div class="mb15">博客网已为你找到以下结果</div>
      <Thum :dataList="dataList.list" v-if="data.channel === 'picture' || data.channel === 'source'" />
      <List :dataList="dataList.list" v-else />
      <div class="mt25 align_left" v-if="dataList.total > 10">
        <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :simple="true" :render="render" />
      </div>
    </template>
    <v-nodata v-else trip="暂无相关搜索内容" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps
} from '@/utils'
import List from './list.vue'
import Thum from './thum.vue'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  dataList: {
    type: Object,
    default: () => {
      return {}
    }
  },
  render: {
    type: Function,
    default: () => {
      return
    }
  },
})
</script>

<style lang="less" scoped>
.search-button{
  display: flex;
  li{
    background: #eee;
    margin-right: 10px;
    border-radius: 4px;
    width: 80px;
    height: 32px;
    line-height: 32px;
    text-align: center;
  }
}
a{
  color: #074daa !important;
}
</style>