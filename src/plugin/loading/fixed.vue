<template>
  <div class="tips layer-wrap"
       style="z-index: 1111111111111">点赞</div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
export default defineComponent({
  name: "MymodalD",
  setup(props,context) {
    function message (){
      setTimeout(()=>{
        document.querySelectorAll("#screens")[0].remove()
      },2000)
    }
    return {
      message
    }
  }
})
</script>
