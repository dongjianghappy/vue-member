<template>
<div>
  <div class="container w1100 relative clearfix">
    <!-- 侧边菜单 -->
    <div class="left-sidebar left">
      <v-aside :data="module.groups" title="首页" />
    </div>
    <!-- 主内容 -->
    <div class="main-center left">
      <div class="module-wrap">
        <div class="module-content">
          <TalkItem :sourceData="dataList" :showComment="true" />
        </div>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="w280 right">
      <RightView :render="init" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRoute,
  computed,
  ref,
  onMounted
} from '@/utils'

import RightView from '../components/right_aside.vue'
import TalkItem from '../components/TalkItem/index.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    RightView,
    TalkItem
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const component = computed(() => route.query.mod);
    const module = computed(() => store.getters['user/config_talk']);
    const talk: any = ref(null)
    const dataList: any = ref([])

    function init(param: any = {}) {
      let arr = route.path.split("/")
       store.dispatch('common/Fetch', {
        api: 'comprehensive',
        data: {
          short_url_id: arr[arr.length - 1]
        }
      }).then((res: any) => {
        dataList.value = res.result.list
      })
    }

    onMounted(() => {
      init()
    })

    return {
      component,
      module,
      init,
      talk,
      dataList
    }
  }
})
</script>
