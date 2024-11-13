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
        养鱼记录
      </div>
      <div class="module-content plr15" style="min-height: 650px;">
        <div class="con-list p15 flex item-thum-wrap" style=" align-items: center;" v-for="(item, index) in dataList" :key="index">
              <div style="width: 100px">
                <div :class="`${item.image}_a`" style="width: 100%; height: 40px;"></div>
              </div>
              <div style="flex: 1">
                <div class="mb15">{{item.name}}</div>
                <div>
                  {{item.times}}
                </div>
              </div>
              <div class="font14 align_center" style="width: 100px">
                {{item.energy}}g
              </div>
              <div class="font14 align_center" style="width: 50px">
                {{item.status === '1' ? '饲养中' : '已收获'}}
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

const coding: any = codings.user.schedule.cate
const store = useStore();
const module = computed(() => store.getters['user/config_talk']);
const dataList = ref([])


function init() {
  store.dispatch('common/Fetch', {
    api: "seaFishList"
  }).then(res => {
    dataList.value = res.result || []
  })
}

onMounted(() => {
  init()
})
</script>
