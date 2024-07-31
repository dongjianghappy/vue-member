<template>
<div style="height: 425px; overflow-y: auto;">
  <div class="col-sm-6" :class="className" v-for="(img, i) in history" :key="i">
    <div class="m5 relative">
      <img :src="img" height="140" style="border-radius: 8px; width: 100%" @click="handleChoose(img)" />
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
  computed
} from '@/utils'

const props: any = defineProps({
  kind: {
    type: String,
    default: "photos"
  }
})

const store = useStore();
const history: any = ref([])
const loginuser = computed(() => store.getters['user/loginuser']);

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

  })
}

function handleChoose(param: any) {
  store.dispatch('common/Fetch', {
    api: 'choosePhotos',
    data: {
      field: props.kind,
      img: param
    }
  }).then(res => {
    store.dispatch('user/Detect')
  })
}

onMounted(getHistory)
</script>
