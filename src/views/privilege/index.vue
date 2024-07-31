<template>
<div class="container w1100 relative" style="background: var(--module-background);">
  <Detail v-if="route.query.mod" />
  <List v-else />
</div>
</template>

<script setup lang="ts">
import {
  useRoute,
} from '@/utils'
import List from './list.vue'
import Detail from './detail.vue'

const route = useRoute();
</script>
