<template>
  <div class="tips layer-wrap"
       style="z-index: 1111111111111">正在加载中</div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
export default defineComponent({
  name: "MymodalD",
  setup(props,context) {
    let info = ref("")
    function message (){
      console.log("123");
      
    }
    return {
      message,
      info
    }
  }
})
</script>
