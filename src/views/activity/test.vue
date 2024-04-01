<template>
  <div style="background-color: #f5f5f5; margin-top:-20px; min-height: 600px; padding: 0px;">
    
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, useStore, useRouter, useRoute, onMounted } from '@/utils'
import List from "./list11.vue"
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
    const groups = computed(() => store.getters['user/groups']);
    let query: any = computed(() => route.query || "");
        
    function init(){
      store.dispatch('common/Fetch', {
        api: 'soundList',
        data: {
          uid: "https://file06.16sucai.com/2016/0322/e21a29643ab7c8d58cf54126cff44ebe.mp3"
        }
      }).then(res => {
        
      })
    }

    onMounted(init)
    
    return {
      init,
      groups,
      query
    }
  }  
})
</script>
