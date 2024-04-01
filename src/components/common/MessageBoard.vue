<template>
<div id="message-board" class="pointer" style="position: fixed; left: 50px; bottom: 50px; z-index: 10;animation: pulse ease-in-out 1s infinite;">
  <span @click="handleClick"><i class="iconfont icon-talk font16 m0" />
  在线留言
  </span>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
} from 'vue'
import VueEvent from '@/utils/event'
import { useRouter } from 'vue-router'
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
    const router = useRouter()
    const chat: any = ref(null)
    let isDrag: any = ref(false)

    // 按钮消息发送两种方式: 1、点击事件监听，2、点击响应式切换
    function handleClick() {
      router.push(`/message_board`)
    }

    onMounted(() => {
      let el: any = document.getElementById('message-board')
      if(!el){
        return
      }
      el.addEventListener('mousedown', (ev: any) => {
        isDrag.value = true
        ev.preventDefault()
        let oevent = ev || event
        let distanceX = oevent.clientX //鼠标点击位置
        let distanceY = oevent.clientY //鼠标点击位置

        document.onmousemove = function (e: any) {

          if (!isDrag.value) {
            return
          }

          el.style.top = e.clientY - ev.layerY + "px"
          el.style.left = e.clientX - ev.layerX + "px"
        }
      })

      el.addEventListener('mouseup', (ev: any) => {
        isDrag.value = false

      })
    })

    return {
      handleClick,
      chat
    }
  }
})
</script>
