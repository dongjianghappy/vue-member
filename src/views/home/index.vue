<template>
  <v-userinfohead />
  <div class="container w1100 clearfix">
    <div class="w300 left">
      <Aside />
    </div>
    <div class="main-center m0 right"
         style="width: 790px">
      <TalkTabs ref="talktabs" :data="tabs" :getData="init" :mod="{tab: 'mod', value: query.mod}" />
      <TalkItem :sourceData="talk.list" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed , onMounted, watch} from 'vue'
import {ref, getUid } from '@/utils'
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
    const tabs = computed(() => store.getters['user/config_talk'].talk_tabs);
    const talk = computed(() => store.getters['talk/talkList']);
    const query: any = ref(route.query)
    const talktabs: any = ref(null)
    
    // 监听弹窗变量
    watch(route, (newValues, prevValues) => {
      if (route.path === "/") {
        init({
          page: 1,
          key: route.query.q
        })
      }
      query.value = route.query
    }, {
      deep: true
    })

    function init(param: any){
      window.scrollTo(0, 0)
      store.dispatch('talk/Talk', {
        uid: getUid(),
        ...param
      })
    }
    onMounted(()=>{

      // 在没有置顶页面时，初始化页面进入到默认tabs项中
      if(!query.value.mod){
        const defaultTab = tabs.value.filter((item: any) => item.default === '1')
        talktabs.value.handelClick(defaultTab[0].value)
        return
      }

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
      tabs,
      talk,
      talktabs,
      query
    }
  },
})
</script>
