<template>
<ul class="clearfix">
  <li style="padding: 10px">
    <div class="rect" draggable="true" @dragstart="(e, fType, text)=>dragstart(e, 'rect', '矩形')">矩形</div>
  </li>
  <li style="padding: 10px">
    <div class="round" draggable="true" @dragstart="(e, fType, text)=>dragstart(e, 'start', '圆形')">圆形</div>
  </li>
</ul>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'
export default defineComponent({
  name: "MymodalD",
  setup(props, context) {

    function dragstart(e: any, fType: any, text: any) {
      e.dataTransfer.setData('ftype', fType)
      e.dataTransfer.setData('text', text)
      e.dataTransfer.setData('offsetX', e.offsetX)
      e.dataTransfer.setData('offsetY', e.offsetY)
    }

    return {
      dragstart
    }
  }
})
</script>

<style lang="less" scoped>
.rect {
  border: 2px solid #31d0c6;
  border-radius: 3px;
  width: 100px;
  height: 50px;
  line-height: 50px;
  cursor: move;
  text-align: center;
}

.diamond {
  width: 200px;
  height: 200px;
  background-color: red;
  transform: rotate(45deg);
  margin: 100px auto;
}

.round {
  border: 2px solid #31d0c6;
  border-radius: 30px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  cursor: move;
  text-align: center;
}
</style>
