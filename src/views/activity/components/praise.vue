<template>
  <div class="home">
    <TalkTabs :getData="init"
              :tabs="[{name: '收到的赞', path: '/?mod=praise'}, {name: '发出的赞', path: '/?mod=praise&item=hot'}]" />
    <div class="con-list"
         v-for="(item, index) in talkPraise"
         :key="index">
      <div class="con-wrap">
        <span class="infos demoimg"
              data-placement="top"
              data-toggle="tooltip"
              data-position="30px"
              style="position:absolute; top:25px; right:15px;"><i class="iconfont icon-down"></i></span>

        <div class="photos"><a href="//home"><img :src="item.photos"
                 width="30"
                 height="30"></a></div>
        <div class="wb_info"><span class="username">{{item.nickname}}</span></div>
        <div class="wb_from">
          {{item.times}}
        </div>
        <div class="wb_text">

          <div style="background: #eee; margin-top:5px; padding:5px 10px; font-size: 12px;">攒了的微博：
            <span v-html="item.summary"></span>
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
  name: 'HomeViews',
  components: {
    TalkTabs
  },
      setup(props, context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const talkPraise = computed(() => store.getters['common/talkPraise']);

    function init(){
      store.dispatch('common/TalkPraise', {
        
      })
    }
    init()
    return { 
      init,
      talkPraise
    }
  },
})
</script>
