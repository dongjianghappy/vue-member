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
            <span class="right" v-if="isCurrentUser && item.id != '0' && item.id != '-1'"><v-visible v-model:visible="item.visible" @onclick="handleSetting($event, item)" /></span>
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
  ref,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Button',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },
    isCurrentUser: {
      type: Boolean,
      default: false
    }
  },
  emits: ['onClick'],
  setup(props, context) {
    const store = useStore()
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

    function handleSetting(data: any, param: any){
      store.dispatch('common/Fetch', {
        api: 'Update',
        data: {
          coding: props.data.coding,
          id: param.id,
          visible: data
        }
      })
    }
    return {
      currentIndex,
      handleClick,
      toggle,
      handleSetting
    }
  }
})
</script>

<style scoped>
.slider-current{
  border: 1px solid var(--color-primary);;
}
</style>