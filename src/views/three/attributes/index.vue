<template>
  <div class="module-wrap three-right m0" v-if="currentEdit">
    <div class="module-content p0">
      <RoadLine v-if="currentEdit ==='roadLine'" />
      <template v-if="currentEdit ==='light'">
      <Light />
      <AoordinateAxis :data="lightInfo" />
      </template>
      <template v-if="currentEdit ==='helper'">
      <Helper />
      <AoordinateAxis :data="helperInfo" />
      </template>
      <template v-if="currentEdit ==='item'">
      <Basic />
      <Parameters />
      <Material />
      <AoordinateAxis :data="geometry" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  useStore,
} from '@/utils'
import Basic from './basic.vue'
import AoordinateAxis from './coordinateAxis.vue'
import Material from './material/index.vue'
import RoadLine from './roadLine.vue'
import Light from './light/index.vue'
import Helper from './helper/index.vue'

import { closeUpAnimate } from '../utils/car'

const store = useStore()
const geometry = computed(() => store.getters['three/geometryInfo']);
const helperInfo = computed(() => store.getters['three/helperInfo']);
const lightInfo = computed(() => store.getters['three/lightInfo']);
const currentEdit = computed(() => store.getters['three/currentEdit']);

// 监听弹窗变量
watch(geometry, (newValues, prevValues) => {
  console.log("vvvvvvvvvvvvhhhhhhhhhhh");
  store.commit('three/setGeometry', geometry.value)
}, {
  deep: true
})
</script>