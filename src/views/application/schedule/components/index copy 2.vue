<template>
<div class="container w1100">
  <Banner />
</div>
<div class="container w1100 clearfix">
  <div class="w220 left">
    <Aside />
  </div>
  <div class="m0 main-center right" style="width: 870px">
    <Dynamics v-if="component === 'dynamics'" />
    <Ranking v-else-if="component === 'ranking'" />
    <Record v-else-if="component === 'record'" />
    <Month v-else-if="component === 'month'" />
    <MySchedule v-else-if="component === 'myschedule'" />
    <Main v-else />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  computed,
  useStore,
  useRoute
} from '@/utils'
import Banner from './banner.vue'
import Aside from './aside.vue'
import Main from './main.vue'
import Dynamics from './dynamics.vue'
import MySchedule from './mySchedule.vue'
import Ranking from './ranking.vue'
import Record from './record.vue'
import Month from '../calendar/month.vue'

const store = useStore();
const route = useRoute();
const module: any = computed(() => {
  let site = store.getters['user/config_talk']
  site.content && site.content.map((item: any) => {
    item.path = `/content${item.value}`
  })
  return site
});
const component = computed(() => route.query.mod);
document.documentElement.scrollTop = 0
</script>
