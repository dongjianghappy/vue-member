<template>
<div class="home">
  <div class="module-wrap">
    <div class="module-head pl25">
      行程轨迹示意图管理
    </div>
    <div class="module-content p20" style="min-height: 500px">
      <div class="mb20 flex">
        <div style="flex: 1">
          <i class="iconfont icon-info" />
          结构图分有内容详解和行程轨迹。
        </div>
        <div class="pt5 w100 align_right">
          <Detail :data="{coding}" :render="init" />
        </div>
      </div>
      <div class="con-list p15 flex item-thum-wrap" style=" align-items: center;" v-for="(item, index) in dataList.list" :key="index">

      <div style="width: 50px"><span class="num">{{index+1}}</span></div>
      <div style="flex: 1">
        {{item.name}}
        <span>
          <Detail action="edit" :data="{id: item.id, coding}" :render="init" />
        </span>
      </div>
      <div class="font14 align_center" style="width: 150px">
        <v-space>
          <span>
            <Detail2 :data="{...item, coding}" />
          </span>
          <span @click="handleClick(item)">示意图</span>
        </v-space>
      </div>
    </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  onMounted,
  useStore,
  useRouter,
  useRoute,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
import Detail2 from './components/detail2.vue'

const store = useStore();
const router = useRouter()
const route = useRoute()
const coding: any = codings.track
const talkCollect = computed(() => store.getters['talk/talkCollect']);
const dataList: any = ref({})

function handleClick(param: any) {
  router.push(`/track?id=${param.id}`)
}

function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 20,
  }

  Object.assign(params, param)
  store.dispatch('common/Fetch', {
    api: "footprint",
    data: {
      ...params
    }
  }).then((res) => {
    dataList.value = res.result
  })
}

onMounted(init)
</script>
