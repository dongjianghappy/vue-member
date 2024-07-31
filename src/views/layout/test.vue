<template>
  <div>
    <!-- <v-graph /> -->
    <span @click="handleclick">点击</span>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
} from 'vue'

export default defineComponent({
  name: 'v-Search',
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
    const {
      proxy
    }: any = getCurrentInstance();

    // 按钮消息发送两种方式: 1、点击事件监听，2、点击响应式切换
    function handleclick() {
      proxy.$hlj.message({
            type: 'info',
            msg: "提示"
          })
      // context.emit('onClick')
      // context.emit('update:show', !props.show)
    }
    return {
      handleclick
    }
  }
})
</script>
