<template>
<div class="home">
  <div class="module-wrap">
    <div class="module-head pl25">
      观看历史
    </div>
    <div class="module-content p20" style="min-height: 500px">
      <div class="clearfix">
        <div class="col-md-6 p10" v-for="(item, index) in dataList.list" :key="index">
          <div class="thumbnail p10 relative radius-4" style="background: var(--card-background);">
            <v-thumbnail4 :data="item" />
            <!-- <div class="radius-4" style="overflow: hidden;">
              <img :src="item.image" onerror="this.src='http://www.yunxi10.com/source/public/images/topic_page_2x.png'" class="img-scale" style="width: 100%; height: 160px;">
            </div> -->
            <div class="caption relative nowrap" style="padding: 10px 0px; height: 40px;"  v-html="item.summary"></div>
            <div class="relative font12" style="border-top: 1px dotted var(--default-border); padding: 10px 0px; height: 40px;">浏览时间: {{item.times}}</div>
          </div>
        </div>
      </div>
      <div class="mt25 align_center" v-if="dataList.total > 20">
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
  useRoute,
  codings
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
    const coding: any = codings.talk
    const Loading: any = ref(false)
    const talkCollect = computed(() => store.getters['talk/talkCollect']);
    const dataList: any = ref({})

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 20,
      }

      Object.assign(params, param)
      store.dispatch('common/Fetch', {
        api: "historyRecords",
        data: {
          ...params
        }
      }).then((res) => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      route,
      init,
      Loading,
      talkCollect,
      dataList
    }
  },
})
</script>
