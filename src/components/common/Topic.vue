<template>
  <Popover content="<i class='
           iconfont
           icon-topic'></i>话题"
           arrow="tb"
           offset="right"
           :move="-10"
           keys="popover-topic">

    <div style="width: 450px; height: 260px;">
      <div class="module-wrap">
        <div class="module-head nobd font16">
          推荐话题：
        </div>
        <div class="module-content plr15"
             style="height: 205px; overflow-y: auto;">
          <ul class="clearfix">
            <li class="left ptb5"
                style="width: 140px; color: #999;"
                v-for="(item, index) in dataList"
                :key="index"
                @click="chooseTopic(`#${item.name}#`)">{{`#${item.name}#`}} </li>
          </ul>
        </div>
      </div>
    </div>
  </Popover>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'
import Popover from '@/components/packages/popover/index.vue';
import {useStore} from 'vuex'

export default defineComponent({
  name: 'v-Search',
  components: {
    Popover
  },
  emits: ['onEmoji'],
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const dataList = ref([])
    function init(){
                store.dispatch('common/Fetch', {
    
          api: 'RecommendActivity',
      }).then(res => {
        debugger
        dataList.value = res.result
      })
    }


    function chooseTopic(data: any){
      context.emit('onEmoji', data)
    }
    init()
    return {
      chooseTopic,
      dataList
    }
  }
})
</script>
