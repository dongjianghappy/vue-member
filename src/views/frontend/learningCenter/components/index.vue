<template>
<div class="container w1100 clearfix">
  <Article v-if="route.query.item" />
  <List v-else />
</div>
</template>

<script setup lang="ts">
import {
  useRoute
} from '@/utils'
import List from './list.vue'
import Article from './article.vue'

const route = useRoute();
</script>
