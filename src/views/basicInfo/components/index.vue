<template>
  <div class="mb25">
    <Setting v-if="type==='setting'" />
    <Basic v-else-if="type==='basic'" />
    <Hobby v-else-if="type==='hobby'" />
    <Blog v-else-if="type==='blog'" />
    <Password v-else-if="type==='password'" />
    <Email v-else-if="type==='email'" />
    <Photos v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Setting from '../setting/index.vue'
import Photos from '../photos/index.vue'
import Basic from '../info/index.vue'
import Hobby from './hobby.vue'
import Blog from '../blog/index.vue'
import Password from '../password/index.vue'
import Email from './email.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
   Setting,
   Photos,
   Basic,
   Hobby,
   Blog,
   Password,
   Email
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  }
})
</script>
