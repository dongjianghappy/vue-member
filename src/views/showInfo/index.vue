<template>
<div class="container w1100 clearfix">
  <div class="w280 left">
    <Aside />
  </div>
  <div class="m0 right" style="width: 810px">
    <Basic v-if="component==='basic'" />
    <About v-else-if="component==='about'" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  onMounted
} from 'vue'
import {
  useStore
} from 'vuex'
import Aside from './aside.vue'
import Basic from './components/basic.vue'
import About from '../basicInfo/about/index.vue'
import {
  useRouter,
  useRoute
} from 'vue-router'

export default defineComponent({
  name: 'IndexView1',
  components: {
    Aside,
    Basic,
    About
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    
    const module: any = computed(() => {
      let site = store.getters['user/config_talk']
      site.content && site.content.map((item: any) => {
        item.path = `/content${item.value}`
      })
      return site
    });
    const component = computed(() => route.query.mod);

    

    return {
      component,
      module,
    }
  }
})
</script>

<style lang="less" scoped>
/deep/ .collapse {
  background: none !important;

  .collapse-head {
    background: none !important;
  }

  .aside-list {
    background: none !important;
  }
}
</style>
