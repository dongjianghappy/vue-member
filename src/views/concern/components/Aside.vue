<template>
  <div class="module-wrap mb15">
    <div class="module-head head p20">{{mod === 'myconcern' ? '关注' : '粉丝'}}</div>
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
import { defineComponent, getCurrentInstance } from 'vue'
import { basicInfo } from '@/assets/const'
import {useRouter, useRoute} from 'vue-router'

export default defineComponent({
  name: 'AsideView',
  props: {
    mod: {
      type: String,
      defualt: "myconcern"
    }
  },
  setup(props,context) {
  const {ctx}:any = getCurrentInstance();
  const menu: any = basicInfo;
  
  const router = useRouter();
  
  
  // 路由跳转
  function routing(param: any){
    router.push(`/info/?mod=${param}`)
  }

  return {
    routing,
    menu
  }
}
})
</script>
