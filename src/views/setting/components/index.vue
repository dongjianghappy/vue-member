<template>
  <div>
    <Setting v-if="type==='setting'" />
    <Privacy v-else-if="type==='privacy'" />
    <Message v-else-if="type==='message'" />
    <Sign v-else-if="type==='sign'" />
    <Medal v-else-if="type==='medal'" />
    <Card v-else-if="type==='card'" />
    <Order v-else-if="type==='order'" />
    <Safe v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Setting from './setting.vue'
import Privacy from './privacy.vue'
import Message from './message.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
   Setting,
   Privacy,
   Message
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  }
})
</script>
