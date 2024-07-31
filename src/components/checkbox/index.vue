<template>
  <div>
    <!-- <slot></slot> -->
    <Checkbox @onEmoji="pushItemsss"></Checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted } from 'vue'
import Checkbox from './checkbox.vue'

export default defineComponent({
  name: 'v-Search',
  components: {
Checkbox
  },

  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
  
    function pushItemsss(){
      
    }
    return {
      pushItemsss
    }
  }
})
</script>
