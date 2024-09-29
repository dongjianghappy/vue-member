<template>
<div class="integration-wrap absolute">
  <div class="mb5"><i class="iconfont icon-integral font14" />积分: {{userInfo.integration}} <span class="ml5 font12" @click="handleClick('integration')">查看明细</span></div>
  <div class="mb5"><i class="iconfont icon-goldcoin font14" />金币: {{userInfo.goldcoin}} <span class="ml5 font12" @click="handleClick('goldcoin')">查看明细</span></div>
  <div><i class="iconfont icon-goldcoin font14" />能量: {{userInfo.energy}} <span class="ml5 font12" @click="handleClick('energy')">查看明细</span></div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  computed,
  useStore,
  useRouter
} from '@/utils'
const props: any = defineProps({
  userInfo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter();
const loginuser = computed(() => store.getters['user/loginuser']);
const module = computed(() => store.getters['user/config_talk'].more);

function handleClick(param: any) {
  router.push(proxy.const.setUrl({
    uid: loginuser.value.account,
    query: `/info?mod=${param}`
  }))
}
</script>
