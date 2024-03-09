<template>
<div>
  <div class="container w1100">
    <UserInfoHead />
  </div>
  <div class="container w1100 relative clearfix">
    <!-- 侧边菜单 -->
    <div class="left">
      <Aside :data="module.home_nav" title="首页" />
    </div>
    <!-- 主内容 -->
    <div class="right" style="width: 910px;">
      <div class="module-wrap">
        <!-- <div class="module-head p20 font22">个人档</div> -->
        <div class="module-content basic-info" style="height: 560px;">
          <div class="font18 bold">个人档</div>
          <div style="display: flex">
            <!-- <div class="mr25" style="width: 180px; height: 210px">
              <img :src="userInfo.photos" onerror="this.src='http://www.yunxi10.com/source/public/images/head_normal_100.png'" width="180" height="180" style=" border-radius: 8px; cursor:pointer; display: inline-block;">
            </div> -->
            <div class="form-wrap-box" style="overflow: hidden;">
              <ul>
                <li class="li col-md-4"><span class="label">姓名</span>{{userInfo.nickname}}</li>
                <li class="li col-md-8"><span class="label">国籍</span>中国</li>
                <li class="li col-md-4"><span class="label">职业</span>学生</li>
                <li class="li col-md-8"><span class="label">年龄</span>17</li>
                <li class="li col-md-4"><span class="label">性别</span>男</li>
                <li class="li col-md-8"><span class="label">生日</span>02.26</li>
                <li class="li col-md-4"><span class="label">星座</span>白羊座</li>
                <li class="li col-md-8"><span class="label">兴趣</span>篮球</li>
              </ul>
            </div>
          </div>

          <div class="mt25 font18 bold">活跃概况</div>
          <div class="form-wrap-box" style="overflow: hidden;">
            <ul>
              <li class="li col-md-4"><span class="label">加入时间</span>{{userInfo.nickname}}</li>
              <li class="li col-md-8"><span class="label">最近登录</span>中国</li>
              <li class="li col-md-4"><span class="label">在线状态</span>学生</li>
              <li class="li col-md-8"><span class="label">所在地区</span>广州</li>
            </ul>
          </div>

          <div class="mt25 font18 bold">统计信息</div>
          <div class="form-wrap-box" style="overflow: hidden;">
            <ul>
              <li class="li col-md-4"><span class="label">访客</span>123323</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  useStore
} from '@/utils'

import UserInfoHead from './components/UserInfoHead.vue'
import Aside from './components/aside.vue'

export default defineComponent({
  name: 'AsideView',
  components: {
    UserInfoHead,
    Aside
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store: any = useStore()
    const isShow: any = ref(false)
    const userInfo: any = computed(() => store.getters['user/userInfo']);
    const module = computed(() => store.getters['user/config_talk']);
    const detail: any = ref({})

    function handleclick() {
      isShow.value = true
    }

    function init() {

    }
    return {
      userInfo,
      module,
      handleclick,
      init,
      detail
    }
  }
})
</script>
