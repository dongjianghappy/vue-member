<template>
  <div style="background-color: #f5f5f5; margin-top:-20px; min-height: 600px; padding: 0px;">
    <Article v-if="query.item" />
    <List v-else
          :item="query.item" />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, useStore, useRouter, useRoute } from '@/utils'
import List from "./list.vue"
import Article from "./article.vue"

export default defineComponent({
  name: 'HomeView',
  components: {
 
   Article,
   List
  },
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const groups = computed(() => store.getters['common/groups']);
    let query: any = computed(() => route.query || "");
        
    function handleclick(param:any){
      router.push(`/appstore/?mod=${route.query.mod}&action=edit`)
    }
    
    return {
      handleclick,
      groups,
      query
    }
  }  
})
</script>
