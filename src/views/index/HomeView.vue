<template>
<div>
  <div class="container w1100 relative clearfix">
    <div class="left left-sidebar">
      <v-aside :data="groups" title="首页" />
    </div>
    <div class="main-center left">
      <Collect v-if="type==='collect'" />
      <Comment v-else-if="type==='comment'" />
      <Praise v-else-if="type==='praise'" />
      <Forwarding v-else-if="type==='forwarding'" />
      <Center v-else />
    </div>
    <div class="w280 right">
      <RightView />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed
} from 'vue'
import {
  useStore
} from 'vuex'

import Center from './center/index.vue'
import Collect from './collect/index.vue'
import Comment from './comment/index.vue'
import Praise from './praise/index.vue'
import Forwarding from './forwarding/index.vue'
import RightView from './components/right_aside.vue'
import {
  useRouter,
  useRoute
} from 'vue-router'

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
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const groups = computed(() => store.getters['common/groups']);
    const component = computed(() => route.query.mod);

    return {
      component,
      groups
    }
  }
})
</script>
