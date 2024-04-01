<template>
  <div class="flex">
    <div style="padding-top: 35px; width: 30px"
         @click="toggle(-1)">
      <div class="deg180"
           style="width: 30px; height: auto"><i class="iconfont icon-arrow"
           style="font-size: 24px !important;" />
      </div>
    </div>
    <div class="relative"
         style="flex: 1; height: 140px; overflow: hidden;">
      <div class="absolute slider"
           style="height: 140px; transition: all 0.3s;"
           :style="{width: `${202.5*dataList.length}px`}">
        <div class="p10 left"
             style="width: 202.5px"
             v-for="(item, index) in dataList"
             :key="index">
          <div class="p15 align_center h80"
               :class="{'slider-current': currentIndex == index}"
               @click="handleClick(item, index)"
               style=" background: var(--card-background); border-radius: 8px;">
          </div>
          <div class="ptb10 font6">
            {{item.name}}
          </div>
        </div>
      </div>
    </div>
    <div style="padding-top: 35px; width: 30px"
         @click="toggle(1)">
      <div style="width: 30px; height: auto">
        <i class="iconfont icon-arrow"
           style="font-size: 24px !important;" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from 'vue'

export default defineComponent({
  name: 'v-Button',
  props: {
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  emits: ['onClick'],
  setup(props, context) {
    let index: any = ref(0) //播放指针
    let currentIndex: any = ref(0)

    function handleClick(param: any, index: any) {
      currentIndex.value = index
      context.emit('onClick', param)
    }

    // 图片预览
    function toggle(num: any) {
      let slider: any = document.getElementsByClassName('slider')
      debugger
      if((num == '-1' && index.value == '0') || (num == '1' && index.value == props.dataList.length - 5)){
        return
      }
      index.value = index.value + num
      debugger
      slider[0].style.left = `-${index.value*202.5*4}px`
    }
    return {
      currentIndex,
      handleClick,
      toggle
    }
  }
})
</script>

<style scoped>
.slider-current{
  border: 1px solid var(--color-primary);;
}
</style>