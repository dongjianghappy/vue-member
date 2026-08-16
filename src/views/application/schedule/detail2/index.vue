<template>
<Head :data="{...detail, coding}" :render="init" />
  <div class="w180 left">
    <v-aside :data="module.schedule" title="" :isFixed="false" :query="`&id=${route.query.id}`">
      <template v-slot:aside>
      </template>
    </v-aside>
  </div>
  <div class="m0 main-center right" style="width: 910px">
  <TalkTabs ref="[{name: '项目榜', value: 'item'}, {name: '用户榜', value: 'user'}, {name: '热值榜', value: 'hot'}]" :data="tabs" :render="init" />
  <TalkItem :loading="loading" :sourceData="channel['schedule']" :render="init" />
  <v-loding v-if="!loading" />
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
import TalkTabs from '../../../index/components/TalkItem'
import TalkItem from '../../../index/components/TalkItem/index.vue'
import SystemDetail from './systemDetail.vue'
import Detail from './detail.vue'

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
