<template>
<div>
  <div class="container w1100 relative clearfix">
    <!-- 侧边菜单 -->
    <div class="left-sidebar left">
      <v-aside :data="module.my_talk" title="我的" />
    </div>
    <!-- 主内容 -->
    <div class="main-center left">
      <Collect v-if="component==='collect'" />
      <Comment v-else-if="component==='comment'" />
      <Praise v-else-if="component==='praise'" />
      <Forwarding v-else-if="component==='forwarding'" />
      <Center ref="talk" v-else />
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
  ref
} from '@/utils'

import Center from './main.vue'
import Collect from '../index/collect/index.vue'
import Comment from '../index/comment/index.vue'
import Praise from '../index/praise/index.vue'
import Forwarding from '../index/forwarding/index.vue'
import RightView from '../index/components/right_aside.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Center,
    Collect,
    Comment,
    Praise,
    Forwarding,
    RightView
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const component = computed(() => route.query.mod);
    const module = computed(() => store.getters['user/config_talk']);
    const talk: any = ref(null)

    function init(param: any = {}) {
      return talk.value.init(param)
    }

    return {
      component,
      module,
      init,
      talk
    }
  }
})
</script>
