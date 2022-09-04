<template>
<div class="module-wrap">
  <div class="module-head">
    导航中心
  </div>
  <div class="module-content plr15 font12 align_center">
    <div style="display: flex">
      <div style="flex: 1">
        <div class="pt5 mb10" @click="handleSite" style="
              background: #eee;
              margin-left: 7px;
              border-radius: 50%;
              width: 40px;
              height: 40px;
            ">
            <i class="iconfont icon-website font32" style="color: #ff9800"></i>
          </div>
          <div>网站收录</div>
          
      </div>
      <div style="flex: 1">
          <div class="pt5 mb10" style="
              background: #eee;
              margin-left: 7px;
              border-radius: 50%;
              width: 40px;
              height: 40px;
            ">
            <i class="iconfont icon-question font32" style="color: #ff9800"></i>
          </div>
          <div>问答中心</div>
      </div>
      <div style="flex: 1">
        
          <div class="pt5 mb10" style="
              background: #eee;
              margin-left: 7px;
              border-radius: 50%;
              width: 40px;
              height: 40px;
            ">
            <i class="iconfont icon-star font32" style="color: #ff9800"></i>
          </div>
          <div>视频教程</div>
      </div>
      <div style="flex: 1">
          <div class="pt5 mb10" style="
              background: #eee;
              margin-left: 7px;
              border-radius: 50%;
              width: 40px;
              height: 40px;
            ">
            <i class="iconfont icon-star font32" style="color: #ff9800"></i>
          </div>
          <div>前端题库</div>
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

    function handleSite(){
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
