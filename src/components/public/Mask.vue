<template>
<div class="mask" @click="handleClick"></div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits
} from 'vue'

const props: any = defineProps({
  isShow: {
    type: String,
    default: false
  }
})
const emit: any = defineEmits(['update:isShow'])

function handleClick() {
  emit('update:isShow', !props.isShow)
}
</script>
