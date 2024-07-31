<template>
<TalkItem :loading="loading" :sourceData="dataList" />
<v-loding v-if="!loading" />
</template>

<script setup lang="ts">
import TalkItem from '../../../index/components//TalkItem/index.vue'
import {
  defineProps,
  getCurrentInstance,
  ref,
  computed,
  useStore,
  useRouter,
  getUid,
  onMounted
} from '@/utils'

const props: any = defineProps({
  sourceData: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const dataList: any = ref([])
const loginuser = computed(() => store.getters['user/loginuser']);
const loading: any = ref(false)

function init(){
  loading.value = false
  store.dispatch('talk/TalkCollect', {
  }).then((res) => {
    loading.value = true
    dataList.value = res.result
  })  
}
onMounted(init)
</script>
