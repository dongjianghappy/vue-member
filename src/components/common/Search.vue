<template>
  <div class="search">
    <div class="searchinput">
      <input type="text"
             placeholder="搜素话题"
             v-model="content"
             @keypress.enter="search">
    </div>
    <div class="searchbtn"
         style="padding: 7px;">
      <a style="padding:0px"
         @click="search"><i class="iconfont icon-search"></i></a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'
import {useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import {useStore} from 'vuex'
export default defineComponent({
  name: 'v-Search',
  components: {

  },
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const content: any = ref("")

    content.value = route.query.q
    function search(){
      if(!content.value) {
        return
      }
      router.push(`/talk?q=${content.value}`)
    }
    return {
      search,
      content
    }
  }  
})
</script>
