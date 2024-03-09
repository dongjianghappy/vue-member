<template>
<div ref="chat" id="chat" style="position: fixed; right: 50px; bottom: 50px; z-index: 1000000;">
  <div class="bubble-wrap bubble-right">
    <div class="bubble-1">{{userInfo.nickname}}你好</div>
    <div class="arrow arrow-right"></div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
} from 'vue'
import VueEvent from '@/utils/event'
import { useStore } from 'vuex'
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
    const store = useStore()
    const chat: any = ref(null)
    let isDrag: any = ref(false)
    const userInfo: any = computed(() => store.getters['user/userInfo']);

    // 按钮消息发送两种方式: 1、点击事件监听，2、点击响应式切换
    function handleClick() {
      
    }

    // onMounted(() => {
    //   let el: any = document.getElementById('chat')
    //   el.addEventListener('mousedown', (ev: any) => {
    //     isDrag.value = true
    //     ev.preventDefault()
    //     let oevent = ev || event
    //     let distanceX = oevent.clientX //鼠标点击位置
    //     let distanceY = oevent.clientY //鼠标点击位置

    //     document.onmousemove = function (e: any) {

    //       if (!isDrag.value) {
    //         return
    //       }

    //       el.style.top = e.clientY - ev.layerY + "px"
    //       el.style.left = e.clientX - ev.layerX + "px"
    //     }
    //   })

    //   el.addEventListener('mouseup', (ev: any) => {
    //     isDrag.value = false

    //   })
    // })

    return {
      // handleClick,
      chat,
      userInfo
    }
  }
})
</script>
