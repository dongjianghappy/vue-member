<template>
<div class="collapse">
  <div class="collapse-head ptb10" @click="handleClick">
    <span :class="{ 'deg90': collapse}" style="display: inline-block;" v-if="hasIcon"><i class="iconfont icon-arrow arrow "></i></span>
    <span>{{title}}</span>
    <span class="align_left">
      <slot name="extra_left"></slot>
    </span>
    <span class="right align_right">
      <slot name="extra"></slot>
    </span>
  </div>
  <div class="collapse-list" v-show="collapse">
    <slot></slot>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  ref
} from '@/utils'

const props: any = defineProps({
  title: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: false
  },
  hasIcon: {
    type: Boolean,
    default: true 
  }
})

const emit: any = defineEmits(['onClick'])
let collapse: any = ref(true)

function handleClick(params: any) {
  if (props.disabled) {
    return
  }
  collapse.value = !collapse.value
  if (collapse.value) {
    emit('onClick')
  }
}
</script>
