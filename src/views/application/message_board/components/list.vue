<template>
<div class="comment-wrap">
  <div class="content" v-if="!loading">
    <div class="comment-list" v-for="(item, index) in dataList.list" :key="index">
      <div class="photos">
        <v-photos :sourceData="item" />
      </div>
      <p class="m0">{{item.nickname}}</p>
      <p>{{item.times}}
        <span class="ml5">
          <Reply :data="{...item, ...data}" /></span>
      </p>
      <p v-html="item.content"></p>
      <div class="reply_info p10" style="background: var(--card-background)" v-for="(list, i) in item.reply" :key="i">
        <div class="photos">
          <v-photo :data="list" />
        </div>
        <p class="m0">{{list.from_nickname || '游客'}} 回复 {{list.nickname || '游客'}}: </p>
        <p>{{list.times}} <span class="ml5">
            <Reply :data="{...list, ...data}" method="reply" /></span></p>
        <p>
          {{list.content}}
        </p>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="load7 h60">
      <div class="loader">Loading...</div>
    </div>
  </div>
  <div class="pt25 align_center" v-if="dataList.total > 25">
    <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="render" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
} from '@/utils'
import Reply from './reply.vue'

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
      return []
    }
  },
  render: {
    type: Function,
    default: () => {
      return 'Default function'
    }
  }
})
</script>
