<template>
<div class="container w1100 clearfix">
  <div class="module-wrap">
    <div class="module-content p25">
      <div class="mb5 font20 bold">帮上置顶</div>
      <div class="module-content">
        <div class="flex mb25 p25" style="background: var(--card-background);">
          <div class="mr20" style="width: 120px; height: 120px">
            <img :src="detail.image && detail.image[0]" class="radius-8" style=" width: 100%; height: auto; cursor: zoom-in;" />
          </div>
          <div style="flex: 1">
            <div v-html="detail.summary"></div>
            <div class="mt5 font12">{{detail.nickname}}的内容</div>
          </div>
        </div>
        <div class="mb15">帮TA的这条内容上头条</div>
        <div class="mb30">
          <div class="mb10">置顶时长</div>
          <div class="mb25 flex">
            <div class="btn mr10" :class="{current: currentTime === index}" style="flex: 1" v-for="(item, index) in time" :key="index" @click="handleClick(index)">{{item}}</div>
          </div>
          <div class="ptb15 align_right" style="border-top: 1px var(--default-border) solid">
            金币：{{detail.toping * (currentTime+1)}}
          </div>
        </div>

        <div class="mb30">
          <div class="mb10">我的昵称置于推荐区
            <span class="right">
              <v-switch :data="{ item: {}, field: ''}" :storage="true" @toggle="getValue" className="right" :auth="true" />
            </span>
          </div>
          <div class="ptb15 align_right" style="border-top: 1px var(--default-border) solid">
            金币：{{detail.nickname_topping}}
          </div>
        </div>
        <div class="mb25" style="height: 32px; line-height: 32px;
">
          总计：{{totalCoin}}金币
          <span class="btn-submit right" @click="handlePay">去支付</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  ref,
  computed,
  useStore,
  onMounted,
  codings,
  useRoute
} from '@/utils'

const {
  proxy
}: any = getCurrentInstance();
const store: any = useStore()
const route: any = useRoute()
const isShow: any = ref(false)
const userInfo: any = computed(() => store.getters['user/userInfo']);
const detail: any = ref({})
const coding: any = codings.service.announcement
const time = ['1小时', '2小时', '3小时', '4小时', '5小时', '6小时', '12小时', '24小时', '48小时', '72小时']
const currentTime = ref(0)
const coin: any = ref(10)
const switch_nickname: any = ref(0)

const totalCoin = computed(() => {
  let total = detail.value.toping * (currentTime.value + 1) + (switch_nickname.value == 1 ? parseInt(detail.value.nickname_topping) : 0)
  return total
})

function handleClick(param: any) {
  currentTime.value = param
}

function getValue(param: any) {
  switch_nickname.value = param
}

function handlePay() {
  store.dispatch('common/Fetch', {
    api: 'payTalkToping',
    data: {
      artid: route.query.id,
      switch_nickname: switch_nickname.value,
      hour: currentTime.value + 1
    }
  }).then((res: any) => {
    proxy.$hlj.message({
      type: 'info',
      msg: res.returnMessage
    })
  })
}

function init() {
  store.dispatch('common/Fetch', {
    api: 'talkInfo',
    data: {
      id: route.query.id
    }
  }).then((res: any) => {
    detail.value = res.result
  })
}
onMounted(init)
</script>

<style lang="less" scoped>
.current {
  background: var(--color-primary-background);
}
</style>
