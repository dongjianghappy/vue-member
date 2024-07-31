<template>
<div>
  <Setting v-if="type==='setting'" />
  <Privacy v-else-if="type==='privacy'" />
  <Message v-else-if="type==='message'" />
</div>
</template>

<script setup lang="ts">
import Setting from './setting.vue'
import Privacy from './privacy.vue'
import Message from './message.vue'

const props: any = defineProps({
  type: {
    type: String,
    defult: "index"
  }
})
</script>
