<template>
<div class="mb20" style="overflow: auto;">
  <div class="col-md-4 p10">
    <v-cards :data="{title: '净增粉丝数', value: data.today_concernmy, yes: data.yestday_concernmy}" />
  </div>
  <div class="col-md-4 p10">
    <v-cards :data="{title: '发博文数', value: data.today_num, yes: data.yestday_num}" />
  </div>
  <!-- <div class="col-md-4 p10">
    <v-cards :data="{title: '赞评收数', value: data.today_concernmy}" />
  </div> -->
  <div class="col-md-4 p10">
    <v-cards :data="{title: '文章发布数', value: data.channel_today_num, yes: data.channel_yestday_num}" />
  </div>
  <!-- <div class="col-md-4 p10">
    <v-cards :data="{title: '文章阅读数', value: data.today_concernmy}" />
  </div> -->
  <div class="col-md-4 p10">
    <v-cards :data="{title: '空间访问量', value: data.today_visit, yes: data.yestday_visit}" />
  </div>

  <!-- <div class="col-md-4 p10">
    <v-cards :data="{title: '用户留言数', value: data.today_concernmy}" />
  </div>
  <div class="col-md-4 p10">
    <v-cards :data="{title: '相册上传数', value: data.today_concernmy}" />
  </div>
  <div class="col-md-4 p10">
    <v-cards :data="{title: '参与投票数', value: data.today_concernmy}" />
  </div>   -->
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
