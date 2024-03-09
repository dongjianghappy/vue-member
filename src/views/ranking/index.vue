<template>
<div class="container w1100 clearfix">
  <div class="w180 left">
    <v-aside :data="module.ranking" title="排行榜" :isRoot="false" :render="init">
      <template v-slot:aside>
      </template>
    </v-aside>
  </div>
  <div class="m0 right" style="width: 910px">
    <Index :dataList="dataList" :mod="route.query.mod" :module="module.ranking" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  onMounted,
  ref,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
import Index from './components/index.vue'
import {
  useRouter,
  useRoute
} from 'vue-router'

export default defineComponent({
  name: 'IndexView1',
  components: {
    Index
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const coding = codings
    const dataList: any = ref([])
    const module: any = computed(() => {
      let site = store.getters['user/config_talk']
      site.ranking && site.ranking.map((item: any) => {
        item.path = `/ranking?mod=${item.value}`
      })
      return site
    });
    const component = computed(() => route.query.mod);


 function init() {
      store.dispatch('common/Fetch', {
        api: 'ranking',
        data: {
          type: route.query.mod
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init) 

    return {
      route,
      component,
      module,
      init,
      dataList
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
