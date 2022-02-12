<template>
  <Popover content="<i class='iconfont icon-face'></i>"
           arrow="tb"
           offset="right"
           :move="-10"
           :type="click"
           keys="popover-face">

    <div style="width: 410px; height: 250px">
      <div class="facebox p10">
        <ul>
          <li v-for="(item, index) in expressionList"
              :key="index"
              style="  padding: 0;  width: 32px;
    height: 32px;
    line-height: 32px;
    float: left;
    text-align: center;
"
              @click="ChooseEmoji(item.name)"><img :src="require(`../../assets/expression/normal/${item.id}.gif`)"></li>
        </ul>
      </div>
    </div>
  </Popover>
  <!-- <div id="toolface"
       class="info-box"
       style="top: 165px; left: 0; display: block; width: 450px; height: 350px"><i class="arrow top-arrow-out"
       style="left: 42px;"></i><i class="arrow top-arrow-in"
       style="left: 42px;"></i>
    <div class="popover_wrap">
      <div class="facebox">
        <ul>
          <li v-for="(item, index) in List"
              :key="index"
              style="    width: 32px;
    height: 32px;
    line-height: 32px;
    float: left;
    text-align: center;
"
              @click="ChooseEmoji(item.name)"><img src=""></li>
        </ul>
      </div>
    </div>
  </div> -->
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import Popover from '@/components/packages/popover/index.vue';
import { expression } from '@/assets/const'
export default defineComponent({
  name: 'v-Search',
  components: {
    Popover
  },
  props: {
    move: {
      type: String,
      default: "-10"
    }
  },
  emits: ['onEmoji'],
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const expressionList:any = expression;
    function ChooseEmoji(data: any){
      context.emit('onEmoji', `[${data}]`)
    }
    return {
      ChooseEmoji,
      expressionList
    }
  }
})
</script>
