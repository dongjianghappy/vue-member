<template>
<ul>
  <li @click="handleClick('concernmy')" class="pointer">
    <span><strong>{{userInfo.concernmy}}</strong><span>粉丝</span></span>
  </li>
  <li @click="handleClick('myconcern')" class="pointer">
    <span><strong>{{userInfo.myconcern}}</strong><span>关注</span></span>
  </li>
  <li @click="handleClick('praise')" class="pointer">
    <a><strong>{{userInfo.talk}}</strong><span>获赞</span></a>
  </li>
</ul>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed
} from 'vue'
import {
  useStore,
  useRouter,
  getUid
} from '@/utils'
export default defineComponent({
  name: 'v-Concern',
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const {
      proxy
    }: any = getCurrentInstance();
    const userInfo = computed(() => store.getters['user/userInfo']);

    function handleClick(param: any) {
      if (param === 'praise') {
        router.push(proxy.const.setUrl({
          uid: getUid(),
          query: `?mod=${param}`
        }))
      } else {
        router.push(proxy.const.setUrl({
          uid: getUid(),
          query: `/concern?mod=${param}`
        }))
      }
    }
    return {
      userInfo,
      handleClick
    }
  }
})
</script>
