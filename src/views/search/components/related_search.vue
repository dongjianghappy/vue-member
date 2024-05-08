<template>
<div class="module-wrap w280" :class="{'aside_nav sidebar_fixed': true}">
  <div class="module-head p15 ">
    相关搜索
    <span class="right">
      <!-- <v-refresh :data="rankingList" v-model:number="current" size="4" /> -->
    </span>
  </div>
  <div class="module-content p0">
    <ul v-if="search.related.length > 0">
      <li v-for="(item, index) in search.related" :key="index">
        <div class="item-title relative p15" @click="handleSearch(item.word)">
          <i class="iconfont icon-search"></i> {{item.word}}
        </div>
      </li>
    </ul>
    <v-nodata v-else trip="暂无相关搜索" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  useStore,
  computed,
  ref,
  useRouter
} from '@/utils'
import VueEvent from '@/utils/event'
export default defineComponent({
  name: 'HomeViewr',
  props: {
    style: {
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
    const store = useStore();
    const router = useRouter();
    const rankingList = computed(() => store.getters['common/ranking']);
    const search: any = computed(() => store.getters['talk/search']);
    let current: any = ref(0)

    function handleSearch(key: any) {
      VueEvent.emit("search", key);
    }

    // 初始化数据
    function init() {
      proxy.$scroll.init({
        win: {
          el: window,
          y: document.getElementsByClassName("space-name").length > 0 ? document.getElementsByClassName("space-name")[0].clientHeight : 0,
          b: 80
        },
        doc: {
          el: 'sidebar_fixed'
        },
        type: "fixed"
      })
    }

    onMounted(() => {
      init()
    })

    return {
      rankingList,
      search,
      current,
      handleSearch
    }
  },
})
</script>
