<template>
<div class="container w1100 clearfix">
  <div class="w180 left">
    <v-aside title="导航网站" :data="menu" :render="init">
      <template v-slot:button>
        <WebsiteApplication />
      </template>
      <!-- <template v-slot:aside>
        <v-collapse title="导航分类">
          <ul>
            <li class="aside"><i class="iconfont font20 icon-dot"></i>自媒体</li>
            <li class="aside"><i class="iconfont font20 icon-dot"></i> 博客网站</li>
            <li class="aside"><i class="iconfont font20 icon-dot"></i> 素材网站</li>
            <li class="aside"><i class="iconfont font20 icon-dot"></i> 图片网站</li>
          </ul>
        </v-collapse>
      </template> -->
    </v-aside>
  </div>
  <div class="m0 right" style="width: 910px">
    <div class="module-wrap mb15">
      <div class="module-head p20">收录网站</div>
      <div class="module-content" style="padding: 15px !important; min-height: 500px;">
        <div class="col-md-4 p10" v-for="(item, index) in dataList.list" :key="index" ><v-card :data="item" /></div>
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
import Send from './components/send.vue'
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
    const currentUser = computed(() => store.getters['user/currentUser']);
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
    }];
    menu.map((item: any) => {
      item.name = currentUser.value ? item.names[0] : item.names[1]
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
      currentUser,
      menu,
      currentData,
      init,
      handleClick,
      showAlbum
    }
  }
})
</script>
