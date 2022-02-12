<template>
  <div class="container w1100 clearfix">
    <div class="180 left">
      <v-aside :data="menu"
               title="消息管理" />
    </div>
    <div class="m0 right bg-white"
         style="width: 910px; min-height: 500px;">
      <Index :title="component || 'system'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue'
import {useStore} from 'vuex'
import Index from './components/integration.vue'
import { setting, information} from '@/assets/const'
import {useRouter, useRoute} from 'vue-router'

export default defineComponent({
  name: 'IndexView1',
  components: {
   Index
  },
    setup(props,context) {
  const {ctx}:any = getCurrentInstance();
  const store = useStore();
  const router = useRouter();
  const route = useRoute();
  let menu: any = []
debugger
  for(let key in information){
    menu.push(
      {
        name: information[key],
        path: `/information?mod=${key}`
      }
    )
  }

  const component = computed(() => route.query.mod);

  return {
    component,
    menu
  }
}
})
</script>
