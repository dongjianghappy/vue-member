<template>
<div class="con-list" v-for="(item, index) in dataList" :key="index">
    <div class="con-wrap">
      <div class="photos">
        <img :src="item.photos" width="30" height="30" class="showuserinfo">

      </div>
      <div class="user_info pb5"><span class="username">{{item.nickname}}</span></div>
      <div class="user_from pb5">{{item.times}}</div>
      <div class="user_text">
        {{item.content}}
        <div class="radius-4 p10" style="background: var(--card-background); margin-top:5px; font-size: 12px;">
          评论的微博：<span v-html="item.summary"></span>
        </div>
      </div>
    </div>
  </div>
<v-loding v-if="!loading" />
</template>

<script setup lang="ts">
import TalkItem from '../../components/TalkItem/index.vue'
import {
  defineProps,
  getCurrentInstance,
  ref,
  computed,
  useStore,
  useRouter,
  getUid,
  onMounted
} from '@/utils'

const props: any = defineProps({
  tabs: {
    type: String,
    default: ''
  }
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const dataList: any = ref([])
const loading: any = ref(false)

function init(){
  loading.value = false
  store.dispatch('talk/TalkComment', {
  }).then((res) => {
    loading.value = true
    dataList.value = res.result
  })  
}
onMounted(init)
</script>
