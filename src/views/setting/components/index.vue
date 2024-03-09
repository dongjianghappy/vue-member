<template>
  <div>
    <Integration v-if="type==='integration'" />
    <Goldcoin v-else-if="type==='goldcoin'" />
    <Sign v-else-if="type==='sign'" />
    <Medal v-else-if="type==='medal'" />
    <Card v-else-if="type==='card'" />
    <Order v-else-if="type==='order'" />
    <Safe v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Safe from './safe.vue'
import Integration from './integration.vue'
import Goldcoin from './goldcoin.vue'
import Sign from './sign.vue'
import Medal from './medal.vue'
import Card from './card.vue'
import Order from './order.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
   Safe,
   Integration,
   Goldcoin,
   Sign,
   Medal,
   Card,
   Order,
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  }
})
</script>
