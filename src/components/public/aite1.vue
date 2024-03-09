<template>
<div class="bg-white mtb5 p5 absolute" style="width: 350px; height: 100px; border-radius: 4px; transition: all 0.3s;" :style="style">
  {{user}}
  <div class="align_center" style="width: 50px;" @click="handleClick('@东江哥')">
  <img src="http://www.yunxi10.com/source/public/images/head_normal_100.png" onerror="this.src='http://www.yunxi10.com/source/public/images/head_normal_100.png'" class="photos p5" style="width: 50px; height: 50px; border-radius: 50%;">
  <div>东江哥</div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent, ref,
} from 'vue'

export default defineComponent({
  name: 'v-Button',
  props: {
    style: {
      type: Object,
      default: () => {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: true
    },
    buttonType: {
      type: String,
      default: "text"
    },
    user: {
      type: String,
      default: ""
    }
  },
  emits: ['update:user', 'onClick'],
  setup(props, context) {
    // 按钮消息发送两种方式: 1、点击事件监听，2、点击响应式切换
    function handleClick(param: any) {
      context.emit('onClick', param)
      context.emit('update:user', !props.user)
    }
    return {
      handleClick
    }
  }
})
</script>
