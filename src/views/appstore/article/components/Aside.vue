<template>
  <div class="module-wrap shadow mb15">
    <div class="module-head head p20">内容资讯</div>
    <div class="module-content bb h500">
      <ul class="p10">
        <li class="list"
            style="padding: 8px 0;"
            v-for="(item, index) in menu"
            :key="index"
            @click="handleclick(item.path)">
          <i class="iconfont icon-dot"
             style="color: #ccc;"></i> {{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, useStore, useRouter, useRoute } from '@/utils'

export default defineComponent({
  name: 'AsideView',
  data() {
  return {
    menu:[
      {name: "全部", path: ""},
      {name: "已审核", path: "audited"},
      {name: "未审核", path: "unAudited"},
      {name: "被退回", path: "returned"},
      {name: "发布内容", path: "details"}
    ]
  }
},
  setup(props,context) {
    const {ctx, proxy}:any = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const loginuser = computed(() => store.getters['common/loginuser']);
    const groups = computed(() => store.getters['common/groups']);
        
    function handleclick(param:any){
      let query =  ""
      if(param){
         query = param === 'details' ? `&item=${param}&action=add` : `&item=${param}`
      }

      router.push(proxy.const.setUrl({
        uid: loginuser.value.account,
        query: `/appstore/?mod=${route.query.mod}${query}`
      }))
    }
    
    return {
      handleclick,
      groups
    }
  }
})
</script>
