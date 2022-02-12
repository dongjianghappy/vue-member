<template>
  <div class="module-wrap mb15">
    <div class="module-head head p20">消息管理</div>
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
      {name: "系统", url: "/information/?mod=system"},
      {name: "微博", url: "/information/?mod=talk"},
      {name: "私信", url: "/information/?mod=letter"},
      {name: "问答", url: "/information/?mod=question"},
      {name: "其他", url: "/information/?mod=other"}
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
