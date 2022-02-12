<template>
  <div>
    <Integration />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Integration from './integration.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
   Integration,
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  }
})
</script>
