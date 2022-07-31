<template>
<div>
  <div class="container w1100 relative clearfix">
    <div class="left left-sidebar">
      <v-aside :data="module.groups" title="首页" />
    </div>
    <div class="main-center left">
      <Collect v-if="component==='collect'" />
      <Comment v-else-if="component==='comment'" />
      <Praise v-else-if="component==='praise'" />
      <Forwarding v-else-if="component==='forwarding'" />
      <Center v-else />
    </div>
    <div class="w280 right">
      <RightView :module="module.personal_center" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useStore,
  useRoute
} from '@/utils'

import Center from './center/index.vue'
import Collect from './collect/index.vue'
import Comment from './comment/index.vue'
import Praise from './praise/index.vue'
import Forwarding from './forwarding/index.vue'
import RightView from './components/right_aside.vue'

export default defineComponent({
  name: 'HomeViewdddf',
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
    const module = computed(() => store.getters['user/config_talk']);
    const component = computed(() => route.query.mod);
    return {
      module,
      component
    }
  }
})
</script>
