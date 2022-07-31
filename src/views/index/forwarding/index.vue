<template>
  <div class="home">
    <div class="tab_ul">
      <ul style="overflow:hidden;">
        <li style="float:left;"><a href="#">转载我的</a></li>
        <li style="float:left;"><a href="#">我转载的</a></li>
      </ul>
    </div>
    <v-talkitem :sourceData="talkForwarding" />
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

export default defineComponent({
  name: 'HomeViewss',
  components: {

  },
    setup(props, context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const talkForwarding = computed(() => store.getters['talk/TalkForwarding']);

    function init(){
      store.dispatch('talk/TalkForwarding', {
        
      })
    }
    init()
    return { 
      init,
      talkForwarding
    }
  },  
})
</script>
