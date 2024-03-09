<template>
<div class="module-wrap mtb15" style="box-shadow: 0px 3px 5px #eee;">
    <div class="module-head p15"><h3 class="nobold font18">最近解答</h3></div>
    <div class="module-content p15">
        <ul>
        	{section name=l loop=$sm_recently_answer}
            <li class="list mb15 ptb5 relative" style="line-height: 25px;">
                <div><a href="/{$sm_recently_answer[l].account}/home" target="_blank" class="p0 left" rel="nofollow" style="color:#2494a2;">@{$sm_recently_answer[l].nickname}</a>回答了： <a href="{$sm_recently_answer[l].url}" style="display:inline; white-space: normal;" target="_blank">{$sm_recently_answer[l].title}...</a></div>
            </li>
            {/section}
        </ul>
    </div>
</div>

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
