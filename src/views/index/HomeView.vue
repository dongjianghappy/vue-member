<template>
<div v-if="route.path === '/home' || loginuser.currentUser">
  <SpaceName v-if="module.personal_center.space_name" />
  <div class="container w1100 relative clearfix">
    <div class="left-sidebar left">
      <v-aside :data="module.groups" title="首页" :render="init" />
    </div>
    <div class="main-center left">
      <Center ref="talk" />
    </div>
    <div class="w280 right">
      <RightView :render="init" />
    </div>
  </div>
</div>
<div v-else>
  <Home />
</div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  useStore,
  useRoute  
} from '@/utils'
import SpaceName from '@/views/layout/components/name/index.vue'
import Center from './center/index.vue'
import RightView from './components/right_aside.vue'

import Home from '../home/index.vue'

const store = useStore();
const route = useRoute();
const loginuser = computed(() => store.getters['user/loginuser']);
const module = computed(() => store.getters['user/config_talk']);
const talk: any = ref(null)

function init(param: any = {}) {
  if (!route.query.mod) return
  return talk.value.init(param)
}
</script>
