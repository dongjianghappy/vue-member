<template>
  <div>
    <Basic v-model:blog="blogInfo"
           :edit="edit" />
    <Theme v-model:blog="blogInfo"
           :edit="edit" />
    <Music v-model:blog="blogInfo"
           :edit="edit" />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, computed } from 'vue'
import {useStore} from 'vuex'
import Basic from './components/basic.vue'
import Theme from './components/theme.vue'
import Music from './components/music.vue'
import Industry from './components/industry.vue'
import Education from './components/education.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
   Basic,
   Theme,
   Music
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
setup(props,context) {
  const {ctx, proxy}:any = getCurrentInstance();
  const store = useStore();
  const blogInfo = computed(() => store.getters['user/blogInfo']);

    function init(){
      store.dispatch('user/BlogInfo', {
      })
    }

    function edit(param: any){
      store.dispatch('common/Fetch', {
          api: "EditBlogInfo",
          data: {
            ...param
          }
      }).then(res => {
        proxy.$hlj.message(res.returnMessage)
        console.log("ss");
      })       
    }
    
    onMounted(init)

  return {
    blogInfo,
    edit
    
  }
}  
})
</script>
