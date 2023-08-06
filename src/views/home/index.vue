<template>
<UserInfoHead />
<div class="container w1100 clearfix">
  <div class="w300 left">
    <Aside :module="module" />
  </div>
  <div class="main-center m0 right" style="width: 790px">
    <Main />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRoute,
  computed,
} from '@/utils'
import UserInfoHead from './components/UserInfoHead.vue'
import Aside from './components/Aside.vue'
import Main from '../index/center/main.vue'

export default defineComponent({
  name: 'HomeViewwrer',
  components: {
    UserInfoHead,
    Aside,
    Main
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const module = computed(() => store.getters['user/config_talk'].home_module);

    
    return {
      module
    }
  },
})
</script>
