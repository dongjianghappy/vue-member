<template>
<div class="module-wrap">
  <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 510px">
    <div class="mb15 font18 bold">内容管理</div>
    <div class="col-md-3 p10" v-for="(item, index) in dataList" :key="index">
      <div class="p15 align_center" @click="handleclick(`/${item.module}`, item.grade)" style=" background: #f9f9f9; border-radius: 8px;">
        <div class="ptb10 font6">{{item.name}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  computed,
  useRouter,
  getUid
} from '@/utils'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'AsideView',
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const dataList = computed(() => store.getters['common/appstore']);
    const loginuser = computed(() => store.getters['user/loginuser']);

    store.dispatch('common/Appstore', {
      type: 1
    })

    function handleclick(param: any, grade: any) {

      router.push(`${proxy.const.u}${loginuser.value.account}${param}`)
    }
    return {
      dataList,
      handleclick
    }
  }

})
</script>
