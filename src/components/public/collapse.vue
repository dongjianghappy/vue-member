<template>
<div class="collapse">
  <div class="collapse-head ptb10" @click="handleClick">
    <span :class="{ 'deg90': collapse}" style="display: inline-block;"><i class="iconfont icon-arrow arrow "></i></span>
    <span>{{title}}</span>
    <span class="right align_right">
      <slot name="extra"></slot>
    </span>
  </div>
  <div class="collapse-list p15" v-show="collapse">
    <slot></slot>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from '@/utils'

export default defineComponent({
  name: 'v-Collapse',
  props: {
    title: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:index'],
  setup(props, context) {
    let collapse: any = ref(true)

    function handleClick(params: any) {
      if (props.disabled) {
        return
      }
      collapse.value = !collapse.value
    }
    return {
      handleClick,
      collapse
    }
  }
})
</script>
