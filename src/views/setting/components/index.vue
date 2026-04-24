<template>
<div>
  <Setting v-if="type==='setting'" />
  <Privacy v-else-if="type==='privacy'" />
  <Message v-else-if="type==='message'" />
  <Auth v-else-if="type==='auth'" />
</div>
</template>

<script setup lang="ts">
import Setting from './setting.vue'
import Privacy from './privacy.vue'
import Message from './message.vue'
import Auth from './auth.vue'

const props: any = defineProps({
  type: {
    type: String,
    defult: "index"
  }
})
</script>
