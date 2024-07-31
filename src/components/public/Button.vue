<template>
<span @click.stop="handleClick" class="pointer" :class="{'set-gray': !disabled}" v-if="buttonType === 'text'">
  <slot>按钮</slot>
</span>
<button @click="handleClick" :disabled="!disabled" class="btn btn-default" :class="{'set-gray': !disabled}" :style="style" v-else>
  <slot>按钮</slot>
</button>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits
} from 'vue'

const props: any = defineProps({
  disabled: {
    type: Boolean,
    default: true
  },
  buttonType: {
    type: String,
    default: "text"
  },
  show: {
    type: Boolean,
    default: false
  }
})
const emit: any = defineEmits(['update:show', 'onClick'])

function handleClick() {
  emit('onClick')
  emit('update:show', !props.show)
}
</script>
