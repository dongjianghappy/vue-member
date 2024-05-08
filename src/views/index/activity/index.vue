<template>
<div class="home">
  <TalkTabs :getData="init" :style="{flex: 1}" :mod="{tab: 'mod', value: 'activity'}" :data="[{name: `我的话题`, value: ''}, {name: '收藏话题', value: 'collect'}]" :query="{tab: 'item', value: route.query.item}" :render="init" />

  <div class="module-wrap">
    <div class="module-content p20" style="min-height: 500px">
      <div class="clearfix">
        <div class="col-md-4 p10" v-for="(item, index) in dataList.list" :key="index">
          <div class="thumbnail p10 relative radius-4" style="background: var(--card-background);" @click="show(item.name)">
            <div class="radius-4" style="overflow: hidden;">
              <img :src="item.image" onerror="this.src='http://www.yunxi10.com/source/public/images/topic_page_2x.png'" class="img-scale" style="width: 100%; height: 160px;">
            </div>
            <div class="caption relative" style="padding: 10px 0px; height: 40px;">
              <span>#{{item.name}}#
                <span class="mark vote" v-if="item.vote !=='0'">票</span>
              </span>
            </div>
            <div class="relative" style="border-top: 1px dotted var(--default-border); padding: 10px 0px; height: 40px;"> {{item.num}} 人次参与</div>
          </div>
        </div>
      </div>
      <div class="mt25 align_center" v-if="dataList.total > 10">
        <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" :simple="true" />
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  ref,
  onMounted,
  useStore,
  useRouter,
  useRoute
} from '@/utils'
import TalkTabs from '../components/module/TalkTabs.vue'

export default defineComponent({
  name: 'HomeViewsss',
  components: {
    TalkTabs
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter()
    const route = useRoute()
    const Loading: any = ref(false)
    const talkCollect = computed(() => store.getters['talk/talkCollect']);
    const dataList: any = ref({})

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 30,
        type: 'myactivity'
      }

      Object.assign(params, param)
      store.dispatch('common/Fetch', {
        api: params.type == 'collect' ? 'ActivityCollectList' : 'ActivityList',
        data: {
          ...params
        }
      }).then((res) => {
        dataList.value = res.result
      })
    }

    function show(name: any) {
      router.push(`/activity?item=${name}`)
    }

    onMounted(init)

    return {
      route,
      init,
      Loading,
      talkCollect,
      dataList,
      show
    }
  },
})
</script>
