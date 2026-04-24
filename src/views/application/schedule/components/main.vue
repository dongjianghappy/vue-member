<template>
<div class="module-wrap">
  <div class="module-content p15">
      <template v-for="(item, index) in dataList" :key="index">
        <ItemList :data="item" />
    </template>
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
import SystemDetail from './systemDetail.vue'
import Detail from './detail.vue'
import ItemList from '../detail/itemList.vue'
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
    api: "schedule",
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
