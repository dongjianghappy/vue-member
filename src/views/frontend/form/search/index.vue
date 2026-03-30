<template>
  <div id="site-search" class="container w1100 relative clearfix">
    <div class="main-center mr50 left" style="width: 730px; min-height: 500px">
      <Search @search="handelSearch" :data="data" />
      <Main :dataList="dataList" :data="data" :render="init" v-if="!loading" />
      <v-loding v-else />
    </div>
    <div class="right" style="width: 300px;">
      <Blog />
      <RelatedSearch :dataList="dataList.related" :data="data" @search="handelSearch" v-if="dataList.related && dataList.related.length > 0" />
      <HotTalk />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore,
  codings,
  useRoute
} from '@/utils'
import Blog from './components/blog.vue'
import Main from './components/main.vue'
import RelatedSearch from './components/related_search.vue'
import HotTalk from './components/hotTalk.vue'
import Search from './components/search.vue'
    const store = useStore();
    const route = useRoute()
    const dataList: any = ref({});
    const coding: any = codings;
    const loading: any = ref(false)
    const data: any = ref({
      channel: 'all',
      word: ''
    })

    function init(param: any = {}) {
      const { channel, word }: any = data.value
      const params: any = {
        page: 1,
        pagesize: 10,
        search: word
      }

      if(channel === 'picture' || channel === 'source'){
        params.pagesize = 16
      }

      Object.assign(params, param)
      if(channel != undefined && channel !== 'all'){
        params.coding = coding[channel].art
      }
      dataList.value = {}
      loading.value = true
      store.dispatch('common/Fetch', {
        api: 'siteSearch',
        data: {
          search: word,
          ...params
        }
      }).then((res: any) => {
        dataList.value = res.result
        loading.value = false
        setTimeout(() => {
          let doc: any = document.getElementById("site-search")
          let message = {
          type: "MSG_FROM_CHILDREN",
          height: doc.clientHeight,
          word: word,
          channel: channel
          }
          window.parent.postMessage(message, '*');
        }, 1)
      })
    }

    function handelSearch(param: any = {}){
      init()
    }

    onMounted(() => {
      data.value.word = route.query.q
      data.value.channel = route.query.channel
      init()
      window.addEventListener(
        'message',
        function (event) {
          if(event.data.type == 'MSG_FROM_PARENT'){
            data.value.word = event.data.data.word
            data.value.channel = event.data.data.channel
            init()
          }
        },
        false
      )
    })
</script>

<style lang="less">
body{
  background: #fff;
}
</style>