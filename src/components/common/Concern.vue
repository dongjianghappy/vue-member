<template>
  <ul>
    <li @click="handleClick('myconcern')"
        class="pointer">
      <span><strong>{{userInfo.myconcern}}</strong><span>关注</span></span>
    </li>
    <li @click="handleClick('concernmy')"
        class="pointer">
      <span><strong>{{userInfo.concernmy}}</strong><span>粉丝</span></span>
    </li>
    <li>
      <a><strong>{{userInfo.talk}}</strong><span>话题</span></a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue'
import {useStore} from 'vuex'
import {useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { getUid } from '@/utils';

export default defineComponent({
  name: 'v-Search',
  components: {

  },

  setup(props,context) {
    const store = useStore();
    const router = useRouter();
    const {ctx, proxy}:any = getCurrentInstance();
    const userInfo = computed(() => store.getters['common/userInfo']);

    function handleClick(param:any){
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: `/concern?mod=${param}`
      }))
    }
    return {
      userInfo,
      handleClick
    }
  }
})
</script>
