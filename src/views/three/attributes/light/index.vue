<template>
  <v-collapse title="光源设置" :iscollapse="true" >
    <v-tabs :tabs="[{name: '信息',value: 'photos'},{name: '参数',value: 'background'}]">
      <template v-slot:content1>
        <Info :data="light" />
      </template>
      <template v-slot:content2>
        <Parameters :data="light" />
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

const store = useStore()
const light = computed(() => store.getters['three/lightInfo']);

// 监听弹窗变量
watch(light, (newValues, prevValues) => {
  store.commit('three/setGeometry', light.value)
}, {
  deep: true
})
</script>