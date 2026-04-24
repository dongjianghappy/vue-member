<template>
<div class="module-wrap">
  <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 560px">
    <div class="mb15 font18 bold">轨道示意图</div>
    <div class="con-list p15 flex item-thum-wrap" style=" align-items: center;" v-for="(item, index) in dataList.list" :key="index">
      <div style="flex: 1">
        <i class="iconfont icon-track" style="color: #ff5722" />
      {{item.name}}
      </div>
      <div class="w60" @click="handleClick(item)">查看</div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  useStore,
  useRouter
} from '@/utils'

const store = useStore()
const dataList: any = ref([])
const router = useRouter()

function handleClick(param: any) {
  router.push(`/track?id=${param.id}`)
}

function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 20,
  }

  Object.assign(params, param)
  store.dispatch('common/Fetch', {
    api: "footprint",
    data: {
      isPublic: true,
      ...params
    }
  }).then((res) => {
    dataList.value = res.result
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
