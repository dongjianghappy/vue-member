<template>
  <div class="module-wrap">
    <div class="module-head">登录信息</div>
    <div class="module-content p10"
         style="padding-bottom: 25px !important; height:120px">
      <div class=" media-wrap p10 bg-f9f9f9"
           style="text-align:center">
        <div class="media-left"></div>
        <div class="media-body align_left"
             style="padding:16px; width:100%;">
          当前登录时间：2021-11-16 21:21:11
        </div>
      </div>
      <!--<div class=" media-wrap p10 bg-f9f9f9" style="text-align:center">
                    <div class="media-left"></div>
                    <div class="media-body align_left" style="padding:16px; width:100%;">
                        上次登录时间：
                    </div>
                </div>-->
    </div>
  </div>
  <div class="module-wrap">
    <div class="module-head">
      <a href="/110506372/home?mod=integration&amp;action=all"
         class="inline mr10">历史登录</a>
    </div>
    <div class="module-content p10"
         style="padding-bottom: 25px !important; height:auto">
      <div class="bg-f9f9f9 mb10"
           style="padding:16px; height:50px;">
        <div class="col-md-5">登录方式</div>
        <div class="col-md-3">IP</div>
        <div class="col-md-2">地区</div>
        <div class="col-md-2">登录时间</div>
      </div>
      <div class="bg-f9f9f9 mb10"
           style="padding:16px; height:50px;"
           v-for="(item, index) in logList"
           :key="index">
        <div class="col-md-5">账号登录</div>
        <div class="col-md-3">{{item.ip || "-"}}</div>
        <div class="col-md-2">{{item.area || "-"}}</div>
        <div class="col-md-2">{{item.times}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, computed, ref } from '@/utils'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'AsideView',
setup(props,context) {
    const {ctx, proxy}:any = getCurrentInstance();
    const userInfo: any = computed(() => store.getters['user/userInfo']);
    const store = useStore();
    const logList: any = ref([])
  
    function init(){
      store.dispatch('common/Fetch', {
        api: 'LoginLog',
        data: {
          uid: userInfo.value.account
        }
      }).then(res => {
        logList.value = res.result
      })
    }

    onMounted(init)
    return {
      logList
    }
  }  
  
})
</script>
