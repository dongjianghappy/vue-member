<template>
<span @click.stop="handleClick" class="pointer" :class="{'set-gray': !disabled}" v-if="buttonType === 'text'">
  <slot>按钮</slot>
</span>
<button @click="handleClick" :disabled="!disabled" class="btn btn-default" :class="{'set-gray': !disabled}" :style="style" v-else>
  <slot>按钮</slot>
</button>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue'

export default defineComponent({
  name: 'v-Button',
  props: {
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
  },
  emits: ['update:show', 'onClick'],
  setup(props, context) {
    // 按钮消息发送两种方式: 1、点击事件监听，2、点击响应式切换
    function handleClick() {
      context.emit('onClick')
      context.emit('update:show', !props.show)
    }
    return {
      handleClick
    }
  }
})
</script>
