<template>
  <div class="sidebar aside_nav">
    <ul>
      <li class="cl-white"
          v-for="(item, index) in groups"
          :key="index"
          @click="handleclick(item.path)">
        <i class="iconfont icon-dot"></i> {{item.title}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, useStore, useRouter } from '@/utils'

export default defineComponent({
  name: 'AsideView',
  setup(props,context) {
    const router = useRouter();
    const store = useStore();
    const groups = computed(() => store.getters['common/groups']);
    
    function handleclick(param:any){
      router.push(param)
    }
    
    return {
      handleclick,
      groups
    }
  }
})
</script>
