<template>
<div class="container w1100">
  <Detail v-if="route.query.mod === 'detail'" />
  <Energy v-else-if="route.query.mod === 'energy'" />
  <Index v-else  />
</div>
</template>

<script setup lang="ts">
import {
  computed,
  useStore,
  useRoute
} from '@/utils'
import Index from './components/index.vue'
import Detail from './detail/index.vue'
import Energy from './energy/index.vue'

const route = useRoute()
</script>
