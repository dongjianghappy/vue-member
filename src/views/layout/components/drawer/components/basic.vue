<template>
  <div class="flex mb15" style="flex-wrap: wrap; line-height: 10px;">
      <div class="ptb10" style="flex: 1" v-for="(item, index) in module" :key="index">
          <div class="pt5 mb10" @click="handleClick(item.value)">
              <i class="iconfont font32" :class="`icon-${item.icon}`" :style="`color: ${item.color}`"></i>
          </div>
          <div>{{item.name}}</div>
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
const module = computed(() => store.getters['user/config_talk'].leveling_system);


function handleClick(param: any = "") {
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: param
  })) 
}
</script>
