<template>
<span @click="handleclick" class="pointer">
  <slot>按钮</slot>
</span>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue'
import html2canvas from 'html2canvas'
export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    querySelector: {
      type: String,
      default: ""
    },
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
      const dom: any = document.getElementById(props.querySelector)
debugger
      html2canvas(dom).then(canvas => {
       let link = document.createElement('a');
        link.download = '123.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
      });

      // 这里是流程图截图
      // // 按钮消息发送两种方式: 1、点击事件监听，2、点击响应式切换
      // function handleclick() {
      //   let paper: any = {
      //     svg: ''
      //   }

      //   const dom: any = document.getElementById(props.querySelector)

      //   let serialier = new XMLSerializer()
      //   let source = serialier.serializeToString(dom);
      //   let image = new Image()
      //   image.src = 'data:image/svg+html;charset=utf-8' + encodeURIComponent(source)
      //   // image.src = 'data:image/svg+html;charset=utf-8' + encodeURIComponent(source)
      //   image.onload = function () {
      //     const num = 2
      //     const canvas = document.createElement('canvas');
      //     canvas.width = 500;
      //     canvas.height = 500
      //     const context: any = canvas.getContext('2d');
      //     context.scale(num, num);
      //     context.drawImage(image, 0, 0, canvas.width, canvas.height);
      //     canvas.toBlob((Blob: any) => {
      //       let link = document.createElement('a');
      //       link.download = '123.png'
      //       link.click()
      //     }, 'image/png', 1)
      //     // let link = document.createElement('a');
      //     // link.download = '123.png'
      //     // link.href = canvas.toDataURL('image/png')
      //     // link.click()
      //   }
      context.emit('update:show', !props.show)
    }
    return {
      handleclick
    }
  }
})
</script>
