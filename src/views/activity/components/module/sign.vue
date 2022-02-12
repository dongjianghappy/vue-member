<template>
  <!-- 签到 -->
  <div class="module-wrap">
    <div class="module-content sign p0 clearfix">
      <span class="datetime">
        <i class="week">周二</i>
        <i class="time">11.09</i>
      </span>
      <span class="signin"
            @click="sign">{{userInfo.isSign ? "已签": "签到"}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'HomeViewr',
    setup(props, context) {
      const {ctx}:any = getCurrentInstance();
      const store = useStore();
      const userInfo = computed(() => store.getters['common/userInfo']);
      function sign(){
      store.dispatch('common/Fetch', {
        api: 'Sign'
      })
      }

      return { 
        sign,
        userInfo
      }
    },
})
</script>
