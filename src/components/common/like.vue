<template>
  <span class="pointer block"
        @click="handleclick({ api: 'Praise', data: { coding: data.coding4, artid: data.id }})">
    <i class="iconfont icon-like absolute"
       v-if="isClick"
       style="top:-20px;right: 85px;"
       :style="style" />
    <i class="iconfont icon-like"
       :class="{current: data.haspraise === 1}">
      <span class="font12">点赞 {{data.praise}}</span>
    </i>
  </span>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, computed } from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
  name: 'v-Like',
  props: {
    data: {
      type: Object,
      default: () => {return{}}
    }
  },
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const style: any = ref({})
    const isClick = ref(false)
    
    function handleclick(param: any){
      
      store.dispatch('common/Fetch', param).then(res => {
        props.data.haspraise = res.result.num
        if(res.result.num === 1){
          isClick.value = true
          debugger
          props.data.praise = parseInt(props.data.praise)+1
          style.value = {display: 'block'}
          setTimeout(()=>{
              style.value = {top: '-100px', opacity: 0,  transition: 'all 1s ease', fontSize: '48px', color: '#eb7350'}
          },100)
        }else{
          props.data.praise = parseInt(props.data.praise)-1
          style.value = {top: '-20px', opacity: 1, display: 'none'}
        }
      })
    }
    return {
      handleclick,
      style,
      isClick
    }
  }
})
</script>
<style scoped>
.current{
  color: #eb7350;
}
</style>

