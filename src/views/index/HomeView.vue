<template>
<div>
  <div class="container w1100 relative clearfix">
    <!-- 侧边菜单 -->
    <div class="left-sidebar left">
      <v-aside :data="module.groups" title="首页" />
    </div>
    <!-- 主内容 -->
    <div class="main-center left">
      <Collect v-if="component==='collect'" />
      <Comment v-else-if="component==='comment'" />
      <Praise v-else-if="component==='praise'" />
      <Forwarding v-else-if="component==='forwarding'" />
      <Center v-else />
    </div>
    <!-- 右侧 -->
    <div class="w280 right">
      <RightView :module="module.personal_center" :userInfo="userInfo" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRoute,
  computed
} from '@/utils'

import Center from './center/index.vue'
import Collect from './collect/index.vue'
import Comment from './comment/index.vue'
import Praise from './praise/index.vue'
import Forwarding from './forwarding/index.vue'
import RightView from './components/right_aside.vue'

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
    const userInfo = computed(() => store.getters['user/loginuser']);

    return {
      component,
      module,
      userInfo
    }
  }
})
</script>
