<template>
<div class="home">
  <TalkTabs :getData="init" :style="{flex: 1}" :mod="{tab: 'mod', value: 'comment'}" :data="[{name: `我的评论(共${talkComment.length}条)`, value: ''}, {name: '我评论的', value: 'hot'}]" :query="{tab: 'item', value: route.query.item}" />
  <div class="con-list" v-for="(item, index) in talkComment" :key="index">
    <div class="con-wrap">

      <div class="photos">
        <img :src="item.photos" width="30" height="30" class="showuserinfo">

      </div>
      <div class="user_info pb5"><span class="username">{{item.nickname}}</span></div>
      <div class="user_from pb5">{{item.times}}</div>
      <div class="user_text">
        {{item.content}}
        <div style="background: #eee; margin-top:5px; padding:5px 10px; font-size: 12px;">
          评论的微博：<span v-html="item.summary"></span>
        </div>
      </div>
    </div>
  </div>
  <v-loding v-if="!loading" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  ref,
  useStore,
  useRoute
} from '@/utils'
import TalkTabs from '../components/module/TalkTabs.vue'

export default defineComponent({
  name: 'HomeViewsa',
  components: {
    TalkTabs
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute()

    const talkComment = computed(() => store.getters['talk/talkComment']);
    const loading: any = ref(false)

    function init() {
      loading.value = false
      store.dispatch('talk/TalkComment', {

      }).then(res => {
        loading.value = true
      })
    }
    init()
    return {
      route,
      loading,
      init,
      talkComment
    }
  },
})
</script>
