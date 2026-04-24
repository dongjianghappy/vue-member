<template>

<div class="container w1100 clearfix">
  <Banner />
  <div class="w180 left">
    <v-aside :data="module.schedule" title="" :isFixed="false">
      <template v-slot:aside>
      </template>
    </v-aside>
  </div>
  <div class="m0 main-center right" style="width: 910px">
    <Dynamics v-if="component === 'dynamics'" />
    <Ranking v-else-if="component === 'ranking'" />
    <Record v-else-if="component === 'record'" />
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
import Main from './main.vue'
import Dynamics from './dynamics.vue'
import MySchedule from './mySchedule.vue'
import Ranking from './ranking.vue'
import Record from './record.vue'

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
