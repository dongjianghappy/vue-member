<template>
  <div class="align_center"
       style="padding-top: 150px; height: 480px;">{{trip}}</div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    trip: {
      type: String,
      defualt: "暂时没有数据"
    }
  },
  emits: ['onClick'],
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();

    function handleclick(){
      context.emit('onClick')
    }
    return {
      handleclick
    }
  }
})
</script>
