<template>
<div class="comment-wrap">
  <Form :data="data" :render="int" :keys="`comment_${data.id}`" />
  <div class="content comment-content" v-if="!loading">
    <div class="comment-list" v-for="(item, index) in dataList.list" :key="index">
      <div class="photos">
        <v-photos :sourceData="item" />
      </div>
      <p class="m0">{{item.nickname}}</p>
      <p>{{item.times}}
        <Itembar :data="item" v-if="data.model ==='member_talk'" />
      </p>
      <p v-html="item.content"></p>
      <p v-if="item.image.length>0">
        <Images :data="item" kind="comment" />
      </p>
      <p v-if="data.model ==='member_talk' && item.reply > 0">
        <Reply :data="item" />
      </p>
    </div>
    <div class="mlr15 ptb10 align_center" style="border-top: 1px solid #ddd;" v-if="dataList.total > 5">查看全部{{dataList.total}}条评论<i class="iconfont icon-arrow" /></div>
  </div>
  <div v-else>
    <div class="load7 h60">
      <div class="loader">Loading...</div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  ref,
  reactive,
  onMounted,
  computed
} from 'vue'
import {
  useStore
} from 'vuex'
import Form from './formsss.vue'
import Images from '../../../../content/expression/detail.vue'
import Itembar from './itembar.vue'
import Reply from './reply.vue'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return
    }
  },
  isShow: {
    type: Boolean,
    default: false
  }
})
const store = useStore();
const userInfo = computed(() => store.getters['user/userInfo']);
const module = computed(() => store.getters['user/config_talk'].talk_send_tool || []);
let dataList: any = ref({})
let loading: any = ref(false)

function int() {
  loading.value = true
  store.dispatch('common/Fetch', {
    api: 'ArtList',
    data: {
      coding: props.data.coding3,
      artid: props.data.id
    }
  }).then(res => {
    dataList.value = res.result
    loading.value = false
  })
}

onMounted(() => {
  int()
})
</script>
