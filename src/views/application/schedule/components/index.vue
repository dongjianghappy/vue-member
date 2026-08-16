<template>
<div class="container w1100">
  <Banner />
</div>
<Dynamics v-if="component === 'dynamics'" />
<Ranking v-else-if="component === 'ranking'" />
<Record v-else-if="component === 'record'" />
<template v-else-if="component === 'myschedule'">
  <Month v-if="componentItem === 'month'" />
  <Day v-else-if="componentItem === 'day'" />
  <MySchedule v-else />
</template>
<Main v-else />
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
import Month from '../calendar/month.vue'
import Day from '../calendar/day.vue'

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
const componentItem = computed(() => route.query.item);
document.documentElement.scrollTop = 0
</script>
