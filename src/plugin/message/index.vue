<template>
<div>
  <div class="ant-message-notice ant-move-up-leave ant-move-up-leave-active ant-move-up">
    <div class="ant-message-notice-content">
      <div class="ant-message-custom-content ant-message-info">
          <i class="iconfont icon-right" v-if="type==='success'" />
          <i class="iconfont icon-waring" v-else-if="type==='warning'" />
          <i class="iconfont icon-error" v-else-if="type==='error'" />
          <i class="iconfont icon-info" v-else />
          <span>{{msg}}</span></div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref
} from 'vue'
export default defineComponent({
  name: "MymodalD",
  setup(props, context) {
    function message() {
      setTimeout(() => {
        document.querySelectorAll("#ant-message")[0].remove()
      }, 2000)
    }
    return {
      message
    }
  }
})
</script>
