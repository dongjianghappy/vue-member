<template>
<div class="mask" @click="handleClick"></div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'v-Mask',
  props: {
    isShow: {
      type: String,
      default: false
    }
  },
  emits: ['update:isShow'],
  setup(props, context) {
    function handleClick() {
      context.emit('update:isShow', !props.isShow)
    }
    return {
      handleClick
    }
  }
})
</script>
