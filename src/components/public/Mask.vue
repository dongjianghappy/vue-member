<template>
<div class="mask" @click="handleclick">
    <slot></slot>
    </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    isShow: {
      type: String,
      default: false
    }
  },
  emits: ['update:isShow'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();

    function handleclick() {
      context.emit('update:isShow', !props.isShow)
    }
    return {
      handleclick
    }
  }
})
</script>
