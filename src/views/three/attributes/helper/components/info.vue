<template>
  <ul class="three-list">
    <li class="flex mb10">
      <span class="label">名称</span>
      <input type="text" v-model="helper.name" class="input-sm input-full" />
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
const helper = computed(() => store.getters['three/helperInfo']);
</script>