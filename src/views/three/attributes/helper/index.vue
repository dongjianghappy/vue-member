<template>
  <v-collapse title="基本设置" :iscollapse="true" >
    <v-tabs :tabs="[{name: '信息',value: 'photos'},{name: '参数',value: 'background'}]">
      <template v-slot:content1>
        <Info :data="helper" />
      </template>
      <template v-slot:content2>
        <Parameters :data="helper" />
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
const helper = computed(() => store.getters['three/helperInfo']);

// 监听弹窗变量
watch(helper, (newValues, prevValues) => {
  store.commit('three/setGeometry', helper.value)
}, {
  deep: true
})
</script>