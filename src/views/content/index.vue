<template>
<div class="container w1100 clearfix">
  <div class="w180 left">
    <v-aside :data="module.content" title="内容管理">
      <template v-slot:aside>
      </template>
    </v-aside>
  </div>
  <div class="m0 right" style="width: 910px">
    <Channel v-if="component === 'channel'" />
    <Visitor v-else-if="component === 'visitor'" />
    <Mood v-else-if="component === 'mood'" />
    <Expression v-else-if="component === 'expression'" />
    <Statistics v-else-if="component === 'statistics'" />
    <Contribution v-else-if="component === 'contribution'" />
    <Map v-else-if="component === 'map'" />
    <Data v-else />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  computed,
  useStore,
  useRoute
} from '@/utils'

import Index from './components/index.vue'
import Channel from './components/channel.vue'
import Visitor from './visitor/index.vue'
import Mood from './components/mood.vue'
import Expression from './expression/index.vue'
import Statistics from './statistics/index.vue'
import Contribution from './components/contribution.vue'
import Map from './map/index.vue'
import Data from './data/index.vue'

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
</script>
