<template>
  <div class="col-md-3 p10" v-if="data.module !=='talk'">
    <div class="relative p15 align_center" @click="handleClick(data)" style=" background: var(--card-background); border-radius: 8px;">
      <i class="iconfont icon-dot absolute font24 cl-gray" style="top: 0px; right: 0px;" v-if="data.chockIn_status === 0" />
      <i class="iconfont icon-dot absolute font24 cl-green" style="top: 0px; right: 0px;" v-else-if="data.chockIn_status === 1" />
      <i class="iconfont icon-img font64 relative">
        <span class="absolute cl-white p5 align_center font12" v-if="data.num" style="background: rgb(255, 0, 0); top:0; right: -8px; width: 18px; max-width: 25px; height: 18px; line-height: 10px; border-radius: 100px;">{{data.num}}</span>
      </i>
      <div class="ptb10 h30 font6">{{data.name}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  useStore,
  codings,
  ref,
  onMounted,
  useRouter,
  useRoute,
  computed,
  getUid
} from '@/utils'


const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore()
const router = useRouter();
const route = useRoute();
const coding: any = codings.user.schedule.cate
const dataList: any = ref([])
const loading: any = ref(false)
const channel: any = computed(() => store.getters['talk/channel']);


function handleClick(param: any){
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/schedule?mod=detail&id=${param.id}`
  }))
}
</script>
<style scoped>
.iconfont{
  margin: 0;
}
.cl-green {
  color: #07C160 !important;
}
.cl-gray {
  color: #6f6f7c !important;
}
</style>