<template>
<div class="container fixed flex" style="background: var(--module-background); top: 60px; bottom: 0px; left: 0; right: 0">
  <!-- 侧边菜单 -->
  <div class="p15" style="width: 160px">
    <Aside :data="module.recommend" title="首页" />
  </div>
  <!-- 主内容 -->
  <div class="main-center m0 ptb25 pr25">
    <Camera :dataList="channel.camera" v-if="component==='camera'" />
    <Vlog :dataList="channel.vlog" v-else-if="component==='vlog'" />
    <Album v-else-if="component==='album'" />
    <Bookmark v-else-if="component==='bookmark'" />
    <Journal v-else-if="component==='journal'" />
    <Recommend ref="recommend" :dataList="channel.recommend" v-else />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  computed,
  useStore,
  useRoute,
  ref,
  watch,
} from '@/utils'

import Aside from './components/aside.vue'
import Recommend from './recommend.vue'
import Camera from './camera.vue'
import Vlog from './vlog.vue'
import Album from './album.vue'
import Bookmark from './bookmark.vue'
import Journal from './journal/index.vue'


const store = useStore();
const route = useRoute();
const channel: any = computed(() => store.getters['talk/channel']);
const component: any = computed(() => {
  let arr = route.path.split("/")
  return arr[arr.length - 1]
});
const module = computed(() => store.getters['user/config_talk']);
const recommend: any = ref(null)
let height: any = ref("")

// 监听路由
watch(route, (newValues, prevValues) => {
  let theme: any = document.getElementsByClassName('theme')
  let arr = ['/recommend', '/camera', '/vlog', '/album', '/bookmark', '/journal']
  if (arr.indexOf(route.path) > -1) {
    if(route.path === '/album' || route.path === '/bookmark' || route.path === '/journal') {
      return
    }
    let arr: any = route.path.split("/")
    component.value = arr[arr.length - 1]
    init()
  } else {
    theme[0].style.zIndex = "10000"
    store.commit('talk/setCommentStatus', false)
  }
})

function init() {
  let theme: any = document.getElementsByClassName('theme')
  if (theme.length) {
    theme[0].style.zIndex = "-1"
  }

  let params: any = {
    pagesize: '25',
    page: 0
  }

  if (component.value === 'camera') {
    params.category = 'img'
  } else if (component.value === 'vlog') {
    params.category = 'video'
  }

  store.dispatch('talk/recommendTalk', {
    state: component.value,
    data: {
      ...params
    }
  }).then(res => {
    if (component.value === 'recommend') {
      recommend.value.init(res.result.list[0])
    }
    if (document.getElementsByClassName('swiper-wrap').length > 0) {
      height.value = document.getElementsByClassName('swiper-wrap')[0].clientHeight
    }
  })
}

onMounted(() => {
  store.commit('talk/setCommentStatus', false)
  init()
})
</script>

<style lang="less" scoped>
.main-center {
  flex: 1;
  overflow: auto;
}
</style>
