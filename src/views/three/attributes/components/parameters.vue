<template>
  <ul class="three-list">
    <template v-if="geometry.type === 'SphereGeometry'">
      <li class="flex mb10">
        <span class="label">半径</span>
        <input type="text" v-model="geometry.parameters.radius" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">水平分段</span>
        <input type="text" v-model="geometry.parameters.widthSegments" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">垂直分段</span>
        <input type="text" v-model="geometry.parameters.heightSegments" class="input-sm input-full" />
      </li>
    </template>
    <template v-if="geometry.type === 'CircleGeometry'">
      <li class="flex mb10">
        <span class="label">半径</span>
        <input type="text" v-model="geometry.parameters.radius" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">段数</span>
        <input type="text" v-model="geometry.parameters.segments" class="input-sm input-full" />
      </li>
    </template>
    <template v-if="geometry.type === 'ConeGeometry'">
      <li class="flex mb10">
        <span class="label">半径</span>
        <input type="text" v-model="geometry.parameters.radius" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">高</span>
        <input type="text" v-model="geometry.parameters.height" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">周围分段</span>
        <input type="text" v-model="geometry.parameters.radialSegments" class="input-sm input-full" />
      </li>
    </template>
    <template v-if="geometry.type === 'CylinderGeometry'">
      <li class="flex mb10">
        <span class="label">顶部半径</span>
        <input type="text" v-model="geometry.parameters.radiusTop" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">底部半径</span>
        <input type="text" v-model="geometry.parameters.radiusBottom" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">高度</span>
        <input type="text" v-model="geometry.parameters.height" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">分段数</span>
        <input type="text" v-model="geometry.parameters.radialSegments" class="input-sm input-full" />
      </li>
    </template>
    <template v-else>
      <li class="flex mb10">
        <span class="label">宽度</span>
        <input type="text" v-model="geometry.parameters.width" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">高度</span>
        <input type="text" v-model="geometry.parameters.height" class="input-sm input-full" />
      </li>
      <li class="flex mb10" v-if="geometry.parameters.depth">
        <span class="label">深度</span>
        <input type="text" v-model="geometry.parameters.depth" class="input-sm input-full" />
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import {
  computed,
  useStore,
} from '@/utils'

const store = useStore()
const geometry = computed(() => store.getters['three/geometryInfo']);
</script>