<template>
<div class="container w1100 clearfix">
  <div class="w220 left">
    <Aside />
  </div>
  <div class="m0 main-center right" style="width: 870px">
    <div class="module-wrap">
      <div class="module-head">全部日程</div>
      <div class="module-content p15">
          <template v-for="(item, index) in dataList" :key="index">
            <ItemList :data="item" />
        </template>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  useStore,
  codings,
  ref,
  onMounted
} from '@/utils'
import Aside from './aside.vue'
import SystemDetail from './systemDetail.vue'
import Detail from './detail.vue'
import ItemList from '../components/itemList.vue'
const props: any = defineProps({
  dataList: {
    type: Array,
    default: () => {
      return []
    }
  },
  module: {
    type: Array,
    default: () => {
      return {}
    }
  },
  mod: {
    type: String,
    default: ""
  }
})
const store = useStore()
const coding: any = codings.user.schedule.cate
const dataList: any = ref([])

function init() {
  store.dispatch('common/Fetch', {
    api: "systemSchedule",
    data: {
      system: 1
    }
  }).then(res => {
    dataList.value = res.result || []
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
