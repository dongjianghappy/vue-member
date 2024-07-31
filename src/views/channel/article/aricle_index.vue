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
    <template v-slot:content1 v-if="channel == 'digital'">
      <Digital :data="{channel: channel, coding: coding.art}" :dataList="dataList" :isShowBatch="isShowBatch" />
    </template>
    <template v-slot:content1 v-else-if="channel == 'sound'">
      <Sound :data="{channel: channel, coding: coding.art}" :dataList="dataList" :isShowBatch="isShowBatch" />
    </template>
    <template v-slot:content1 v-else>
      <div class="batch-btngroup p10" style="background: #eee" v-if="isShowBatch">
        <span class="mr15" @click="operation('all')">全选</span>
        <span class="mr15" @click="operation('moveCate')">移动</span>
        <span class="mr15" @click="operation('moveAlbum')">移动文档</span>
        <span class="mr15" @click="operation('delete')">删除</span>
      </div>
      <List :data="{channel: channel, coding: coding.art}" :dataList="dataList" :isShowBatch="isShowBatch" v-if="toggleDisplay === 'list'" />
      <Album :data="{channel: channel, coding: coding.art}" :dataList="dataList" :item="query.item" :type="channel === 'video' ? 'video' : 'image'" v-else />
      <v-loding v-if="!loading" />
      <div class="pt25 align_right" v-if="dataList.total > 20">
        <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
      </div>
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

<script setup lang="ts">
import {
  defineProps,
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
import Sound from "./sound.vue"
import Digital from "./digital.vue"

const props: any = defineProps({
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
})
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
  toggleDisplay.value = 'album'
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

function init(param: any = {}) {
  loading.value = false

  const params: any = {
    uid: getUid(),
    id: route.query.id,
    page: 1,
    pagesize: 20
  }

  Object.assign(params, param)

  if (route.query.item === 'audited') {
    params.management_checked = "1"
  } else if (route.query.item === 'unAudited') {
    params.management_checked = "0"
  } else if (route.query.item === 'returned') {
    params.management_checked = "-1"
  }

  store.dispatch('common/Fetch', {
    api: 'ArticleList',
    data: {
      coding: coding['art'],
      uid: getUid(),
      page: 1,
      pagesize: 2,
      ...params
    }
  }).then(res => {
    dataList.value = res.result
    loading.value = true
  })
}

onMounted(init)
</script>
