<template>
<div>
  <div class="container w1100">
    <UserInfoHead />
  </div>
  <div class="container w1100 relative clearfix">
    <!-- 侧边菜单 -->
    <div class="w180 left" style="min-height: 700px;">
      <Aside :data="module.home_nav" title="首页" />
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
      <RightView :module="module.personal_center" :userInfo="userInfo" :render="init" />
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

import UserInfoHead from './components/UserInfoHead.vue'
import Center from '../index/center/home.vue'
import Aside from './components/Aside.vue'
import RightView from './components/right_view.vue'

const store = useStore();
const route = useRoute();
const component = computed(() => route.query.mod);
const module = computed(() => store.getters['user/config_talk']);
const userInfo: any = computed(() => store.getters['user/userInfo']);
const talk: any = ref(null)

function init(param: any = {}) {
  return talk.value.init(param)
}
</script>
