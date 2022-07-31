<template>
<span v-if="buttonType === 'text'" @click="handleclick" class="pointer" :class="{'set-gray': !disabled}">
  <slot>按钮</slot>
</span>
<button v-else @click="handleclick" :disabled="!disabled" class="btn btn-default" :class="{'set-gray': !disabled}" :style="style">
  <slot>按钮</slot>
</button>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    // 展示状态: 用于弹窗和抽提框
    show: {
      type: Boolean,
      default: false
    },
    // 可点击状态
    disabled: {
      type: Boolean,
      default: true
    },
    // 按钮类型: text为文本类型，button为按钮类型
    buttonType: {
      type: String,
      default: "text"
    }
  },
  emits: ['update:show', 'onClick'],
  setup(props, context) {

    // 按钮消息发送两种方式: 1、点击事件监听，2、点击响应式切换
    function handleclick() {
      context.emit('onClick')
      context.emit('update:show', !props.show)
    }
    return {
      handleclick
    }
  }
})
</script>
