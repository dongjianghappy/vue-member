<template>
  <div class="module-wrap">
    <div class="module-head">
      <a href="/110506372/home?mod=integration&amp;action=all"
         class="inline mr10">积分明细</a>

    </div>
    <div class="module-content p10"
         style="padding-bottom: 25px !important; height:auto"
         v-for="(item, index) in appstore"
         :key="index">
      <div class="p10 cl-white"
           style=" background: #9fdfc2;">可用积分 125</div>
      <div class="p10"
           style="color: #f67f00">{{item.month}}</div>
      <div class="media-wrap p10 bg-f9f9f9"
           style="text-align:center"
           v-for="(list, i) in item.list"
           :key="i">
        <div class="media-left">
          <img :src="list.photos"
               class="showuserinfo"
               data-uid="110506372"
               data-placement="automatic"
               data-toggle="tooltip35"
               data-left="150"
               style="border-radius:50%; width:45px; height:45px;">
        </div>
        <div class="media-body align_left"
             style="padding:16px; width:100%;">
          {{list.times}} [ <span style="color: #f67f00">签到</span> ]
          <span class="right">+1</span>
        </div>
      </div>

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
    const appstore = computed(() => store.getters['common/integration']);

    function init(param: any){
      store.dispatch('common/Integration', {
        ...param
      })
    }
    init({})
    return { 
      init,
      appstore
    }  
  }
  
})
</script>
