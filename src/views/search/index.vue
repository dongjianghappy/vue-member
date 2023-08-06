<template>
<div>
  <div class="container w1100 relative pb25 clearfix">
    <div class="main-center bg-white left" style="width: 800px; min-height: 500px">
      <Center />
    </div>
    <div class="w280 right">
      <RightView :module="module.search" />
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
import RightView from './components/right_aside.vue'

export default defineComponent({
  name: 'HomeViewdddf',
  components: {
    Center,
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
