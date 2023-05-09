<template>
<span @click="handleClick" class="pointer">
  <slot>按钮</slot>
</span>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue'
import html2canvas from 'html2canvas'
export default defineComponent({
  name: 'v-Drawing',
  props: {
    querySelector: {
      type: String,
      default: ""
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:show'],
  setup(props, context) {

    function handleClick() {
      const dom: any = document.getElementById(props.querySelector)
      html2canvas(dom).then(canvas => {
        let link = document.createElement('a');
        link.download = '123.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
      });
      context.emit('update:show', !props.show)
    }
    return {
      handleClick
    }
  }
})
</script>
