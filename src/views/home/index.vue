<template>
  <v-userinfohead />
  <div class="container w1100 clearfix">
    <div class="w300 left">
      <Aside />
    </div>
    <div class="main-center m0 right"
         style="width: 790px">
      <TalkTabs :getData="init" />
      <TalkItem :sourceData="talk.list" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed , onMounted} from 'vue'
import { getUid } from '@/utils'
import Aside from './components/Aside.vue'
import TalkTabs from '../index/components/module/TalkTabs.vue'
import TalkItem from '../index/components/TalkItem/index.vue'
import {useStore} from 'vuex'
import {useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'

export default defineComponent({
  name: 'HomeViewwrer',
  components: {
    Aside,
    TalkTabs,
    TalkItem
  },
    setup(props, context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const talk = computed(() => store.getters['common/talkList']);

    function init(param: any){
      window.scrollTo(0, 0)
      store.dispatch('common/Talk', {
        uid: getUid(),
        ...param
      })
    }
    onMounted(()=>{
      init({
        page: 1,
        key: route.query.q
    })
      // window.addEventListener("scroll", function (e: any): void {
      //   debugger
      //   // document.body.clientHeight - window.scrollY <= 1000 && talk.value.page !== 1 && 
      //   if (talk.value.page <= talk.value.pageNum) {
      //     loadData()       
      //   }    
      // })

          
    })
    return { 
      init,
      talk
    }
  },
})
</script>
