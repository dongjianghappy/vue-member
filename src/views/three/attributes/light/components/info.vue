<template>
  <ul class="three-list">
    <li class="flex mb10">
      <span class="label">名称</span>
      <input type="text" v-model="light.name" class="input-sm input-full" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import {
  computed,
  useStore,
  inject
} from '@/utils'

const store = useStore()
const light = computed(() => store.getters['three/lightInfo']);
</script>