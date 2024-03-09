<template>
<div>
  <div class="container w1100 relative clearfix">
    <!-- 侧边菜单 -->
    <div class="left-sidebar left">
      <Aside :data="cateList" title="问答" :render="init" />
    </div>
    <!-- 主内容 -->
    <div class="main-center left">
    <Main ref="talk" />
    </div>
    <!-- 右侧 -->
    <div class="w280 right">
      <RightView :module="module.personal_center" :userInfo="userInfo" :render="init" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Aside from './aside.vue';
import {
  defineComponent,
  useStore,
  useRoute,
  computed,
  ref,
  onMounted,
  codings
} from '@/utils'

import Main from './main.vue'
import RightView from './right_aside.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Aside,
    Main,
    RightView
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const component = computed(() => route.query.mod);
    const coding = codings.questions
    const userInfo = computed(() => store.getters['user/loginuser']);
    const talk: any = ref(null)
    const module = store.getters['user/config']['questions']
    const cateList = computed(() => store.getters['talk/questionCate']);
    function cate(){
      store.dispatch('talk/questionCate', {
        data: {
          coding: coding.cate
        }
      })
    }

    function init(param: any = ""){
      return talk.value.init({
        fid: param
      })
    }

    onMounted(() => {
      cate()
    })

    return {
      component,
      module,
      cateList,
      userInfo,
      init,
      talk
    }
  }
})
</script>
