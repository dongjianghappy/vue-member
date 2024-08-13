<template>
<div class="module-wrap">
  <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 560px">
    <div class="mb15 font18 bold">能量用户</div>
    <div class="con-list p15 flex item-thum-wrap" style=" align-items: center;" v-for="(item, index) in dataList" :key="index">

      <div style="width: 50px"><span class="num">{{index+1}}</span></div>
      <div class="photos" style="width: 100px">
        <v-photos :sourceData="item" :style="{radius: '50%', width: 80, height: 80}" />
      </div>
      <div style="flex: 1">
        <div class="mb15">{{item.nickname}}</div>
        <div>
          <span class="mr5 font12 cl-666">Ta正在参与的能量日程:</span>
          <span class="mr10 font12 cl-666" v-for="(list, i) in item.schedule" :key="i">{{list.name}}</span>
        </div>
      </div>
      <div class="font14 align_center" style="width: 100px">
        {{item.energy_num}}g
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  useStore,
} from '@/utils'

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

function init() {
  store.dispatch('common/RecommendUser')
}
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
