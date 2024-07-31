<template>
<div class="container w1100 clearfix">
  <div class="w180 left">
    <v-aside :data="[]" title="投票">
      <template v-slot:aside>
      </template>
    </v-aside>
  </div>
  <div class="m0 right" style="width: 910px">
    <Index />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  computed,
  useStore,
  useRouter,
  useRoute
} from '@/utils'

import Index from './components/index.vue'

const store = useStore();
const router = useRouter();
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
