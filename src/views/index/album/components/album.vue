<template>
<div class="col-md-3 p10" v-for="(item, index) in dataList" :key="index">
  <div class="p15 align_center h80" @click="handleClick(item)" style=" background: var(--card-background); border-radius: 8px;">
  </div>
  <div class="ptb10 font6">
    {{item.name}}
    <span class="right"><v-visible v-model:visible="item.visible" @onclick='handleVisible' /></span>
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
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  emits: ['onClick'],
  setup(props, context) {
    function handleClick(param: any) {
      context.emit('onClick', param)
    }

    function handleVisible(param: any){
      alert(param)
    }
    return {
      handleClick,
      handleVisible
    }
  }
})
</script>
