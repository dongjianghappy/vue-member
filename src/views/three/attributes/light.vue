<template>
  <v-collapse title="光源设置" :iscollapse="true" >
    {{lightInfo}}
    <ul class="three-list">
      <li class="flex mb10">
        <span class="label">名称</span>
        <input v-model="lightInfo.name" class="input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">颜色</span>
        <input v-model="lightInfo.parameters.color" class="input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">强度</span>
        <input v-model="lightInfo.parameters.intensity" class="input-full" />
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
const lightInfo = computed(() => store.getters['three/lightInfo']);

// 监听弹窗变量
watch(lightInfo, (newValues, prevValues) => {
  store.commit('three/setGeometry', lightInfo.value)
}, {
  deep: true
})

</script>