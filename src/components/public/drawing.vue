<template>
<span @click="handleClick" class="pointer">
  <slot>按钮</slot>
</span>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits
} from 'vue'
import html2canvas from 'html2canvas'
const props: any = defineProps({
  querySelector: {
    type: String,
    default: ""
  },
  show: {
    type: Boolean,
    default: false
  }
})
const emit: any = defineEmits(['update:show'])

function handleClick() {
  const dom: any = document.getElementById(props.querySelector)
  html2canvas(dom).then(canvas => {
    let link = document.createElement('a');
    link.download = '123.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  });
  emit('update:show', !props.show)
}
</script>
