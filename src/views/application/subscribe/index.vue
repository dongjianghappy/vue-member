<template>
<div class="container w1100 relative clearfix">
  <!-- 侧边菜单 -->
  <div class="left-sidebar left">
    <v-aside :data="module.groups" title="首页" />
  </div>
  <!-- 主内容 -->
  <div class="main-center left" style="width: 620px;">
    <div class="module-wrap">
      <div class="module-head">
        我的订阅
        <span class="right">
          <Detail />
        </span>
      </div>
      <div class="module-content plr15" style="min-height: 650px;">
        <div class="con-list p15 flex item-thum-wrap" style=" align-items: center;" v-for="(item, index) in dataList" :key="index">
              <div class="photos" style="width: 100px">
                <v-photos :sourceData="item" />
              </div>
              <div style="flex: 1">
                <div class="mb15">{{item.nickname}}</div>
                <div>
                  订阅时间：{{item.times}}
                </div>
              </div>
              <div class="align_right" style="width: 100px">
                <v-subscribe :data="item" />
              </div>
            </div>
      </div>
    </div>
  </div>
  <!-- 右侧 -->
  <div class="w280 right">
    <RightView :module="module.personal_center" :userInfo="userInfo" :render="init" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  computed,
  useStore,
  ref,
  getUid,
  codings
} from '@/utils'

import RightView from '../../index/components/right_aside.vue'
import Detail from './components/detail.vue'

const coding: any = codings.user.schedule.cate
const store = useStore();
const module = computed(() => store.getters['user/config_talk']);
const dataList = ref([])


function init() {
  store.dispatch('common/Fetch', {
    api: "subscribeList"
  }).then(res => {
    dataList.value = res.result || []
  })
}

onMounted(() => {
  init()
})
</script>
