<template>
<div class="mb10" style="overflow: auto;">
  <div class="col-md-4" style="padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="所有内容" :value="total.total || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日新增" :value="total.yestday_num || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日新增" :value="total.today_num || 0" />
    </div>
  </div>
  <div class="col-md-4" style="padding-left: 8px; padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="累计览量" :value="total.channel_count || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日览量" :value="total.channel_yestday_num || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日览量" :value="total.channel_today_num || 0" />
    </div>
  </div>
  <div class="col-md-4" style="padding-left: 8px; padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="评论" :value="total.module_count || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="点赞" :value="total.module_yestday_num || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="收藏" :value="total.module_today_num || 0" />
    </div>
  </div>
</div>
<div class="mb10" style="overflow: auto;">
  <div class="col-md-12" style=" padding-right: 8px;">
    <div class="module-wrap mb25">
      <div class="module-head">
        频道内容统计图
      </div>
      <div class="module-content plr15" style="height: 545px">
        <ChartBar :chartData="channel.data" :chartOptions="channel.options" />
      </div>
    </div>

    <div class="module-wrap">
      <div class="module-head">
        今日与昨日访问量
      </div>
      <div class="module-content plr15" style="height: 545px">
        <ChartLine :chartData="hours.data" :chartOptions="hours.options" />
      </div>
    </div>    
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore
} from '@/utils'
import {
  ChartLine,
  ChartPie,
  ChartBar,

} from '@/components/packages/chart/index'

const store = useStore();

const total: any = ref({});
const channel: any = ref({})
const hours: any = ref({})

function init() {
  store.dispatch('common/Fetch', {
    api: 'dataStatistics'
  }).then((res: any) => {
    const result: any = res.result
    total.value = result.total

    channel.value = {
      data: {
        labels: result.channel.label,
        series: [
          [...(result.channel.value && result.channel.value.num) || []]
        ]
      },
      options: {
        title: ["频道内容统计图"],
        height: 400
      }
    }

    hours.value = {
      data: {
        labels: result.hours.label,
        series: [
          [...(result.hours.value && result.hours.value.today_visit) || []],
          [...(result.hours.value && result.hours.value.yestday_visit) || []]
        ]
      },
      options: {
        title: ["今日浏览量", "昨日浏览量"],
        height: 400
      }
    }
  })
}

onMounted(init)
</script>
