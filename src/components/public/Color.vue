<template>
<div class="color-list color-wrap" style="height: 30px;">
  <input field="color" type="hidden" value="blue">
  <a class="color p5" :class="col" @click="handleclick(item.value)" v-for="(item, index) in colorList" :key="index">
    <div class="cl" :class="{'bg-eee': color.indexOf(item.value) > -1}">
      <template v-if="color.indexOf(item.value) > -1">
        <i class="iconfont icon-dagou cl-white" v-if="item.value !== 'white'" style="z-index: 1000"></i>
        <i class="iconfont icon-dagou cl-333" v-else style="z-index: 1000"></i>
      </template>
      <i class="size-32-24" :class="item.value" style="border: 1px solid #eee;"></i>{{item.name}}
    </div>
  </a>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'
import {
  COLOR
} from '@/assets/common_const'
export default defineComponent({
  name: 'v-Color',
  components: {

  },
  props: {
    color: {
      type: Array,
      default: []
    },
    col: {
      String,
      default: 'col-md-3'
    }
  },
  emits: ['update:color'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const colorList = COLOR

    function handleclick(param: any) {
      debugger
      if (props.color.indexOf(param) > -1) {
        let index = props.color.indexOf(param)
        props.color.splice(index, 1)
      } else {
        props.color.push(param)
      }
      context.emit('update:color', props.color)
    }
    return {
      colorList,
      handleclick
    }
  }
})
</script>
