<template>
  <div>
    <div class="sidebar">
      <HotTalk />
      <Ranking />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue'
import {useStore} from 'vuex'
import HotTalk from '../../index/components/module/hotTalk.vue'
import Ranking from '../../../views/activity/components/module/ranking.vue'
export default defineComponent({
  name: 'AsideView',
  components: {
   HotTalk,
   Ranking
  },
  data() {
  return {
    menu: [
      {name: "收藏"},
      {name: "评论"},
      {name: "点赞"},
      {name: "@我的"},
      {name: "音乐盒"},
      {name: "相册"},
      {name: "日志"},
      {name: "留言板"},
      {name: "自媒体"},
      {name: "作品管理"},
      {name: "我的博客"},
    ]
  }
},
setup(props, context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const userInfo = computed(() => store.getters['common/userInfo']);
    const messageBoard = computed(() => store.getters['common/messageBoard']);
    const recentJournal = computed(() => store.getters['common/recentJournal']);
    const recentPhotos = computed(() => store.getters['common/recentPhotos']);
    const currentUser = computed(() => store.getters['common/currentUser']);

    function init(){
      store.dispatch('common/MessageBoard', {
        
      })
      store.dispatch('common/RecentJournal', {
        
      })
      // store.dispatch('common/RecentPhotos', {
        
      // })      

    }
    init()
    return { 
      init,
      userInfo,
      currentUser,
      messageBoard,
      recentJournal,
      recentPhotos,
    }
  },
})
</script>
