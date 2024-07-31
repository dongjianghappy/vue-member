<template>
<div class="ant-card ant-card-bordered font12 align_center" :class="className">
  <div class="ant-card-body">
    <div class="ant-statistic">
      <div class="ant-statistic-title">
        <i class="iconfont" :class="`icon-${data.icon}`" />
        {{name || data.name}}</div>
      <div class="ant-statistic-content" style="color: rgb(63, 134, 0);">
        {{value}}</div>
    </div>
    <div class="align_right">{{click}}</div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    name: {
      type: String,
      default: ""
    },
    data: {
      type: String,
      default: ""
    },    
    className: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
        click: {
      type: String,
      default: ""
    },
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();

    function handleclick() {
      context.emit('onClick')
    }
    return {
      handleclick
    }
  }
})
</script>
