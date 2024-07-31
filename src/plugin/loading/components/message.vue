<template>
  <div id="animation" class="tips layer-wrap"
       style="z-index: 1111111111111">{{msg}}</div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
export default defineComponent({
  name: "MymodalD",
  setup(props,context) {
    function message (){
      setTimeout(()=>{
        document.querySelectorAll("#screens")[0].remove()
      },1000)
    }
    return {
      message
    }
  }
})
</script>


<style scoped>
#animation {
-webkit-animation:pulse 1s .2s ease both;
-moz-animation:pulse 1s .2s ease both;
}
@-webkit-keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
@keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
</style>