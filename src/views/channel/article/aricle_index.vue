<template>
<div class="p5 plr15">
  <v-tabs :tabs="tabMenu" :isEmit="true" v-model:index="index">
    <template v-slot:extra>
      <v-space>
        <v-toggledisplay v-model:toggle="toggleDisplay" />
        <v-condition name="排序" icon="sort" field="sorter" :enums="[{value: 'id desc', name: '递减'}, {value: 'id asc', name: '递增'}]" :render="init" />
        <a class="inline mr10 batch-button" @click="onBatch">批量管理</a>
      </v-space>
    </template>
    <template v-slot:content1>
      <div class="batch-btngroup p10" style="background: #eee" v-if="isShowBatch">
        <span class="mr15" @click="operation('all')">全选</span>
        <span class="mr15" @click="operation('moveCate')">移动</span>
        <span class="mr15" @click="operation('moveAlbum')">移动文档</span>
        <span class="mr15" @click="operation('delete')">删除</span>
      </div>
      <List :data="{name: channel, coding: coding.art}" :dataList="dataList" :isShowBatch="isShowBatch" v-if="toggleDisplay === 'list'" />
      <Album :data="{name: channel, coding: coding.art}" :dataList="dataList" :item="query.item" :isShowBatch="isShowBatch" v-else />
      <v-loding v-if="!loading" />
    </template>
    <template v-slot:content2>
      <List :item="query.item" />
    </template>
    <template v-slot:content3>
      <List :item="query.item" />
    </template>
  </v-tabs>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  useStore,
  useRoute,
  onMounted,
  ref,
  watch,
  useRouter,
  codings,
  getUid
} from '@/utils'
import List from "./list.vue"
import Album from "./album.vue"
export default defineComponent({
  name: 'HomeView',
  components: {
    List,
    Album
  },
  props: {
    channel: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const route = useRoute();
    const store = useStore();
    const router = useRouter()
    let query: any = computed(() => route.query || "");
    const index: any = ref(0)
    const toggleDisplay: any = ref("list")
    const isShowBatch = ref(false)
    const selectList: any = ref([])
    const dataList = ref([])
    const coding: any = codings[props.channel]
    const loading: any = ref(false)
    let tabMenu: any = ref([{
        name: "文档管理",
        value: "appstore1"
      },
      {
        name: "正在审核",
        value: "appstore2"
      },
      {
        name: "已退回",
        value: "appstore2"
      }
    ])

    if (props.channel === 'picture') {
      // menu.value[0].name = "图片管理"
      toggleDisplay.value = 'album'
    } else if (props.channel === 'video') {
      // menu.value[0].name = "视频管理"
    } else if (props.channel === 'website') {
      // menu.value[0].name = "网站管理"
      toggleDisplay.value = 'album'
    } else if (props.channel === 'source') {
      // menu.value[0].name = "资源管理"
      toggleDisplay.value = 'album'
    } else if (props.channel === 'funny') {
      // menu.value[0].name = "搞笑段子"
    }

    // 监听
    watch(index, async (newValues, prevValues) => {
      let sss = "audited"
      if (index.value === 0) {
        sss = "audited"
      } else if (index.value === 1) {
        sss = "unAudited"
      } else {
        sss = "returned"
      }
      isShowBatch.value = false
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: `/${props.channel}?item=${sss}`
      }))

      init()
    })

    function onBatch() {
      isShowBatch.value = !isShowBatch.value
      selectList.value = []
    }

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
          coding: coding['art'],
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

    onMounted(init)

    return {
      coding,
      dataList,
      query,
      index,
      tabMenu,
      toggleDisplay,
      onBatch,
      isShowBatch,
      init,
      loading
    }
  }
})
</script>
