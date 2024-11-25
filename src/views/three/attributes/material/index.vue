<template>
  <v-collapse title="材质设置" :iscollapse="true" >
    <ul class="three-list">
      <li class="flex mb10">
        <span class="label">颜色</span>
        <input type="text" v-model="geometry.material.color" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">图片</span>
        <input type="text" v-model="geometry.material.image" class="input-sm input-full" />
      </li>
        <li class="flex mb10">
        <span class="label">文本</span>
        <div style="flex: 1">
          <span class="mr15">未设置</span>
          <setText :data="geometry.material.text" class="right" />
        </div>
      </li>
      <li class="flex mb10" v-if="geometry.type !== 'PlaneGeometry' && geometry.type !== 'SphereGeometry'">
        <span class="label"></span>
        <More :data="geometry.material" />
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
import { closeUpAnimate } from '../../utils/car'
import More from './more.vue'
import setText from '../setText.vue'

const store = useStore()
const geometry = computed(() => store.getters['three/geometryInfo']);

// 监听弹窗变量
watch(geometry, (newValues, prevValues) => {
  store.commit('three/setGeometry', geometry.value)
}, {
  deep: true
})
</script>