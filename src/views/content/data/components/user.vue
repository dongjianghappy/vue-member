<template>
<div>用户</div>
<div class="mb10" style="overflow: auto;">
  <div class="col-md-4" style="background: var(--card-background); padding-right: 8px;">
    <div class="col-md-4">
      <div></div>
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日关注" :value="data.yestday_myconcern || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日关注" :value="data.today_myconcern || 0" />
    </div>
  </div>
  <div class="col-md-4" style="background: var(--card-background); padding-left: 8px; padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="粉丝" :value="data.concernmy || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日粉丝" :value="data.yestday_concernmy || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日粉丝" :value="data.today_concernmy || 0" />
    </div>
  </div>
  <div class="col-md-4" style="background: var(--card-background); padding-left: 8px; padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="访问量" :value="data.visit || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日访问" :value="data.yestday_visit || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日访问" :value="data.today_visit || 0" />
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
