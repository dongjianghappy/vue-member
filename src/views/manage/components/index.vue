<template>
  <div>
    <Basic v-if="type==='basic'" />
    <Hobby v-else-if="type==='hobby'" />
    <Blog v-else-if="type==='blog'" />
    <Password v-else-if="type==='password'" />
    <Email v-else-if="type==='email'" />
    <Photos v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Photos from './photos.vue'
import Basic from './basic.vue'
import Hobby from './hobby.vue'
import Blog from './blog.vue'
import Password from './password.vue'
import Email from './email.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
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
