<template>
<div class="ptb20" style="border-bottom: 1px dotted #ddd;">
  <span class="operating f-fr font14 cl-ccc">
    <a class="cl-999">全部</a> |
    <a class="cl-999">含图片</a> |
    <a class="cl-999">含视频</a>
  </span>
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
    style: {
      type: Object,
      defualt: () => {
        return {}
      }
    }
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
