<template>
  <div><span class="page">
      <li><a href="/admincms/?system=source&amp;mod=list&amp;item=artlist&amp;channel_id=3&amp;current=template&amp;page=4"
           class="deg180 "><i class="iconfont icon-arrow"></i></a></li>
      <li><a href="/admincms/?system=source&amp;mod=list&amp;item=artlist&amp;channel_id=3&amp;current=template&amp;page=1">1...</a></li>
      <li class=""><a href="/admincms/?system=source&amp;mod=list&amp;item=artlist&amp;channel_id=3&amp;current=template&amp;page=3">3</a></li>
      <li class=""><a href="/admincms/?system=source&amp;mod=list&amp;item=artlist&amp;channel_id=3&amp;current=template&amp;page=4">4</a></li>
      <li class="current"><a href="/admincms/?system=source&amp;mod=list&amp;item=artlist&amp;channel_id=3&amp;current=template&amp;page=5">5</a></li>
      <li class=""><a href="/admincms/?system=source&amp;mod=list&amp;item=artlist&amp;channel_id=3&amp;current=template&amp;page=6">6</a></li>
      <li class=""><a href="/admincms/?system=source&amp;mod=list&amp;item=artlist&amp;channel_id=3&amp;current=template&amp;page=7">7</a></li>
      <li><a href="/admincms/?system=source&amp;mod=list&amp;item=artlist&amp;channel_id=3&amp;current=template&amp;page=680">...680</a></li>
      <li class="p10">每页显示25条，共680页 16978条</li>
      <li><a href="/admincms/?system=source&amp;mod=list&amp;item=artlist&amp;channel_id=3&amp;current=template&amp;page=6"><i class="iconfont icon-arrow"></i></a></li>
    </span></div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

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
