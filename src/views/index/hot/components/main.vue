<template>
<div class="home">
  <div class="module-wrap">
    <div class="module-head pl25">
      博客热搜榜
    </div>
    <div class="module-content p20" style="min-height: 500px">
      <div class="clearfix">
          <div class="flex p10 item-thum-wrap" v-for="(item, index) in dataList" :key="index" style="align-items: center; border-bottom: 1px solid var(--default-border);" @click="handleclick(item.id)">
            <div class="ptb10 w50 font16 num">{{index+1}}</div>
            <div class="ptb10 font16 nowrap" style="flex: 1;" v-html="item.summary"></div>
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
import TalkTabs from '../components/module/TalkTabs.vue'

const store = useStore();
const router = useRouter()
const route = useRoute()
const coding: any = codings.talk
const talkCollect = computed(() => store.getters['talk/talkCollect']);
const dataList: any = ref([])

function handleclick(param: any, grade: any) {
  // router.push(`/vote?item=${param}`)
}

function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 50,
  }

  Object.assign(params, param)
  store.dispatch('common/Fetch', {
    api: "hotSearch",
    data: {
      ...params
    }
  }).then((res) => {
    dataList.value = res.result
  })
}

onMounted(init)
</script>
