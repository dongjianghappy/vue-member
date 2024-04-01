<template>
  <div class="home">
    <TalkTabs :getData="init"
              :style="{flex: 1}"
              :mod="{tab: 'mod', value: 'praise'}"
              :data="[{name: `收到的赞(共${talkPraise.length}条)`, value: ''}, {name: `发出的赞(共${talkPraise.length}条)`, value: 'hot'}]"
              :query="{tab: 'item', value: route.query.item}" />
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
        <div class="user_info pb5"><span class="username">{{item.nickname}}</span></div>
        <div class="user_from pb5">
          {{item.times}}
        </div>
        <div class="user_text">

          <div style="background: #eee; margin-top:5px; padding:5px 10px; font-size: 12px;">攒了的微博：
            <span v-html="item.summary"></span>
          </div>

        </div>
      </div>
    </div>
    <v-loding v-if="!loading" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  ref,
  useStore,
  useRoute
} from '@/utils'
import TalkTabs from '../components/module/TalkTabs.vue'

export default defineComponent({
  name: 'HomeViews',
  components: {
    TalkTabs
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute()
    const talkPraise = computed(() => store.getters['talk/talkPraise']);
    const loading: any = ref(false)

    function init() {
      loading.value = false
      store.dispatch('talk/TalkPraise', {

      }).then(res => {
        loading.value = true
      })
    }
    init()
    return {
      route,
      loading,
      init,
      talkPraise
    }
  },
})
</script>
