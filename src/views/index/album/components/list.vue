<template>
<div style="height: 425px; overflow-y: auto;">
  <div class="mb15">
    提示：点选以下背景图即选中，勾选设置为无背景：<span class="ml15">
      <input type="checkbox" v-model="noUseImage" @click="handleChoose" />
    </span>
  </div>
  <div class="col-sm-6" :class="className" v-for="(img, i) in history" :key="i">
    <div class="m5 relative">
      <img :src="img" onerror="this.src='/images/head_background.png'" height="140" style="border-radius: 8px; width: 100%" @click="handleChoose(img)" />
      <i class="iconfont icon-checkbox m0 cl-red" style="right: 0px; top: 0px; padding: 2px; z-index: 1;" v-if="img === loginuser[kind]"></i>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  useStore,
  ref,
  getUid,
  onMounted,
  computed,
  getCurrentInstance
} from '@/utils'

const props: any = defineProps({
  kind: {
    type: String,
    default: "photos"
  },
  type: {
    type: String,
    default: ""
  }
})
const {
  proxy
}: any = getCurrentInstance();

const store = useStore();
const history: any = ref([])
const loginuser = computed(() => store.getters['user/loginuser']);
const noUseImage: any = ref(false)

function getHistory() {
  store.dispatch('common/Fetch', {
    api: "GetHistoryPhotos",
    data: {
      type: props.type,
      kind: props.kind,
      uid: getUid()
    }
  }).then(res => {
    history.value = res.result
    
    if(res.result.indexOf(loginuser.value[props.kind]) === -1){
      noUseImage.value = true
    }

  })
}

function handleChoose(param: any) {

  if(param){
    noUseImage.value = false;
  }

  store.dispatch('common/Fetch', {
    api: 'choosePhotos',
    data: {
      field: props.kind,
      img: noUseImage.value ? "" : param
    }
  }).then(res => {
    store.dispatch('user/Detect')
    proxy.$hlj.message({
        type: 'info',
        msg: "设置成功"
      })
  })
}

onMounted(getHistory)
</script>
