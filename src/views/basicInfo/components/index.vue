<template>
  <div class="mb25">
    <Basic v-if="type==='basic'" />
    <Hobby v-else-if="type==='hobby'" />
    <Blog v-else-if="type==='blog'" />
    <Password v-else-if="type==='password'" />
    <Email v-else-if="type==='email'" />
    <Safe v-else-if="type==='safe'" />
    <Sign v-else-if="type==='sign'" />
    <Integration v-else-if="type==='integration'" />
    <Goldcoin v-else-if="type==='goldcoin'" />
    <Medal v-else-if="type==='medal'" />
    <Photos v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Photos from '../photos/index.vue'
import Basic from '../info/index.vue'
import Hobby from '../hobby/index.vue'
import Blog from '../blog/index.vue'
import Password from '../password/index.vue'
import Email from '../email/index.vue'
import Safe from '../safe/index.vue'
import Sign from '../sign/index.vue'
import Integration from '../integration/index.vue'
import Goldcoin from '../goldcoin/index.vue'
import Medal from '../medal/index.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
   Photos,
   Basic,
   Hobby,
   Blog,
   Password,
   Email,
   Safe,
   Sign,
   Integration,
   Goldcoin,
   Medal
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  }
})
</script>
