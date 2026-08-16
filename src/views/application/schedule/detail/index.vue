<template>
<Head :data="{...detail, coding}" :render="getScheduleDetail" />
  <div class="w180 left">
    <Aside :data="detail.system === '1' ? module.schedule : module.schedule_custom" title="" :isFixed="false" :query="`&id=${route.query.id}`" />
  </div>
  <div class="m0 main-center right" style="width: 910px">
    <Dynamics v-if="route.query.item === 'talk'" />
    <UserList v-else-if="route.query.item === 'user'" />
    <Data :data="detail" v-else-if="route.query.item === 'data'" />
    <!-- <Month :data="{path: '/schedule?mod=custom&item=record', type: 'custom'}" v-else-if="route.query.item === 'month'" /> -->
    <Day v-else-if="route.query.item === 'day'" />
    <Record :data="detail" v-else />
  </div>
</template>

<script setup lang="ts">
import {
  useStore,
  codings,
  ref,
  onMounted,
  useRoute,
  computed,
  getUid
} from '@/utils'
import Head from '../components/head.vue'
import Aside from './components/Aside.vue'
import Dynamics from '../components/dynamics.vue'
import Record from './record/index.vue'
import UserList from './user/index.vue'
import Data from './data/index.vue'
import Day from '../calendar/day.vue'

const store = useStore()
const route = useRoute();
const coding: any = codings.user.schedule.cate
const detail: any = ref({})
const dataList: any = ref([])
const loading: any = ref(false)
const module = computed(() => store.getters['user/config_talk']);
const channel: any = computed(() => store.getters['talk/channel']);

document.documentElement.scrollTop = 0

function getScheduleDetail() {
  store.dispatch('common/Fetch', {
    api: 'scheduleDetailInfo',
    data: {
      id: route.query.id,
      coding
    }
  }).then((res) => {
    detail.value = res.result
  })
}


function init(param: any = {}) {
  loading.value = false
  const params: any = {
    page: 1,
    pagesize: 10
  }

  Object.assign(params, param)
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

onMounted(() => {
  getScheduleDetail()
  init()
})
</script>

<style lang="less" scoped>
.photos {
  width: 80px;

  img {
    width: 50px;
    height: 50px;
  }
}

.item-thum-wrap {
  .num {
    font-size: 18px;
    font-weight: bold;
    color: #999;
  }

  &:nth-child(1) {
    .num {
      color: #f44f4f;
    }
  }

  &:nth-child(2) {
    .num {
      color: #ff761e;
    }
  }

  &:nth-child(3) {
    .num {
      color: #f1a905;
    }
  }
}
</style>
