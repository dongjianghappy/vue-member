<template>
<div class="container w1100 clearfix">
  <div class="180 left">
    <v-aside :data="module" title="消息管理" />
  </div>
  <div class="m0 right" style="width: 910px; min-height: 500px;">
    <Index :title="component || 'system'" />
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

const store = useStore();
const route = useRoute();
const module = computed(() => store.getters['user/config_talk'].message);

const component = computed(() => route.query.mod);
</script>
