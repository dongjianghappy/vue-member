<template>
<div class="mb25">
<div>频道</div>
<div class="mb10" style="overflow: auto;">
  <div class="col-md-4" style="background: var(--card-background); padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="所有内容" :value="data.data || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日新增" :value="data.yestday_num || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日新增" :value="data.today_num || 0" />
    </div>
  </div>
  <div class="col-md-4" style="background: var(--card-background); padding-left: 8px; padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="累计览量" :value="data.channel_count || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日览量" :value="data.channel_yestday_num || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日览量" :value="data.channel_today_num || 0" />
    </div>
  </div>
  <div class="col-md-4" style="background: var(--card-background); padding-left: 8px; padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="评论" :value="data.module_count || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="点赞" :value="data.module_yestday_num || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="收藏" :value="data.module_today_num || 0" />
    </div>
  </div>
</div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps
} from '@/utils'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>
