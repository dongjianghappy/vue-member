<template>
  <div>
    <SpaceName v-if="module.personal_center.space_name" />
    <div class="container w1100 relative clearfix">
      <!-- 侧边菜单 -->
      <div class="left-sidebar left">
        <v-aside :data="module.groups"
                 title="首页"
                 :isFixed="false"
                 :render="init" />
      </div>
      <!-- 主内容 -->
      <div class="main-center left">
        <Collect v-if="component==='collect'" />
        <Comment v-else-if="component==='comment'" />
        <Praise v-else-if="component==='praise'" />
        <Forwarding v-else-if="component==='forwarding'" />
        <Center ref="talk"
                v-else />
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
import SpaceName from '../../views/layout/components/name/index.vue'
import Center from './center/index.vue'
import Collect from './collect/index.vue'
import Comment from './comment/index.vue'
import Praise from './praise/index.vue'
import Forwarding from './forwarding/index.vue'
import RightView from './components/right_aside.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    SpaceName,
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
      if(!route.query.mod){
        return
      }
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
