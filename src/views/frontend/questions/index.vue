<template>
<Detail v-if="route.query.id" />
<Index v-else />
</template>

<script setup lang="ts">
import {
  useRoute
} from '@/utils'
import Index from './components/index.vue'
import Detail from './components/detail.vue'

const route = useRoute();
</script>
