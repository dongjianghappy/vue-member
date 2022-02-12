<template>
  <div class="module-wrap">
    <div class="module-content user-photos p0">
      <div class="user-head">
        <v-avatar :data="loginuser" />
      </div>
      <div class="user-info">
        <div class="name-box">
          {{loginuser.nickname}} <span style="color: #f67f00;">LV.{{loginuser.level}}</span></div>
        <div class="name-atten">
          <v-concern />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue'
import {useStore} from 'vuex'
import {useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'

export default defineComponent({
  name: 'HomeViewr',
    setup(props, context) {
      const {ctx}:any = getCurrentInstance();
      const store = useStore();
      const router = useRouter();
      const loginuser = computed(() => store.getters['common/loginuser']);
      
      function handel(){
        router.push(`/u/${loginuser.value.account}/home`)
      }
      return { 
        loginuser,
        handel
      }
    },
})
</script>
