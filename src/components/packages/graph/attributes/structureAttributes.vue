<template>
<div class="node-info" style="height: 650px; overflow-y: auto;">
    <div class="p15">{{node.ftype == undefined ? '未选中节点' : '当前已选中节点'}}</div>
    <!-- 边框样式 -->
      <StyleSetting />

    <!-- 文本样式 -->
    <TextSetting />
    

    <!-- 高级设置 -->
    <HeightSetting />
</div>
</template>

<script setup lang="ts">
import StyleSetting from './components/styleSetting.vue'
import TextSetting from './components/textSetting.vue'
import HeightSetting from './components/heightSetting.vue'
import {
    defineProps
  } from 'vue'
  const {node} = defineProps({
    node: {
      type: Object, 
      default: () => {
        return {}
      }
    }
  })

</script>

<style lang="less" scoped>
/deep/ .collapse{
  background: #383b61;
  .collapse-head{
    background: #424568;
    margin-bottom: 1px;
    padding: 15px;
  }
  .collapse-list{
    background: #383b61;
    padding: 10PX 25px;
  }
}
.node-info {
  background: #383b61;
  width: 300px;
  color: #c6c7e2;
}

.node-info {
  background: #383b61;
  width: 300px;
  color: #c6c7e2;

  .content-editable {
    /* width: calc(100% - 12px); */
    width: 100%;
    box-sizing: content-box;
    min-height: 1em;
    height: auto;
    line-height: 16px;
    text-shadow: none;
    background: 0 0;
    border: 2px solid #4e517a;
    box-shadow: none;
    box-sizing: border-box;
    outline: 0;
    padding: 6px;
    overflow: auto;
  }

  .fill {
    display: inline-block;
    background: #fff;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 6px;
    padding: 0;
  }

  .outline {
    display: inline-block;
    border: 3px solid #fe854f;
    width: 30px;
    height: 30px;
    border-radius: 6px;
    padding: 0;
  }
}
</style>
