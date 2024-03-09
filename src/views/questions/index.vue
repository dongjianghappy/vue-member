<template>
<Detail v-if="route.query.id" />
<Index v-else />
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRoute,
  ref,
  onMounted,
  codings
} from '@/utils'
import Index from './components/index.vue'
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'MessageBoardView',
  components: {
    Index,
    Detail
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const coding: any = codings.haosite
    let dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: 'haosite',
        data: {
          coding: coding.art,
          page: 1,
          pagesize: 20
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function visit(param: any) {
      const {
        id
      } = param

      store.dispatch('common/Fetch', {
        api: "VisitCommunity",
        data: {
          coding: coding.info,
          id
        }
      }).then(res => {
        debugger
        window.open(param.url)

      })
    }

    onMounted(init)

    return {
      coding,
      route,
      dataList,
      init,
      visit
    }
  }
})
</script>

<style lang="less" scoped>
.site-item {
  display: flex;
  padding-left: 0;
  height: 35px;

  .head-name {
    width: 65px;
    padding: 8px 0 8px 15px;
    color: #5bc0de;
  }

  ul {
    flex: 1;

    li {
      padding: 8px;
      text-align: center;
      float: left;
    }
  }

  .site-more {
    padding: 8px 15px;

    a {
      color: #ccc;
    }
  }
}
</style>
