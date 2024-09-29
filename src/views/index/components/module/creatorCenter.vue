<template>
<div class="module-wrap">
  <div class="module-head">
    创作者中心
  </div>
  <div class="module-content plr15 font12 align_center flex" style="flex-wrap: wrap;">
    <div class="ptb10" style="width: 33.3333%;" v-for="(item, index) in module" :key="index">
      <div class="icon-wrap pt5 mb10" @click="handleClick(item.value)">
        <i class="iconfont font20" :class="`icon-${item.icon}`" :style="`color: ${item.color}`"></i>
      </div>
      <div>{{item.name}}</div>
    </div>
  </div>
  <div class="module-foot p15 font12" @click="handleClick">进入创作者中心</div>
</div>
<Graph v-model:show="isshow" :data="{id: '123', ...data}" v-if="isshow" />
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  computed,
  onMounted,
  useStore,
  useRouter,
  getUid,
  ref
} from '@/utils'
import Graph from '@/views/graph/index.vue'

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter()
const module = computed(() => store.getters['user/config_talk'].creator_center);
const dataList = computed(() => store.getters['common/recommendUser']);
const isshow = ref(false)


function handleClick(param: any = "") {
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: param
  }))  
  // let url = ""
  // if (param === 'hao' || param === 'vote' || param === 'question') {
  //   url = `/${param}`
  //   router.push(url)
  // } else {
  //   url = `/content${param ? '?mod='+param : ''}`
  //   router.push(proxy.const.setUrl({
  //     uid: getUid(),
  //     query: url
  //   }))
  // }
}

function handleGraph(param: any) {
  isshow.value = true
  const doc: any = document
  doc.body.parentNode.style.overflowY = "hidden";
}
</script>

<style lang="less" scoped>
</style>
