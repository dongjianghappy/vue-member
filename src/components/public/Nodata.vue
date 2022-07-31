<template>
<div class="bg-white align_center font14 mb25" style="height: 500px; line-height: 120px" v-if="data && data.length === 0">{{trip}}</div>
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
    data: {
      type: Array,
      default: []
    },
    trip: {
      type: String,
      default: "暂时没有数据"
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
