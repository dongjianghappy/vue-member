<template>
<div class="home">
<!-- <TalkTabs :getData="init" :style="{'margin-bottom': 0}" :mod="{tab: 'mod', value: 'ranking'}" :data="[{name: '项目榜', value: 'item'}, {name: '用户榜', value: 'user'}, {name: '热值榜', value: 'hot'}]" :query="{tab: 'item', value: route.query.item}" /> -->
<div class="module-wrap">
  <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 560px">
    <v-tabs :tabs="tabs" :isEmit="true" v-model:index="index">
      
      <template v-slot:[name]="slotName" v-for="name in slotName" :key="name">
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
      
    </v-tabs>
  </div>
</div>
</div>
</template>

<script setup lang="ts">
import {
  useStore,
  ref,
  onMounted,
  computed,
  useRoute
} from '@/utils'
import TalkTabs from '../../../index/components/module/TalkTabs.vue'
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
const route = useRoute()
const loading = ref(false)
const dataList: any = ref([])
const tabs: any = [{name: "项目榜", value: "item"}, {name: "用户榜", value: "user"}, {name: "热值榜", value: "hot"}];
const slotName: any = ref(["content1", "content2", "content3"])

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
