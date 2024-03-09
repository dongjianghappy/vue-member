<template>
<!-- 最新站点 -->
<div class="module-wrap mb15" style="height: 630px">
  <div class="module-head p15"><h3 class="nobold">最新问题</h3></div>
  <div class="module-content p10 pt15 pb15">
    <ul>
      <div class="notes-list relative">
        <div class="notes-content p0">
          <li class="item-thum-wrap">
            <div class="pb5 font12">2023年12月1日</div>
            <div class="item-title">
              <a
                href="{$sm_jianzhan[l].html}"
                title="{$sm_jianzhan[l].title}"
                target="_blank"
                class="nowrap p0"
                >标题</a
              >
            </div>
            <div class="item-thum mt10">
              <div class="thum-wrap p0">
                <div class="content">
                  <p class="multiple-wrap-2">内容</p>
                </div>
              </div>
            </div>
          </li>
        </div>
      </div>
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
