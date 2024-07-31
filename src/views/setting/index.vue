<template>
<div class="container w1100 clearfix">
  <div class="w180 left">
    <v-aside :data="module" title="设置" />
  </div>
  <div class="m0 right" style="width: 910px">
    <Index :type="component" />
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
const module = computed(() => store.getters['user/config_talk'].setting_center);

const component = computed(() => route.query.mod);
</script>
