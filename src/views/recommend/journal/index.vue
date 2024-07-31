<template>
<div class="relative" style="height: -webkit-fill-available;">
<div style="background: var(--card-background); position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0; border-radius: 8px; overflow: hidden;">
    <Detail v-if="route.query.item === 'view'" />
    <List v-else />
</div>
</div>
</template>

<script setup lang="ts">

import List from './list.vue'
import Detail from './detail.vue'
import { useRoute } from '@/utils'

const route = useRoute()
</script>
