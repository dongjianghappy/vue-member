<template>
<v-button v-if="type !== 'text'" @click="handleclick">
  <i class="iconfont icon-chart" style="color: #f67f00;"></i>
</v-button>
</template>

<script lang="ts">
import {
  defineComponent
} from '@/utils'
import VueEvent from '@/utils/event'
export default defineComponent({
  name: 'v-Category',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    function handleclick(param: any) {
      VueEvent.emit("graph", props.data);
    }
    return {
      handleclick
    }
  }
})
</script>
