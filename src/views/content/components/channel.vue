<template>
<div class="module-wrap">
  <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 510px">
    <div class="mb15 font18 bold">频道中心</div>
    <template v-for="(item, index) in dataList" :key="index">
      <div class="col-md-3 p10" v-if="item.module !=='talk'">
        <div class="p15 align_center" @click="handleclick(`/${item.module}`, item.grade)" style=" background: var(--card-background); border-radius: 8px;">
          <div class="ptb10 font6">{{item.name}}</div>
        </div>
      </div>
    </template>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  ref,
  computed,
  useStore,
  useRouter
} from '@/utils'

const {
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
</script>
