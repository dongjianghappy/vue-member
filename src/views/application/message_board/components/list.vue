<template>
<div class="feedback-wrap">
  <div class="content" v-if="!loading">
    <div class="feedback-list" v-for="(item, index) in dataList.list" :key="index">
      <div class="photos">
        <v-photos :sourceData="item" />
      </div>
      <p class="m0">{{item.nickname}}</p>
      <p>{{item.times}}
      </p>
      <p v-html="item.content"></p>
      <p>
        <Reply :data="item" />
      </p>
      <div class="reply_info" v-for="(data, i) in item.reply" :key="i">
        <div class="photos">
          <v-photo :data="data" />
        </div>
        <p>{{data.nickname}} {{data.times}}</p>
        <p>
          <Reply :data="data" v-if="data.isreply" />
          {{data.content}}</p>
      </div>
    </div>
    <div class="mlr15 ptb10 align_center" style="border-top: 1px solid #ddd;" v-if="dataList.total > 5">查看全部{{dataList.total}}条评论<i class="iconfont icon-arrow" /></div>
  </div>
  <div v-else>
    <div class="load7 h60">
      <div class="loader">Loading...</div>
    </div>
  </div>
  <div class="pt25 align_right" v-if="dataList.total > 25">
    <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="render" />

  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@/utils'
import Reply from './reply.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Reply
  },
  props: {
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
  }
})
</script>
