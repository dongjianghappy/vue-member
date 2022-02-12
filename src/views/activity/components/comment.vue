<template>
  <div class="home">
    <TalkTabs :getData="init"
              :tabs="[{name: '我的收藏(共1条)', path: '/?mod=comment'}, {name: '热门收藏', path: '/?mod=comment&item=hot'}]" />
    <div class="con-list"
         v-for="(item, index) in talkComment"
         :key="index">
      <div class="con-wrap">

        <div class="photos">
          <img :src="item.photos"
               width="30"
               height="30"
               class="showuserinfo">

        </div>
        <div class="wb_info"><span class="username">{{item.nickname}}</span></div>
        <div class="wb_from">{{item.times}}</div>
        <div class="wb_text">
          {{item.content}}
          <div style="background: #eee; margin-top:5px; padding:5px 10px; font-size: 12px;">
            评论的微博：<span v-html="item.summary"></span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue'
import {useStore} from 'vuex'
import TalkTabs from './TalkTabs1.vue'

export default defineComponent({
  name: 'HomeViewsa',
  components: {
    TalkTabs
  },
   setup(props, context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const talkComment = computed(() => store.getters['common/talkComment']);

    function init(){
      store.dispatch('common/TalkComment', {
        
                   })
    }
    init()                 
    return { 
      init,
      talkComment
    }
  },
})
</script>
