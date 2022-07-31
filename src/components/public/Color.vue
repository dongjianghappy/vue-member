<template>
<div class="color-list color-wrap" style="height: 30px;">
  <input field="color" type="hidden" value="blue">
  <a class="color" data-color="all"><i class="all" style="border: 1px solid #eee;"></i>全部</a>
  <a class="color" data-color="red"><i class="red" style="border: 1px solid #eee;"></i>红色</a>
  <a class="color" data-color="orange"><i class="orange" style="border: 1px solid #eee;"></i>橙色</a>
  <a class="color" data-color="yellow"><i class="yellow" style="border: 1px solid #eee;"></i>黄色</a>
  <a class="color" data-color="green"><i class="green" style="border: 1px solid #eee;"></i>绿色</a>
  <a class="color" data-color="purple"><i class="purple" style="border: 1px solid #eee;"></i>紫色</a>
  <a class="color" data-color="pink"><i class="pink" style="border: 1px solid #eee;"></i>粉色</a>
  <a class="color" data-color="cyan"><i class="cyan" style="border: 1px solid #eee;"></i>青色</a>
  <a class="color bg-eee" data-color="blue"><i class="blue" style="border: 1px solid #eee;"></i>蓝色</a>
  <a class="color" data-color="brown"><i class="brown" style="border: 1px solid #eee;"></i>棕色</a>
  <a class="color" data-color="white"><i class="white" style="border: 1px solid #eee;"></i>白色</a>
  <a class="color" data-color="black"><i class="black" style="border: 1px solid #eee;"></i>黑色</a>
</div>
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
