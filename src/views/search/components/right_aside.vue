<template>
<div>
  <!-- <Ranking :ref="ranking" v-if="module.ranking" :style="{width: '280px'}" /> -->
  <SearchDiscovery :ref="ranking" :style="{width: '280px'}" v-if="module.search_discovery" />
  <BlogHot :ref="ranking" :style="{width: '280px'}" v-if="module.blog_hotlist" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useStore,
  onMounted,
  computed
} from '@/utils'
import Ranking from '../../index/components/module/ranking.vue'
import SearchDiscovery from './search_discovery.vue'
import BlogHot from './blog_hot.vue'
export default defineComponent({
  name: 'RightView',
  components: {
    Ranking,
    SearchDiscovery,
    BlogHot
  },
  props: {
    module: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup() {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const userInfo = computed(() => store.getters['user/loginuser']);

    onMounted(() => {
      // const Doc: any = document.getElementsByClassName("aside_fixed")[0];
      // Doc.offsetTop
      
      proxy.$scroll.init({
        win: {
          el: window,
          y: 10,
          b: 80
        },
        doc: {
          el: 'aside_fixed'
        },
        type: "fixed"
      })
    })

    return {
      userInfo
    }    
  },
})
</script>
