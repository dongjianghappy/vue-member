<template>
<div>
  <Article :title="title" v-if="title==='detail'" />
  <Integration :title="title" v-else />
</div>
</template>

<script setup lang="ts">
import Integration from './integration.vue'
import Article from './article.vue'

const props: any = defineProps({
  title: {
    type: String,
    defult: "index"
  }
})
</script>
