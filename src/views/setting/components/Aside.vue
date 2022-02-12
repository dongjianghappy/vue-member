<template>
  <div class="module-wrap mb15">
    <!--<div class="module-head head">设置管理</div>-->
    <div class="module-content h500">
      <ul class="p10">
        <li class="list"
            style="height:40px;"
            v-for="(item, index) in menu"
            :key="index"
            @click="aa(item.url)"><i class="iconfont icon-dot"
             style="color: #ccc;"></i>{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import {useRouter, useRoute} from 'vue-router'

export default defineComponent({
  name: 'AsideView',
    data() {
  return {
    menu: [
      {name: "登录信息", url: "/setting/?mod=safe"},
      {name: "积分明细", url: "/setting/?mod=integration"},
      {name: "签到列表", url: "/setting/?mod=sign"},
      {name: "我的卡卷", url: "/setting/?mod=card"},
      {name: "我的订单", url: "/setting/?mod=order"}
    ]
  }
},
  setup(props,context) {
  const {ctx}:any = getCurrentInstance();
  
  const router = useRouter();
  
  
  function aa(v:any){
    router.push(v)
  }

  return {
    aa
  }
}
})
</script>
