<template>
<div class="module-wrap">
  <div class="module-content p15 font12">
    <v-space>
      <span @click="handleClick(item.value)" v-for="(item, index) in module" :key="index">{{item.name}}</span>
    </v-space>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  useRouter,
  computed,
  useStore
} from '@/utils'

const store = useStore();
const router = useRouter()
const module = computed(() => store.getters['user/config_talk'].footer);

function handleClick(param: any) {
  router.push(param)
}
</script>
