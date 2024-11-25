<template>
  <ul class="three-list">
    <li class="flex mb10">
      <span class="label">x轴</span>
      <input type="text" v-model="data.rotation.x" class="input-sm input-full" />
    </li>
    <li class="flex mb10">
      <span class="label">y轴</span>
      <input type="text" v-model="data.rotation.y" class="input-sm input-full" />
    </li>
    <li class="flex mb10">
      <span class="label">z轴</span>
      <input type="text" v-model="data.rotation.z" class="input-sm input-full" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import {
  defineProps,
  computed,
  useStore,
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

// const store = useStore()
// const geometry = computed(() => store.getters['three/geometryInfo']);
</script>