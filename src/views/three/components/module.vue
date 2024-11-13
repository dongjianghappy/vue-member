<template>
<div class="module-wrap">
  <div class="module-content p15">
    <span @click="handleClick">进入我的星球世界</span>
  </div>
  </div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  computed,
  useStore,
  ref,
  useRouter,
  getUid
} from '@/utils'

import Detail from './detail.vue'
import Sea from './sea.vue'

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter()
const dataList: any = ref([])
let current: any = ref(0)

function init() {
  store.dispatch('common/Fetch', {
    api: "seaFish",
    data: {
      type: 1
    }
  }).then(res => {
    dataList.value = res.result || []
  })
}

function handleClick(){
  store.commit("user/setIsThree", 'true')
}

onMounted(init)
</script>
