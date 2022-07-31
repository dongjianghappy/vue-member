<template>
  <span style="color: #eee"><i class="iconfont icon-list pointer" @click="handelClick('list')"></i>|<i class="iconfont icon-app pointer" @click="handelClick('album')"></i></span>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    // 名称
    name: {
      type: String,
      default: "按钮"
    },
    // 是否展示
    show: {
      type: Boolean,
      default: false
    },
    // 是否展示
    disabled: {
      type: Boolean,
      default: false
    },    
    // 按钮类型
    buttonType: {
      type: String,
      default: "text"
    }    
  },
  emits: ['update:toggle'],
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();

    function handelClick(param: any){
      context.emit('update:toggle', param)
    }
    return {
      handelClick
    }
  }
})
</script>
