<template>
<div class="flex p10" style=" border-bottom: 1px solid var(--default-border);" v-for="(item, index) in dataList.list" :key="index">
  <div class="w50 mr15"><i :class="`iconfont icon-img font32`" /></div>
  <div style=" flex: 1;" @click="handleClick(item)">
    <div class="mb5 font12" style="color: #808080">{{item.times}}</div>
    <div :class="{bold: item.read_status == '0'}">
      {{item.title}}</div>
  </div>
  <div class="pt15 w50 font18 align_right"></div>
</div>
<div class="mt25 align_center" v-if="dataList.total > 20">
  <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" :simple="true" />
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  codings,
  useStore,
  useRouter,
  getUid,
  useRoute
} from '@/utils'

const props: any = defineProps({
  title: {
    type: String,
    defualt: "system"
  },
  index: {
    type: String,
    defualt: "all"
  },
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const route = useRoute();
const router = useRouter();
const coding: any = codings.message
const dataList: any = ref({})

// 监听弹窗变量
watch(route, (newValues, prevValues) => {
  if (route.path.indexOf("information") > 0) {
    init({
      page: 1,
      type: route.query.mod
    })
  }
}, {
  deep: true
})

function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 25
  }

  Object.assign(params, param)
  if (props.index !== 'all') {
    params.read_status = props.index
  }

  store.dispatch('common/Fetch', {
    api: "messageList",
    data: {
      coding: coding.list,
      type: props.title,
      ...params
    }
  }).then(res => {
    dataList.value = res.result
  })
}

function handleClick(param: any) {
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/information?mod=detail&id=${param.id}`
  }))
}

onMounted(() => {
  init()
})
</script>
