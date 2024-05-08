<template>
  <div>
    <Article :title="title" v-if="title==='detail'" />
    <Integration :title="title" v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Integration from './integration.vue'
import Article from './article.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
   Integration,
   Article
  },
  props: {
    title: {
      type: String,
      defult: "index"
    }
  }
})
</script>
