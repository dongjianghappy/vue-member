<template>
<div class="container w1100">
  <Detail v-if="route.query.id" />
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

const route = useRoute()
</script>
