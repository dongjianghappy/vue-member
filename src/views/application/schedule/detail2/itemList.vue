<template>
  <div class="col-md-3 p10" v-if="data.module !=='talk'">
    <div class="p15 align_center" @click="handleClick(data)" style=" background: var(--card-background); border-radius: 8px;">
      <i class="iconfont icon-img font32" />
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
