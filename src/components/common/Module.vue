<template>
  <div class="module-wrap">
    <div class="module-head">
      {{title}}
    </div>
    <div class="module-content p10">
      <slot>暂无内容</slot>
    </div>
    <div class="module-foot"
         v-if="hasFooter">查看更多</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@/utils'

export default defineComponent({
  name: 'v-Module',
  props: {
    title: {
      type: String,
      defualt: "标题"
    },
    class: {
      type: String,
      defualt: ""
    },
    hasFooter: {
      type: Boolean,
      default: true

    }
  }
})
</script>
