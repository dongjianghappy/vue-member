<template>
  <v-aside :data="module.schedule" title="" :isFixed="false">
    <template v-slot:aside>
    </template>
  </v-aside>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineProps,
  ref,
  watch,
  useStore,
  computed,

} from '@/utils'

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const module: any = computed(() => {
  let site = store.getters['user/config_talk']
  site.content && site.content.map((item: any) => {
    item.path = `/content${item.value}`
  })
  return site
});
</script>
