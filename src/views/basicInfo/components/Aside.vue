<template>
  <div class="module-wrap mb15">
    <!--<div class="module-head head">设置管理</div>-->
    <div class="module-content h500">
      <ul class="p10">
        <li class="list"
            style="height:40px;"
            v-for="(item, index) in menu"
            :key="index"
            @click="routing(item.url)"><i class="iconfont icon-dot"
             style="color: #ccc;"></i>{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue'
import { basicInfo } from '@/assets/const'
import {useRouter, useRoute} from 'vue-router'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'AsideView',
  setup(props,context) {
  const {ctx, proxy}:any = getCurrentInstance();
  const store = useStore();
  const menu: any = basicInfo;
  const route = useRoute();
  const router = useRouter();
  const loginuser = computed(() => store.getters['common/loginuser']);
  
  
  // 路由跳转 
  function routing(param: any){
    router.push(proxy.const.setUrl({
      uid: loginuser.value.account,
      query: `/info/?mod=${param}`
    }))     
  }

  return {
    routing,
    menu
  }
}
})
</script>
