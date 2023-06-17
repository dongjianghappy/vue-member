<template>
<div ref="scrollArea" id="scrollArea">
  <ul>
    <li>生存，就是最谨慎的战斗。</li>
    <li>到达胜利之前，无法回头。</li>
    <li>净化的终点是自我毁灭。</li>
    <li>没有永恒的朋友，只有永恒的利益。</li>
    <li>不能击败我的，会让我更强大。</li>
    <li>静如影，疾如风。不动如山，迅烈如火。</li>
    <li>别在来不及的时候后悔。</li>
    <li>最好的剑，永远是下一把。</li>
  </ul>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
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

    /**
     * scrollTop  (滚动的高度既能‘设置'滚动值，也能‘获取'滚动值)
     * clientHeight 元素的像素高度，包含元素的高度+内边距，不包含水平滚动条，边框和外边距
     * scrollHeight 元素内容的高度，包括溢出的不可见内容
     */
    //时间间隔
    const scrollArea: any = ref(null)
    var delay = 50
    //定时器任务
    var handler = function () {
      //向上移动1px
      scrollArea.value.scrollTop = scrollArea.value.scrollTop + 1
      if (Math.ceil(scrollArea.value.clientHeight + scrollArea.value.scrollTop) >= scrollArea.value.scrollHeight) {
        var ulCopy = scrollArea.value.firstElementChild.cloneNode(true)
        scrollArea.value.append(ulCopy)
        //当克隆的ul达到一定数量时，删除第一个ul
        if (document.getElementsByTagName('ul') && document.getElementsByTagName('ul').length >= 3) {
          scrollArea.value.removeChild(scrollArea.value.firstElementChild)
        }
      }
    }
    //启动定时器
    setInterval(handler, delay)
    return {
      scrollArea
    }
  }
})
</script>

<style scoped>
#scrollArea {
  width: 100%;
  height: 40px;
  overflow: hidden
}
</style>
