<template>
  <div class="container w1100 clearfix">
    <div class="w180 left">
      <v-aside :data="menu"
               title="资讯管理" />
    </div>
    <div class="m0 right"
         style="width: 910px">

      <Action v-if="query.item === 'details'"
              :action="query.action" />
      <List v-else
            :item="query.item" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, useStore, useRouter, useRoute } from '@/utils'
import List from "./list.vue"
import Action from "../thumbnail/article_action.vue"
import * as consts from '@/assets/const'

export default defineComponent({
  name: 'HomeView',
  components: {
   List,
   Action
  },
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const groups = computed(() => store.getters['common/groups']);
    let query: any = computed(() => route.query || "");
    const menus: any = consts
    const mod: any = route.query.mod
    const menu: any = menus[mod];
    menu.map((item: any) => {
      item.path = `/appstore/?mod=${route.query.mod}&item=${item.value}`
    })        
    function handleclick(param:any){
      router.push(`/appstore/?mod=${route.query.mod}&action=edit`)
    }
    
    return {
      handleclick,
      groups,
      query,
      menu
    }
  }  
})
</script>
