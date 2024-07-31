<template>
<span style="color: #eee">
  <i class="iconfont icon-list pointer" @click="handelClick('list')" v-if="toggle === 'album'"></i>
  <i class="iconfont icon-app pointer" @click="handelClick('album')" v-else></i>
</span>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits
} from 'vue'
const props: any = defineProps({
  toggle: {
    type: String,
    default: 'list'
  }
})
const emit: any = defineEmits(['update:toggle'])

function handelClick(param: any) {
  emit('update:toggle', param)
}
</script>
