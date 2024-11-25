<template>
<div class="screen-wrap" :class="displayInfo ? 'screen-open' : 'screen-close'">
  <div class="module-wrap nobg">
    <div class="module-head bd-0 ptb0">
      <span>当前共有{{carList.length}} 辆车</span>
      <span class="right mr10"><AddCar :data="data" /></span>
    </div>
    <div class="module-content car-wrap h100 plr15" style="overflow-y: auto;">
      <div class="car-list" v-for="(item, index) in carList" :key="index">
        <div class="cell">名称</div>
        <div class="cell" @click="handleRun(item)">{{item.userData.roadLine.isRun ? '行驶' : '停止'}}</div>
        <div class="cell" @click="handleHand(item, index)">{{item.isHand ? '手动' : '自动'}}</div>
        <div class="cell" :class="{'close-up': item.closeUp}" @click="handleCloseUp(item, index)">特写</div>
        <div class="cell" @click="handleSend(item)">传送</div>
        <div class="cell" @click="handleRemove(item, index)">移除</div>
      </div>
    </div>
  </div>
  <CarInfo :data="currentCar" />

  <div class="half-circle-top deg180" v-if="!displayInfo" @click="expand" ><i class="iconfont icon-arrow" style="margin: 0 !important" /></div>
  <div class="close" v-if="displayInfo" @click="expand" ><i class="iconfont icon-close" style="margin: 0 !important" /></div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  computed,
  useStore
} from '@/utils'
import AddCar from './addCar.vue'

import CarInfo from './carInfo.vue'
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
const displayInfo: any = ref(false)
const carList: any = computed(() => store.getters['three/carList']);
const currentCar: any = computed(() => store.getters['three/currentCar']);

function expand() {
  displayInfo.value = !displayInfo.value
}

// 行驶
function handleRun(param: any){
  if(param.isHand){
    return
  }
  param.userData.roadLine.isRun = !param.userData.roadLine.isRun
}

// 自动或手动
function handleHand(param: any, index: any){
  for(let i = 0; i < carList.value.length; i++){
    if(i !== index){
      carList.value[i].isHand = false
    }else{
      carList.value[i].isHand = !carList.value[i].isHand
      carList.value[i].userData.roadLine.isRun = false
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
  param.userData.roadLine.isRun = false
}

// 移除
function handleRemove(param: any, index: any){
  carList.value.splice(index, 1)
  props.data.scene.children = props.data.scene.children.filter((item: any) => item.uuid !== param.uuid)
}
</script>

<style lang="less" scoped>
.screen-close {
  transition: .5s, ;
  right: -300px;
}

.screen-open {
  transition: .5s, ;
  right: 0;
}

/* 上半圆 */
.half-circle-top {
  position: absolute;
  top: 25px;
  left: -24px;
  margin-top: -24px;
  width: 24px;
  height: 48px;
  background: #292929;
  border-radius: 0 100px 100px 0;
  /* 设置右上角和左下角的边框半径为100px，使右侧形成半圆 */
  text-align: center;
  padding: 15px 0;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #3b3b3b;
  }
}

/* 下半圆 */
.close {
  position: absolute;
  top: 13px;
  right: 5px;
  cursor: pointer;
}
</style>