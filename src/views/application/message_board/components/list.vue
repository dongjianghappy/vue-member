<template>
<div class="feedback-content-wrap">
  <div class="feedback-content feedback-lists">
    <!-- <div style=" border-bottom:1px solid #eee; height:50px; line-height:50px;">
      <span>留言（{{dataList.length}}）</span>
    </div> -->
    <div class="feedback-list" style="background: none;" v-for="(item, index) in dataList.list" :key="index">
      <v-photo :data="item" />
      <p class="feedback-user">{{item.nickname}} {{item.times}}</p>
      <p>
        <Reply :data="item" v-if="item.isreply" />
        {{item.content}}</p>
      <div class="reply_info" v-for="(data, i) in item.reply" :key="i">
        <v-photo :data="data" />
        <p>{{data.nickname}} {{data.times}}</p>
        <p>
          <Reply :data="data" v-if="data.isreply" />
          {{data.content}}</p>
      </div>
    </div>
    <!-- <v-loding v-if="!loading" /> -->
    <div class="pt25 align_right" v-if="dataList.total > 2">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="render" />

    </div>
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
    currentUser: {
      type: Boolean,
      default: false
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
  }
})
</script>
