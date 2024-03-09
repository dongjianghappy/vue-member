<template>
<div class="container w1100 clearfix">
  <div class="w180 left">
    <v-aside title="导航网站" :data="menu" :render="init">
      <template v-slot:button>
        <WebsiteApplication />
      </template>
    </v-aside>
  </div>
  <div class="m0 right" style="width: 910px">
    <div class="module-wrap mb15">
      <div class="module-head p20">收录网站</div>
      <div class="module-content" style="padding: 15px !important; min-height: 500px;">
        <div class="col-md-4 p10" v-for="(item, index) in dataList.list" :key="index">
          <v-card :data="item" />
        </div>
      </div>
    </div>
  </div>
</div>
<Form :showAlbum="true" :render="Grouping" v-model:showFlag="showAlbum" v-if="showAlbum" :data="currentData" />
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRoute,
  computed,
  ref,
  onMounted,
  getUid
} from '@/utils'
import Form from './components/form.vue'
import WebsiteApplication from './components/websiteApplication.vue'
export default defineComponent({
  name: 'MessageBoardView',
  components: {
    WebsiteApplication,
    Form
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const component = computed(() => route.query.mod);
    let dataList: any = ref([])
    const currentData = ref({})
    const isreply = ref(false)
    const showAlbum = ref(false)
    const loading: any = ref(false)
    const menu: any = [{
        names: ['收录网站'],
        value: "tome"
      },
      {
        names: ['审核网站'],
        value: "tome"
      }
    ];
    menu.map((item: any) => {
      item.name = item.names[0]
      item.path = `/haosite?mod=feedback&item=${item.value}`
    })

    function init() {
      let param: any = {}
      if (route.query.item === 'audited') {
        param.management_checked = "1"
      } else if (route.query.item === 'unAudited') {
        param.management_checked = "0"
      } else if (route.query.item === 'returned') {
        param.management_checked = "-1"
      }
      loading.value = false
      dataList.value = []
      store.dispatch('common/Fetch', {
        api: 'ArticleList',
        data: {
          coding: "K20000",
          uid: getUid(),
          page: 1,
          pagesize: 20,
          ...param
        }
      }).then(res => {
        dataList.value = res.result
        loading.value = true
      })
    }

    function handleClick(param: any, item: any) {
      showAlbum.value = true
      currentData.value = item ? item : param
    }

    onMounted(init)

    return {
      component,
      dataList,
      loading,
      isreply,
      menu,
      currentData,
      init,
      handleClick,
      showAlbum
    }
  }
})
</script>
