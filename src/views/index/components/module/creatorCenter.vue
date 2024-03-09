<template>
<div class="module-wrap">
  <div class="module-head">
    创作者中心
  </div>
  <div class="module-content plr15 font12 align_center flex">
    <div style="flex: 1">
      <div class="icon-wrap pt5 mb10" @click="handleClick('channel')">
        <i class="iconfont icon-content font20" style="color: #ff9800"></i>
      </div>
      <div>内容管理</div>

    </div>
    <div style="flex: 1">
      <div class="icon-wrap pt5 mb10" @click="handleClick('visitor')">
        <i class="iconfont icon-visitor font20" style="color: #ff9800"></i>
      </div>
      <div>访客中心</div>
    </div>
    <div style="flex: 1">

      <div class="icon-wrap pt5 mb10" @click="handleGraph(item)">
        <i class="iconfont icon-mood font20" style="color: #ff9800"></i>
      </div>
      <div>绘图工具</div>
    </div>
  </div>
  <div class="module-content plr15 font12 align_center">
    <div style="display: flex">
      <div style="flex: 1">
        <div class="icon-wrap pt5 mb10" @click="handleClick('contribution')">
          <i class="iconfont icon-contribution font20" style="color: #ff9800"></i>
        </div>
        <div>贡献活动</div>

      </div>
      <div style="flex: 1">

        <div class="icon-wrap pt5 mb10" @click="handleClick('vote')">
          <i class="iconfont icon-vote font20" style="color: #ff9800"></i>
        </div>
        <div>投票调查</div>
      </div>
      <div style="flex: 1">
        <div class="icon-wrap pt5 mb10" @click="handleClick('question')">
          <i class="iconfont icon-question font20" style="color: #ff9800"></i>
        </div>
        <div>问答中心</div>
      </div>
    </div>

    <!-- <div class="mt15" style="display: flex">
      <div style="flex: 1">
        <div class="icon-wrap pt5 mb10" @click="handleClick('hao')">
          <i class="iconfont icon-star font20" style="color: #ff9800"></i>
        </div>
        <div>前端题库</div>
      </div>
      <div style="flex: 1">
        <div class="icon-wrap pt5 mb10" @click="handleClick('hao')">
          <i class="iconfont icon-question font20" style="color: #ff9800"></i>
        </div>
        <div>CSS3动画</div>
      </div>
      <div style="flex: 1">

        <div class="icon-wrap pt5 mb10" @click="handleClick('hao')">
          <i class="iconfont icon-star font20" style="color: #ff9800"></i>
        </div>
        <div>Canvas</div>
      </div>
    </div> -->
  </div>
  <div class="module-foot p15 font12" @click="handleClick">进入创作者中心</div>
</div>
<Graph v-model:show="isshow" :data="{id: '123', ...data}" v-if="isshow" />
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  onMounted,
  useStore,
  useRouter,
  getUid,
  ref
} from '@/utils'
import Graph from '@/views/graph/index.vue'

export default defineComponent({
  name: 'RecommendUserView',
  components: {
    Graph
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter()
    const dataList = computed(() => store.getters['common/recommendUser']);
    const isshow = ref(false)

    function init() {
      store.dispatch('common/RecommendUser')
    }

    function handleClick(param: any = "") {
      let url = ""
      if (param === 'hao' || param === 'vote' || param === 'question') {
        url = `/${param}`
        router.push(url)
      } else {
        url = `/content${param ? '?mod='+param : ''}`
        router.push(proxy.const.setUrl({
          uid: getUid(),
          query: url
        }))
      }
    }

    function handleGraph(param: any) {
      isshow.value = true
      const doc: any = document
      doc.body.parentNode.style.overflowY = "hidden";
    }

    onMounted(init)
    return {
      dataList,
      init,
      handleClick,
      isshow,
      handleGraph
    }
  },
})
</script>

<style lang="less" scoped>
.icon-wrap {
  background: #eee;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
}
</style>
