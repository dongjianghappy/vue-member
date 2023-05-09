<template>
<v-popover content="<i class='iconfont icon-face'></i>" arrow="tb" offset="right" :move="-10" :type="click" keys="popover-face">
  <div style="width: 410px; height: 250px">
    <div class="facebox p10">
      <ul>
        <li v-for="(item, index) in expressionList" :key="index" @click="ChooseEmoji(item.name)"><img :src="require(`../../assets/expression/normal/${item.id}.gif`)"></li>
      </ul>
    </div>
  </div>
</v-popover>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue'
import {
  expression
} from '@/assets/const'
export default defineComponent({
  name: 'v-Expression',
  emits: ['onEmoji'],
  setup(props, context) {
    const expressionList: any = expression;

    function ChooseEmoji(data: any) {
      context.emit('onEmoji', `[${data}]`)
    }
    return {
      ChooseEmoji,
      expressionList
    }
  }
})
</script>

<style lang="less" scoped>
.facebox {
  li {
    padding: 0;
    width: 32px;
    height: 32px;
    line-height: 32px;
    float: left;
    text-align: center;
  }
}
</style>
