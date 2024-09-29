<template>
<div class="module-wrap">
  <div class="module-content plr15 font12 align_center">
    <div style="display: flex">
      <div style="flex: 1">
        <div class="icon-wrap pt5 mb10" @click="handleClick('hao')">
          <i class="iconfont icon-website font20" style="color: #ff9800"></i>
        </div>
        <div>网站收录</div>

      </div>
      <div style="flex: 1">
        <div class="icon-wrap pt5 mb10" @click="handleClick('question')">
          <i class="iconfont icon-question font20" style="color: #ff9800"></i>
        </div>
        <div>问答中心</div>
      </div>
      <div style="flex: 1">

        <div class="icon-wrap pt5 mb10" @click="handleClick('vote')">
          <i class="iconfont icon-star font20" style="color: #ff9800"></i>
        </div>
        <div>视频教程</div>
      </div>
    </div>

    <!--  -->
    <div class="mt15" style="display: flex">
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
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  onMounted,
  useStore,
  useRouter,
  getUid
} from '@/utils'

export default defineComponent({
  name: 'RecommendUserView',
  components: {

  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter()
    const dataList = computed(() => store.getters['common/recommendUser']);

    function init() {
      store.dispatch('common/RecommendUser')
    }

    function handleSite() {
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: `/haosite`
      }))
    }

    onMounted(init)
    return {
      dataList,
      init,
      handleSite
    }
  },
})
</script>

<style lang="less" scoped>
.icon-wrap {
  background: #eee;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  line-height: 50px;
  display: inline-block;
}
</style>
