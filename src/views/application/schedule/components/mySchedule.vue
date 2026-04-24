<template>
<div class="module-wrap">
  <div class="module-head">系统日程
    <span class="right"><SystemDetail :data="{schedule_id, coding}" :render="init" /></span>
  </div>
  <div class="module-content p15">
        <template v-for="(item, index) in systemList.system" :key="index">
      <ItemList :data="item" />
    </template>
  </div>
</div>

<div class="module-wrap">
  <div class="module-head">我的日程
    <span class="right"><Detail :data="{coding}" /></span>
  </div>
  <div class="module-content p15">
        <template v-for="(item, index) in systemList.customize" :key="index">
      <ItemList :data="item" />
    </template>
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
  getUid
} from '@/utils'
import SystemDetail from './systemDetail.vue'
import ItemList from '../detail/itemList.vue'
import Detail from './detail.vue'
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
const {
  proxy
}: any = getCurrentInstance();
const store = useStore()
const coding: any = codings.user.schedule.cate
const systemList: any = ref([])
const schedule_id: any = ref([])
const router = useRouter();



function init() {
  store.dispatch('common/Fetch', {
    api: "scheduleList"
  }).then(res => {
    systemList.value = res.result || {}
    schedule_id.value = []
    res.result && res.result.system.map((item: any) => {
      schedule_id.value.push(item.id)
    })
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
