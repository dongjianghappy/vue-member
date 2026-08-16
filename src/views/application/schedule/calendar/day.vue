<template>
<div class="container w1100 clearfix">
  <div class="w220 left">
    <Aside :data="{mod: 'day', date: route.query.date}" />
  </div>
  <div class="m0 main-center right" style="width: 870px">
    <TalkItem :loading="loading" :sourceData="channel['schedule']" :render="init" />
    <v-loding v-if="!loading" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  computed,
  useRoute,
  useStore,
  getUid
} from '@/utils'
import Aside from '../components/aside.vue'
import TalkItem from '../../../index/components/TalkItem/index.vue'

const store = useStore();
const route = useRoute();
const dataList: any = ref([])
const loading: any = ref(false)
const channel: any = computed(() => store.getters['talk/channel']);

function init(param: any = {}) {
  loading.value = false
  const params: any = {
    page: 1,
    pagesize: 10
  }

  Object.assign(params, param)

  if(route.query.date){
    let date: any = route.query.date
    let arr = date.split('-')
    params.year = arr[0]
    params.month = arr[1]
    params.day = arr[2]
  }

  store.dispatch(`talk/comprehensive`, {
    state: 'schedule',
    data: {
      type: 'schedule',
      uid: getUid(),
      schedule_id: route.query.id,
      ...params
    }
  }).then((res) => {
    loading.value = true
  })
}

onMounted(init)
</script>
