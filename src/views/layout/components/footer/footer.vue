<template>
<div class="module-wrap">
  <div class="module-content p15 font12">
    <v-space>
      <span @click="handleClick(item.value)" v-for="(item, index) in module" :key="index">{{item.name}}</span>
    </v-space>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useRouter,
  computed,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Footer',
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
  const store = useStore();
    const router = useRouter()
    const module = computed(() => store.getters['user/config_talk'].footer);

    function handleClick(param: any) {

      router.push(param)
    }
    return {
      module,
      handleClick
    }
  }
})
</script>
