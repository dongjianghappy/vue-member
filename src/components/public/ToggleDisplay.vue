<template>
<span style="color: #eee">
  <i class="iconfont icon-list pointer" @click="handelClick('list')" v-if="toggle === 'album'"></i>
  <i class="iconfont icon-app pointer" @click="handelClick('album')" v-else></i>
</span>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue'

export default defineComponent({
  name: 'v-ToggleDisplay',
  props: {
    toggle: {
      type: String,
      default: 'list'
    }
  },
  emits: ['update:toggle'],
  setup(props, context) {
    function handelClick(param: any) {
      context.emit('update:toggle', param)
    }
    return {
      handelClick
    }
  }
})
</script>
