<template>
  <ul class="three-list">
    {{helper}}
    <li class="flex mb10">
      <span class="label">尺寸</span>
      <input type="text" v-model="helper.parameters.size" class="input-sm input-full" />
    </li>
    <li class="flex mb10">
      <span class="label">细分</span>
      <input type="text" v-model="helper.parameters.divisions" class="input-sm input-full" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import {
  computed,
  useStore,
} from '@/utils'

const store = useStore()
const helper = computed(() => store.getters['three/helperInfo']);
</script>