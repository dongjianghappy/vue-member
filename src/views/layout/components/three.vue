<template>
  <!-- <template v-if="scene"> -->
  <ThreeCangpin v-if="currentScene == 'cangpin'"  />
  <ThreeHome v-else />
  <!-- </template> -->
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  computed,
  useStore
} from '@/utils'
import ThreeHome from '../../three/index.vue'
import ThreeCangpin from '../../three/bisai.vue'

const store = useStore();
const scene: any = ref("")
const currentScene: any = computed(() => store.getters['three/currentScene']);

onMounted(() => {
 scene.value = sessionStorage.getItem('scene')
})
</script>
