<template>
  <v-collapse title="基本设置" :iscollapse="true" >
    <v-tabs :tabs="[{name: '信息',value: 'photos'},{name: '参数',value: 'background'},{name: '事件',value: 'background'},{name: '语音',value: 'background'}]">
      <template v-slot:content1>
        <Info :data="geometry" />
      </template>
      <template v-slot:content2>
        <Parameters :data="geometry" />
      </template>
      <template v-slot:content3>
        <Event :data="geometry" />
      </template>
      <template v-slot:content4>
        <Broadcast :data="geometry" />
      </template>
    </v-tabs>
  </v-collapse>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  useStore,
} from '@/utils'
import Info from './components/info.vue'
import Parameters from './components/parameters.vue'
import Event from './components/event.vue'
import Broadcast from './components/broadcast.vue'

const store = useStore()
const geometry = computed(() => store.getters['three/geometryInfo']);

// 监听弹窗变量
watch(geometry, (newValues, prevValues) => {
  store.commit('three/setGeometry', geometry.value)
}, {
  deep: true
})
</script>