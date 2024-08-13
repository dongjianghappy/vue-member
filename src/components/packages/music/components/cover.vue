<template>
<div class="cover inline animate animate-paused" :class="{'animate-running': data.isplay}">
  <v-img src="http://localhost/source/public/images/music.png" />
</div>
</template>

<script setup lang="ts">
import {
  defineProps
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>
