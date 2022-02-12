<template>
  <div class="module-wrap">
    <div class="module-head p20">
      {{info[title]}}
    </div>
    <div class="module-content p25"
         style="padding-bottom: 25px !important; height:auto">
      <ul>
        <li style="display: flex">
          <div style="width: 80px">
            <img src="https://avatar-static.segmentfault.com/115/426/1154267036-5de60e2b2d436_huge256"
                 style="width: 60px; height: 60px;border-radius: 50%;" />
          </div>
          <div style="flex: 1">
            <div class="mb10">
              <span class="mr10">简宝玉</span>
              <span class="font12">2022-1-1 12:20:25</span>
            </div>
            <div class="font12">
              <span class="information system">系统消息！</span> Hello！ 我是简书的简宝玉，欢迎你的到来，成为万千简友中的一员，这里是一个有故事有想法的社区。 能否请你抽出2分钟，填写下这个问卷 https://jinshuju.net/f/ohbnnF?x_field_1=1 ，你的每一个意见我们都会用心倾听。如果你在使用过程中有任何疑问，可以查看《新手玩转简书必读》：http://www.jianshu.com/p/27de765cdb28 。
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import photos from '@/views/concern/components/photos.vue';
import { defineComponent, getCurrentInstance, computed } from 'vue'
import {useStore} from 'vuex'
import { information } from '@/assets/const'

export default defineComponent({

  name: 'AsideView',
  props: {
    title: {
      type: String,
      defualt: "system"
    }
  },
  setup(props, context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const appstore = computed(() => store.getters['common/integration']);
    const info: any = information
    function init(param: any){
      store.dispatch('common/Integration', {
        ...param
      })
    }
    init({})
    return { 
      init,
      appstore,
      info
    }  
  }
  
})
</script>
