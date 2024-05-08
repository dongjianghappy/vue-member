<template>
<div class="integration-wrap absolute">
  <div class="mb5"><i class="iconfont icon-integral font14" />积分: {{userInfo.integration}} <span class="ml5 font12" @click="handleClick('integration')">查看明细</span></div>
  <div><i class="iconfont icon-goldcoin font14" />金币: {{userInfo.goldcoin}} <span class="ml5 font12" @click="handleClick('goldcoin')">查看明细</span></div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  onMounted,
  computed,
  useStore,
  useRouter,
  codings
} from '@/utils'
export default defineComponent({
  name: 'v-Audio',
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
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

    return {
      module,
      handleClick
    }
  }
})
</script>

<style lang="less" scoped>
.icon-wrap {
  background: #eee;
  border-radius: 4px;
  width: 50px;
  height: 50px;
  line-height: 60px;
  display: inline-block;
}
</style>
