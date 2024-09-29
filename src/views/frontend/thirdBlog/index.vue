<template>
<div class="container fixed flex" style="background: var(--module-background); top: 60px; bottom: 0px; left: 0; right: 0">
  <!-- 侧边菜单 -->
  <div class="p15" style="width: 160px">
    <Aside :data="module.third_blog" title="首页" />
  </div>
  <!-- 主内容 -->
  <div class="main-center m0 ptb25 pr25">
    <div class="relative" style="height: -webkit-fill-available;">
<div class="p15" style="background: var(--card-background); position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0; border-radius: 8px; overflow: hidden; overflow-y: auto">
    <Show v-if="route.query.id" />
    <template v-else>
      <Join v-if="route.query.type === 'join'" />
      <Main v-else />
    </template>
</div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  watch,
  useStore,
  useRoute,
  ref,
  codings
} from '@/utils'
import {
  domIsShow
} from '@/utils/fn'
import Aside from './components/aside.vue'
import Main from './components/main.vue'
import Show from './components/show.vue'
import Join from './components/join.vue'
import Blog from './blog.vue'
import Detail from './components/detail.vue'

const coding: any = codings.module.thirdBlog
const store = useStore();
const route = useRoute();
const module = computed(() => store.getters['user/config_talk']);
const userSetting = computed(() => store.getters['user/userSetting']);
let tabMenu: any = ref([{
    name: "网址导航"
  },
  {
    name: "博客大全"
  }
])
let query: any = computed(() => route.query || "");
const dataList: any = ref([])

// 监听路由
watch(route, (newValues, prevValues) => {
  let arr = ['/blog']
  if (arr.indexOf(route.path) === -1) {
    domIsShow.showDom(userSetting.value)
  }
})

function init() {
  domIsShow.hideDom()
}

onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>
.main-center {
  flex: 1;
  overflow: auto;
}
</style>
