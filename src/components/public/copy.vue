<template>
<i class="iconfont icon-copy" title="复制" @click="handleCopy($event, data)"></i>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'

export default defineComponent({
  name: 'v-Button',
  props: {
    data: {
      type: String,
      default: ""
    }
  },
  emits: ['update:show', 'onClick'],
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();

    // 复制图片
    function handleCopy(e: any, param: any) {
      if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard 向剪贴板写文本
        proxy.$hlj.message({
          msg: "复制成功"
        })
        return navigator.clipboard.writeText(param)
      } else {
        let copy = e.target
        let divParent = copy.parentNode; //获取该div的父节点
        let input = document.createElement('input');
        divParent.insertBefore(input, copy);
        input.focus();
        input.select();
        if (document.execCommand('copy')) {
          document.execCommand('copy');
        }
        input.blur();
        proxy.$hlj.message({
          msg: "复制成功"
        })
        input.remove();
      }

    }
    return {
      handleCopy
    }
  }
})
</script>
