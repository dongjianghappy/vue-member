<template>
  <div class="module-wrap shadow mb15">
    <div class="module-head head p20">我的日志</div>
    <div class="module-content bb h300">
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
  <v-timeline />
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, useStore, useRouter, useRoute } from '@/utils'

export default defineComponent({
  name: 'AsideView',
  data() {
  return {
    menu:[
      {name: "所有日志", path: ""},
      {name: "发布日志", path: "details"}
    ]
  }
},
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const groups = computed(() => store.getters['user/groups']);
        
    function handleclick(param:any){
      let query =  ""
      if(param){
         query = param === 'details' ? `&item=${param}&action=add` : `&item=${param}`
      }

      router.push(`/journal/?${query}`)
    }
    
    return {
      handleclick,
      groups
    }
  }
})
</script>
