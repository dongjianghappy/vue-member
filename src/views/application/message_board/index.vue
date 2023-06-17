<template>
<div class="container w1100 clearfix">
  <div class="w180 left">
    <v-aside :data="menu" title="留言板" :render="init" />
  </div>
  <div class="m0 right" style="width: 910px">
    <div class="module-wrap mb15">
      <div class="module-head bd-0 p20">
        {{isTome ? '给我留言' : '我留言的'}}({{dataList.total || 0}})
      </div>
      <Send :render="init" v-if="!currentUser && isTome" />
      <div class="module-content" style="padding: 0 50px !important; min-height: 500px;">
        <List :dataList="dataList" :isTome="isTome" :render="init" />
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRoute,
  computed,
  ref,
  onMounted,
  getUid,
  watch
} from '@/utils'
import Send from './components/send.vue'
import List from './components/list.vue'
import {
  feedback
} from '@/assets/const'

export default defineComponent({
  name: 'MessageBoardView',
  components: {
    Send,
    List
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const isTome: any = ref(true);
    const currentUser = computed(() => store.getters['user/currentUser']);
    let dataList: any = ref({})
    const loading: any = ref(false)
    const menu: any = feedback;
    menu.map((item: any) => {
      item.name = currentUser.value ? item.names[0] : item.names[1]
      item.path = `/application?mod=feedback&item=${item.value}`
    })

    watch(() => route.query.item, () => {
      isTome.value = route.query.item === 'tome' ? true : false
    })

    function init(param: any = {}) {
      loading.value = false

      const params: any = {
        item: route.query.item,
        uid: getUid(),
        page: 1,
        pagesize: 2
      }

      Object.assign(params, param)

      store.dispatch('common/Fetch', {
        api: "userMessageBoard",
        data: {
          ...params
        }
      }).then(res => {
        loading.value = true
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      route,
      isTome,
      dataList,
      loading,
      currentUser,
      menu,
      init,
    }
  }
})
</script>
