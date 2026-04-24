<template>
    <div class="container w1100">
        <CanvasPicture :data="{...detail, coding: coding}" :detail="friendDetail" :render="init" />
    </div>
</template>

<script setup lang="ts">
import {
  computed,
  useStore,
  useRouter,
  useRoute,
  ref,
  onMounted,
  codings
} from '@/utils'
import CanvasPicture from "./canvasPicture.vue"
const coding: any = codings.user.close_friend
const router = useRouter();
const route = useRoute();
const store = useStore();
const detail = ref({})
const friendDetail: any = ref({})
const loginuser: any = computed(() => store.getters['user/loginuser']);

function getFriendDetail(){
  store.dispatch('common/Fetch', {
  api: 'closeFriendDetail',
  data: {
    id: route.query.id
  }
}).then((res: any) => {
  friendDetail.value = res.result
})
  
}


function init(param: any = {}){

  const params: any = {
    page: 1,
    pagesize: 1000
  }

  Object.assign(params, param)

  store.dispatch('common/Fetch', {
  api: 'closeFriendContent',
  data: {
    id: route.query.id,
    uid: loginuser.value.account,
    ...params
  }
}).then((res: any) => {
  detail.value = res.result
})
}



onMounted(() => {
  getFriendDetail()
  init()
})
</script>
