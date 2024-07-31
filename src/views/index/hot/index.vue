<template>
<div>
  <div class="container w1100 relative clearfix">
    <!-- 侧边菜单 -->
    <div class="left-sidebar left">
      <v-aside :data="module.my_talk" title="我的" />
    </div>
    <!-- 主内容 -->
    <div class="main-center left">
     <Center />
    </div>
    <!-- 右侧 -->
    <div class="w280 right">
      <RightView :render="init" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  useStore,
  useRoute,
  computed,
  ref
} from '@/utils'

import Center from './components/main.vue'
import RightView from './components/right_aside.vue'

const store = useStore();
const route = useRoute();
const component = computed(() => route.query.mod);
const module = computed(() => store.getters['user/config_talk']);
const talk: any = ref(null)

function init(param: any = {}) {
  return talk.value.init(param)
}
</script>
