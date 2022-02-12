<template>
  <div class="container w1100 clearfix">
    <div class="w180 left">
      <v-aside :data="menu"
               title="设置" />
    </div>
    <div class="m0 right"
         style="width: 910px">
      <Index :type="component" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue'
import {useStore} from 'vuex'
import Index from './components/index.vue'
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
  const menu: any = setting
  menu.map((item: any) => {
    item.path = `/setting?mod=${item.url}`
  })  
  const component = computed(() => route.query.mod);

  return {
    component,
    menu
  }
}
})
</script>
