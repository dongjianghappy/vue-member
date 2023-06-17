<template>
<UserInfoHead />
<div class="container w1100 clearfix">
  <div class="w300 left">
    <Aside :module="module" />
  </div>
  <div class="main-center m0 right" style="width: 790px">
    <TalkTabs ref="talktabs" :data="tabs" :getData="init" :mod="{tab: 'mod', value: query.mod}" />
    <TalkItem :sourceData="talk.list" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRoute,
  computed,
  onMounted,
  watch,
  ref,
  getUid
} from '@/utils'
import UserInfoHead from './components/UserInfoHead.vue'
import Aside from './components/Aside.vue'
import TalkTabs from '../index/components/module/TalkTabs.vue'
import TalkItem from '../index/components/TalkItem/index.vue'

export default defineComponent({
  name: 'HomeViewwrer',
  components: {
    UserInfoHead,
    Aside,
    TalkTabs,
    TalkItem
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const tabs = computed(() => store.getters['user/config_talk'].talk_tabs);
    const talk = computed(() => store.getters['talk/talkList']);
    const query: any = ref(route.query)
    const talktabs: any = ref(null)
    const module = computed(() => store.getters['user/config_talk'].home_module);

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

    function init(param: any) {
      window.scrollTo(0, 0)
      store.dispatch('talk/Talk', {
        uid: getUid(),
        ...param
      })
    }
    onMounted(() => {

      // 在没有置顶页面时，初始化页面进入到默认tabs项中
      if (!query.value.mod) {
        const defaultTab = tabs.value.filter((item: any) => item.default === '1')
        talktabs.value.handelClick(defaultTab[0].value)
        return
      }

      init({
        page: 1,
        key: route.query.q
      })
    })
    return {
      init,
      tabs,
      talk,
      talktabs,
      query,
      module
    }
  },
})
</script>
