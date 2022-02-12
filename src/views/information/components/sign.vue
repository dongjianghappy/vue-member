<template>
  <div class="module-wrap">
    <div class="module-head">签到列表</div>
    <div class="module-content p10"
         style="padding-bottom: 25px !important;">
      <template v-for="(item, index) in signList"
                :key="index">
        <div class="p10"
             style="color: #f67f00">{{item.month}}</div>

        <div class="bg-f9f9f9 p10"
             style="margin-top:1px"
             v-for="(list, i) in item.list"
             :key="i">{{list.times}}</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'AsideView',
  setup(props, context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const signList = computed(() => store.getters['common/signList']);

    function init(param: any){
      store.dispatch('common/SignList', {
        ...param
      })
    }
    init({})
    return { 
      init,
      signList
    }  
  }  
  
})
</script>
