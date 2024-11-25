<template>
  <ul class="three-list">
    <li class="flex mb10">
      <span class="label">点击</span>
        <input name="status" type="radio" value="1" v-model="geometry.event.status"> 是&nbsp;&nbsp;
        <input name="status" type="radio" value="0" v-model="geometry.event.status"> 否
    </li>
    <li class="flex mb10">
      <span class="label">地址</span>
      <input type="text" v-model="geometry.event.target" class="input-sm input-full" />
    </li>
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