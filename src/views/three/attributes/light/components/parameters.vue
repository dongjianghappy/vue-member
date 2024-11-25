<template>
  <ul class="three-list">
    <!-- 半球光 -->
    <template v-if="light.type === 'HemisphereLight'">
      <li class="flex mb10">
        <span class="label">天空</span>
        <input type="text" v-model="light.parameters.color" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">地面</span>
        <input type="text" v-model="light.parameters.groundColor" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">强度</span>
        <input type="text" v-model="light.parameters.intensity" class="input-sm input-full" />
      </li>
    </template>
    <!-- 点光源 -->
    <template v-if="light.type === 'PointLight'">
      <li class="flex mb10">
        <span class="label">颜色</span>
        <input type="text" v-model="light.parameters.color" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">强度</span>
        <input type="text" v-model="light.parameters.intensity" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">最大距离</span>
        <input type="text" v-model="light.parameters.distance" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">衰退量</span>
        <input type="text" v-model="light.parameters.decay" class="input-sm input-full" />
      </li>
    </template>
  <!-- 平面光光源 -->
    <template v-if="light.type === 'RectAreaLight'">
      <li class="flex mb10">
        <span class="label">颜色</span>
        <input type="text" v-model="light.parameters.color" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">强度</span>
        <input type="text" v-model="light.parameters.intensity" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">宽度</span>
        <input type="text" v-model="light.parameters.width" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">高度</span>
        <input type="text" v-model="light.parameters.height" class="input-sm input-full" />
      </li>
    </template>
    <!-- 聚光灯 -->
    <template v-if="light.type === 'SpotLight'">
      <li class="flex mb10">
        <span class="label">颜色</span>
        <input type="text" v-model="light.parameters.color" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">强度</span>
        <input type="text" v-model="light.parameters.intensity" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">距离</span>
        <input type="text" v-model="light.parameters.distance" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">角度</span>
        <input type="text" v-model="light.parameters.angle" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">半影衰减</span>
        <input type="text" v-model="light.parameters.penumbra" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">衰减量</span>
        <input type="text" v-model="light.parameters.decay" class="input-sm input-full" />
      </li>
    </template>
    <template v-else>
      <li class="flex mb10">
        <span class="label">颜色</span>
        <input type="text" v-model="light.parameters.color" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">强度</span>
        <input type="text" v-model="light.parameters.intensity" class="input-sm input-full" />
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
const light = computed(() => store.getters['three/lightInfo']);
</script>