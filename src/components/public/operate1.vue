<template>
  <div>
    <div class="absolute"
         style="background: rgba(0,0,0,.3); top: 15px; left: 30px; 
    border-radius: 30px;
width: 35px; height: 35px;"
         @click="close"><i class="iconfont icon-close" /></div>
    <div class="absolute deg180"
         style="background: rgba(0,0,0,.3); top: 50%; left: 30px; 
    border-radius: 30px;
width: 60px; height: 60px;"
         @click="handleclick(-1)"
         v-if="data.num !== 0">

      <i class="iconfont icon-arrow" />
    </div>

    <div class="absolute"
         style="background: rgba(0,0,0,.3); top: 50%; right: 30px; 
    border-radius: 30px;
 width: 60px; height: 60px;"
         @click="handleclick(1)"
         v-if="data.total !== data.num">

      <i class="iconfont icon-arrow" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
   props: {
    data: {
      type: Array,
      default: ()=>{return []}
    },
    img: {
      type: String,
      default: ""
    },
    isShow: Boolean // 以前是`value：String`
  },
  emits: ['onClick', 'close'],
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();

    function handleclick(num: number){
      context.emit('onClick', num)
    }
    function close(num: number){
      context.emit('close', num)
    }    
    return {
      handleclick,
      close
    }
  }
})
</script>
