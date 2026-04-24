<template>
<div class="home">
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
  computed,
  getUid
} from '@/utils'
import TalkTabs from '../../../index/components/TalkItem'
import TalkItem from '../../../index/components/TalkItem/index.vue'
import SystemDetail from './systemDetail.vue'
import Detail from './detail.vue'

const store = useStore()
const coding: any = codings.user.schedule.cate
const dataList: any = ref([])
const loading: any = ref(false)
const channel: any = computed(() => store.getters['talk/channel']);


function init(param: any) {
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
      ...params
    }
  }).then((res) => {
    loading.value = true
  })
}

onMounted(init)
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
