<template>
  <!-- 签到 -->
  <div class="module-wrap">
    <div class="module-content sign p0 clearfix">
      <div class="span datetime">
        <i class="week">{{datetime.week}}</i>
        <i class="time">{{datetime.year}}.{{datetime.month}}.{{datetime.day}}</i>
      </div>
      <div class="span sign-button"
           @click="sign"><i class="iconfont icon-feedback font18" />
        <span class="hassign"
              v-if="userInfo.isSign">
          已签
        </span>
        <span class="signin"
              v-else>签到</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, ref, onMounted } from 'vue'
import {useStore} from 'vuex'
import { week } from '@/assets/const'

export default defineComponent({
  name: 'HomeViewr',
    setup(props, context) {
      const {ctx, proxy}:any = getCurrentInstance();
      const store = useStore();
      const userInfo = computed(() => store.getters['common/loginuser']);

      const date = new Date();
      const datetime: any = ref({
        year: date.getFullYear(),
        month: date.getMonth()+1,
        day: date.getDate(),
        week: week[date.getDay()]
      })
      
      function sign(){
        store.dispatch('common/Fetch', {
          api: 'Sign'
        }).then(res => {
          proxy.$hlj.message({
            msg: res.result.msg
          })
        })
      }
    

      return { 
        sign,
        userInfo,
        datetime
      }
    },
})
</script>
