<template>
<div class="gotop-2 hide" style="background: rgba(87, 68, 56, 0.8); width:40px; height:40px; margin-left:550px; display:block; left: 50%; bottom:90px;">
  <ul>
    <li class="gotop deg180" data-placement="top" @click="handleclick"><i class="iconfont icon-down" style="color:#fff !important;"></i></li>
  </ul>
</div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'v-Gotop',
  components: {

  },
  emits: ['onClick'],
  setup(props, context) {
    function handleclick() {
      document.documentElement.scrollTop = 0
    }
    return {
      handleclick
    }
  }
})
</script>
