<template>
  <v-collapse title="路线设置" :iscollapse="true" >
    <ul class="three-list">
      <li class="flex mb10">
        <span class="label">名称</span>
        <input v-model="roadLoad.name" class="input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">类型</span>
          <v-select :enums="[{name: '汽车', value: 'car'}, {name: '星球', value: 'planet'}]" v-model:value="roadLoad.type" :defaultValue="roadLoad.type = roadLoad.type ? roadLoad.type : 'car'" />
      </li>
      <li class="flex mb10">
        <span class="label">描述</span>
          <textarea v-model="roadLoad.description" placeholder="请输入描述" class="w-full"></textarea>
      </li>
      <li class="flex mb10">
        <span class="label">坐标</span>
        <div class="p15" style="background: #f8f8fa; width: 100%;">
          <div class="flex align_center">
            <div class="pr5" style="flex: 1">x坐标</div>
            <div class="pr5" style="flex: 1">y坐标</div>
            <div class="pr5" style="flex: 1">z坐标</div>
            <div style="width: 25px"><i class="iconfont icon-anonymous-iconfont" @click="handleAdd(roadLoad.points)" /></div>
          </div>
          <div class="flex" v-for="(position, i) in roadLoad.points" :key="i">
            <div class="pr5" style="flex: 1"><input type="text" v-model="position.x" class="input-sm input-full" /></div>
            <div class="pr5" style="flex: 1"><input type="text" v-model="position.y" class="input-sm input-full" /></div>
            <div class="pr5" style="flex: 1"><input type="text" v-model="position.z" class="input-sm input-full" /></div>
            <div style="width: 25px"><i class="iconfont icon-recycle" @click="handleRemove(roadLoad.points, index)" /></div>
          </div>
        </div>
      </li>
    </ul>
  </v-collapse>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  useStore,
} from '@/utils'
import { closeUpAnimate } from '../utils/car'

const store = useStore()
const roadLoad = computed(() => store.getters['three/roadLoad']);

// 监听弹窗变量
watch(roadLoad, (newValues, prevValues) => {
  store.commit('three/setSceneRoadLine', roadLoad.value)
}, {
  deep: true
})

function handleAdd(param: any){
  param.push({
    x: 0,
    y: 0,
    z: 0
  })
}

function handleRemove(param: any, index: any){
  param.splice(index, 1)
}
</script>