<template>

<div class="container w1100 clearfix">
  <Banner />
  <div class="w180 left">
    <v-aside :data="module.schedule" title="" :isFixed="false">
      <template v-slot:aside>
      </template>
    </v-aside>
  </div>
  <div class="m0 right" style="width: 910px">
    <Dynamics v-if="component === 'dynamics'" />
    <Ranking v-else-if="component === 'ranking'" />
    <MySchedule v-else-if="component === 'myschedule'" />
    <Detail v-else-if="component === 'detail'" />
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
import Banner from './components/banner.vue'
import Main from './components/main.vue'
import Dynamics from './components/dynamics.vue'
import MySchedule from './components/mySchedule.vue'
import Ranking from './components/ranking.vue'
import Detail from './item/index.vue'

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

function getScheduleDetail() {
  store.dispatch('common/Fetch', {
    api: 'scheduleDetail',
    data: {
      id: 7
    }
  }).then((res) => {
    console.log("sssssssssssssss");
    console.log(res);
  })
}



getScheduleDetail()
</script>
