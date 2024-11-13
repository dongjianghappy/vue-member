<template>
  <div class="console-wrap">
    <div class="module-wrap nobg">
      <div class="module-head bd-0 p0"> 坐标信息 </div>
      <div class="module-content">
        <div class="mb5">x坐标：<span class="position-x"></span></div>
        <div class="mb5">y坐标：<span class="position-y"></span></div>
        <div>z坐标：<span class="position-z"></span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  ref,
  computed,
  useStore
} from '@/utils'
import AddCar from './addCar.vue'
import { closeUpAnimate } from '../utils/car'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const store = useStore()
const carList: any = computed(() => store.getters['three/carList']);
const currentCar: any = computed(() => store.getters['three/currentCar']);

// 行驶
function handleRun(param: any){
  if(param.isHand){
    return
  }
  param.isRun = !param.isRun
}

// 自动或手动
function handleHand(param: any, index: any){
  for(let i = 0; i < carList.value.length; i++){
    if(i !== index){
      carList.value[i].isHand = false
    }else{
      carList.value[i].isHand = !carList.value[i].isHand
      carList.value[i].isRun = false
    }
  }
  store.commit('three/setCurrentCar', param)
}

// 特写
function handleCloseUp(param: any, index: any){
  for(let i = 0; i < carList.value.length; i++){
    if(i !== index){
      carList.value[i].closeUp = false
    }else{
      carList.value[i].closeUp = true
      if(!carList.value[i].modelType){
        carList.value[i].modelType = 'default'
      }
    }
  }
  store.commit('three/setCurrentCar', param)

  const { camera } = props.data
  closeUpAnimate({...props.data, obj: {
    start: { x: parseInt(camera.position.x), y: parseInt(camera.position.y), z: parseInt(camera.position.z) },
    end: { x: parseInt('0'), y: parseInt('25'), z: parseInt('56') }
  }})
}

// 传送
function handleSend(param: any){
  param.isSend = true
  param.isHand = false
  param.isRun = false
}

// 移除
function handleRemove(param: any, index: any){
  carList.value.splice(index, 1)
  props.data.scene.children = props.data.scene.children.filter((item: any) => item.uuid !== param.uuid)
}
</script>

<style lang="less" scoped>
.console-wrap{
  background: rgba(0, 0, 0, 0.45);
  position: fixed;
  right: 0;
  bottom: 155px;
  padding: 10px;
  width: 250px;
  height: 150px;
  color: #fff;
  z-index: 100;
  .car-list{
    display: flex;
    .cell{
      flex: 1;
      &.close-up{
        color: #f00;
      }
    }
  }
}
</style>