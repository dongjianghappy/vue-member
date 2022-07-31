<template>
  <div>
    <Center/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Center from '../../index/center/index.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
   Center
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  }
})
</script>
