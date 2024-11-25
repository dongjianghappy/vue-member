<template>
  <ul class="three-list">
    <li class="flex mb10">
      <span class="label">名称</span>
      <input type="text" v-model="geometry.name" class="input-sm input-full" />
    </li>
    <li class="mb10">
      <span class="label">路线</span>
      <div>
      <span class="mr15">{{geometry.roadLineName || '未选择'}}</span>
      <SetTrack :data="geometry" @Track="Track" class="right" />
      </div>
      <ul class="three-list p0" style="background: #333;">
        <li class="flex mb10">
          <span class="label">运行</span>
          <i class="iconfont icon-img" :class="{'cl-green': geometry.roadLine.isRun === '1'}" @click="handleClick(geometry.roadLine)" />
        </li>
        <li class="flex mb10">
          <span class="label">速度</span>
          <input type="text" v-model="geometry.roadLine.velocity" placeholder="请输入速度值" disabled class="input-sm input-full" />
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import {
  computed,
  useStore,
  inject
} from '@/utils'
import SetTrack from '../setTrack.vue'

const store = useStore()
const parentsData: any = inject('parentsData')

const geometry = computed(() => store.getters['three/geometryInfo']);
const _geometry = computed(() => store.getters['three/geometry']);
function handleClick(param: any){
  param.isRun = param.isRun === '1' ? '0' : '1'
  _geometry.value.userData.roadLine.isRun = param.isRun
}

function Track(param: any){
  const { THREE, scene, ThreeFn } = parentsData
  
  debugger
  geometry.value.roadLineName = param.name
  geometry.value.roadLine.id = param.id
debugger
  ThreeFn.roadLine({
    THREE,
    scene,
    model: _geometry.value,
    points: param.points,
    ...geometry.value.roadLine
  })
}
</script>