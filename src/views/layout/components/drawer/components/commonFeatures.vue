<template>
  <div class="p0 bold">
      常用功能
  </div>
  <div class="flex mb15" style="flex-wrap: wrap; line-height: 20px;">
      <div class="ptb10" style="flex: 1" v-for="(item, index) in module" :key="index">
          <div @click="handleClick(item.value)">{{item.name}}</div>
      </div>
  </div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  computed,
  onMounted,
  useStore,
  useRouter,
  getUid,
  ref
} from '@/utils'

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter()
const module = computed(() => store.getters['user/config_talk'].common_features);


function handleClick(param: any = "") {
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: param
  })) 
}
</script>
