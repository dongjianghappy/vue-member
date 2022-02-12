<template>
  <div>
    <Collect v-if="type==='collect'" />
    <Comment v-else-if="type==='comment'" />
    <Praise v-else-if="type==='praise'" />
    <Forwarding v-else-if="type==='forwarding'" />
    <Conter v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Conter from './conter.vue'
import Collect from './collect.vue'
import Comment from './comment.vue'
import Praise from './praise.vue'
import Forwarding from './forwarding.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
   Conter,
   Collect,
   Comment,
   Praise,
   Forwarding
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  }
})
</script>
