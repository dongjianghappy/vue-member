<template>
<div class="module-wrap">
  <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 560px">
    <div class="mb15 font18 bold">{{mod == "" ? '朋友圈热榜' : module.filter(item=>item.value == mod)[0].name}}</div>
    <template v-if="mod === '' || mod === 'talk' || mod === 'channel' || mod === 'collect'">
      <div class="p10 font16 item-thum-wrap" style="overflow: hidden;" v-for="(item, index) in dataList" :key="index">
        <div class="col-md-1">
          <span class="num">{{index+1}}</span>
        </div>
        <div class="col-md-8 pr15">
          <div class="bold">{{item.title || item.summary}}</div>
          <div class="pt5 font12">
            <span class="mr15 cl-ccc inline">
              <v-photos :sourceData="item" /></span>
            <span class="mr15 cl-ccc">{{item.nickname}}</span>
            <span class="mr15 cl-ccc">{{item.visit}} 浏览</span>
            <span class="mr15 cl-ccc">{{item.interaction}} 互动</span>
            <span class="cl-ccc">{{item.collect}} 收藏</span>
          </div>
        </div>
        <div class="col-md-2">
          <span class="inline" style="width: 16px; height: 16px;"><i class="iconfont icon-hot cl-red m0" v-if="index < 2" /></span>
          {{item.hot}} 热度</div>
        <div class="col-md-1 align_center">收藏</div>
      </div>
    </template>
    <template v-else-if="mod === 'author'">
      <div class="p10 font16 item-thum-wrap" style="overflow: hidden;" v-for="(item, index) in dataList" :key="index">
        <div class="col-md-1">
          <span class="num">{{index+1}}</span>
        </div>
        <div class="col-md-8 pr15 flex">
          <div class="photos">
            <v-photos :sourceData="item" />
          </div>
          <div style="flex: 1">
            <div class="bold">{{item.nickname}}</div>
            <div class="pt5 font12">
              <span class="mr15 cl-ccc">{{item.article}} 优质内容</span>
              <span class="mr15 cl-ccc">{{item.praise}} 获赞</span>
              <span class="mr15 cl-ccc">{{item.collect}} 获收藏</span>
              <span class="cl-ccc">{{item.concernmy}} 粉丝</span>
            </div>
          </div>
        </div>
        <div class="col-md-2">
          <span class="inline" style="width: 16px; height: 16px;"><i class="iconfont icon-hot cl-red m0" v-if="index < 2" /></span>
          {{item.total}} 热度</div>
        <div class="col-md-1 align_center">
          <v-concernbutton :data="item" :render="init" />
        </div>
      </div>
    </template>
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
