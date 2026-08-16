<template>
<Head :data="{...detail, coding}" :render="init" />
  <div class="w220 left">
    <Aside :data="{mod: 'detail', id: route.query.id}" />
  </div>
  <div class="m0 main-center right" style="width: 870px">
    <List v-if="component === 'list'" />
    <Main v-else-if="component === 'fish'" />
    <Ranking v-else />
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
import Head from './head.vue'
import Aside from '../components/aside.vue'
import Main from './main.vue'
import Ranking from './ranking.vue'
import List from './list.vue'

const store = useStore()
const route = useRoute();
const coding: any = codings.user.schedule.cate
const detail: any = ref({})
const dataList: any = ref([])
const loading: any = ref(false)
const channel: any = computed(() => store.getters['talk/channel']);
const component = computed(() => route.query.item);

document.documentElement.scrollTop = 0

function getScheduleDetail() {
  store.dispatch('common/Fetch', {
    api: 'detail',
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
