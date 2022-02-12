<template>
  <div class="home">
    <TalkTabs :getData="init"
              :tabs="[{name: '我的收藏(共1条)', path: '/?mod=collect'}, {name: '热门收藏', path: '/?mod=collect&item=hot'}]" />
    <TalkItem :sourceData="talkCollect" />
    <div class="con-list">
      <div class="con-wrap"
           style=" padding-top:100px; height:350px; text-align: center;">
        <p>你还没有收藏任何作品呢！</p>
        <p style="font-size: 12px; color: #999;">当你发现有意思的、有价值的作品时，赶紧收藏下来哦！</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue'
import {useStore} from 'vuex'
import TalkTabs from './TalkTabs1.vue'
import TalkItem from './TalkItem/index.vue'

export default defineComponent({
  name: 'HomeViewsss',
  components: {
    TalkTabs,
    TalkItem
  },
    setup(props, context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const talkCollect = computed(() => store.getters['common/talkCollect']);

    function init(){
      store.dispatch('common/TalkCollect', {
        
      }) 
    }
    init()
    return { 
      init,
      talkCollect
    }
  },
})
</script>
