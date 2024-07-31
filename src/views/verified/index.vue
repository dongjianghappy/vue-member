<template>
<div class="container w1100 relative" style="background: var(--module-background); height: 650px;">
  <Institution v-if="route.query.item === 'institution'" />
  <Condition v-if="route.query.item === 'condition'" />
  <Main v-else />
</div>
</template>

<script setup lang="ts">
import {
  useRoute,
} from '@/utils'
import Main from './main.vue'
import Institution from './institution.vue'
import Condition from './condition.vue'

const route = useRoute();
</script>
