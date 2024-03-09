<template>
<div class="comment-wrap nobg" style="border-top: none;">
  <div class="absolute" style="top: 15px; right: 0; bottom: 15px; left: 0; overflow-y: auto;">
    <TalkItem :data="data" />
    <Form :data="data" :render="render" page="res" />
    <div class="content comment-content" v-if="data.commentList && data.commentList.length > 0">
      <div class="comment-list" style="padding-left: 90px;" v-for="(item, index) in data.commentList || []" :key="index">
        <div class="photos" style="left: 30px;">
          <v-photos :sourceData="item" />
        </div>
        <p class="m0">{{item.nickname}}</p>
        <p>{{item.times}}
          <Itembar :data="item" v-if="data.model ==='member_talk'" />
        </p>
        <p v-html="item.content"></p>
        <p v-if="item.image && item.image.length>0">
          <Images :data="item" kind="comment" />
        </p>
        <p v-if="data.model ==='member_talk' && item.reply > 0">
          <Reply :data="item" />
        </p>
      </div>
    </div>
    <v-nodata v-else trip="暂时还没有人评论" />
  </div>
  <div class="half-circle" @click="expand"><i class="iconfont icon-arrow" style="margin: 0 !important" /></div>
</div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'
import TalkItem from './talkInfo.vue'
import Form from './formsss1.vue'
import Images from '../components/image.vue'
import Itembar from './itembar.vue'
import Reply from './reply.vue'
export default defineComponent({
  name: 'HomeViewe',
  components: {
    TalkItem,
    Form,
    Images,
    Itembar,
    Reply
  },
  props: {
    data: {
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
    expand: {
      type: Function,
      default: () => {
        return
      }
    }
  }
})
</script>
