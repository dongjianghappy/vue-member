<template>
<div class="mb25" style="overflow: auto;">
  <div class="col-md-4" style="padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="所有微博" :value="total.total || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日发布" :value="total.yestday_num || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日发布" :value="total.today_num || 0" />
    </div>
  </div>
  <div class="col-md-4" style="padding-left: 8px; padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="累计览量" :value="total.day_count || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日览量" :value="total.day_yestday_num || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日览量" :value="total.day_today_num || 0" />
    </div>
  </div>
  <div class="col-md-4" style="padding-left: 8px; padding-right: 8px;">
    
    <div class="col-md-4">
      <v-statisticcard name="收藏" :value="total.collect || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="评论" :value="total.comment || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="点赞" :value="total.praise || 0" />
    </div>
  </div>
</div>
<div class="mb0" style="overflow: auto;">
  <div class="col-md-12" style=" padding-right: 8px;">
    <MonthToogle title="微博每月概况图表" :month="currentMonth" @toggle="handleToggle" />
    
    <div class="module-wrap">
      <div class="module-head">
        {{currentMonth}} 月份微博发布 {{talk_num}} 条
      </div>
      <div class="module-content plr15" style="height: 450px">
        <ChartLine :chartData="day.data" :chartOptions="day.options" />
      </div>
    </div>

    <div class="module-wrap">
      <div class="module-head">
        {{currentMonth}} 月份互动内容：收藏 {{collect_num}} 条、评论 {{comment_num}} 条、点赞 {{praise_num}} 条
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

import MonthToogle from '../components/monthToogle.vue'

const store = useStore();

let currentYear: any = ref(new Date().getFullYear())
let currentMonth: any = ref(new Date().getMonth() + 1)
const total: any = ref({});
const day: any = ref({})
const hours: any = ref({})
const talk_num: any = ref(0)
const collect_num: any = ref(0)
const comment_num: any = ref(0)
const praise_num: any = ref(0)

const yaerList = [{
  value: '2022',
  name: '2022'
}, {
  value: '2021',
  name: '2021'
}, {
  value: '2020',
  name: '2020'
}]

function handleToggle(param: any){
  currentMonth.value = param
  init({
    year: currentYear.value,
    month: currentMonth.value
  })
}

function init(param: any = {}) {
  store.dispatch('common/Fetch', {
    api: 'talkStatistics',
    data: {
      ...param
    }
  }).then((res: any) => {
    const result: any = res.result
    total.value = result.total

    talk_num.value = result.day.value.num.reduce(function(value1: any, value2: any){
      return value1+value2
    }, 0)

    collect_num.value = result.day.value.collect_num.reduce(function(value1: any, value2: any){
      return value1+value2
    }, 0)
    
    comment_num.value = result.day.value.comment_num.reduce(function(value1: any, value2: any){
      return value1+value2
    }, 0)

    praise_num.value = result.day.value.praise_num.reduce(function(value1: any, value2: any){
      return value1+value2
    }, 0)

    day.value = {
      data: {
        labels: result.day.label,
        series: [
          [...(result.day.value && result.day.value.num) || []]
        ]
      },
      options: {
        // title: ["频道内容统计图"],
        height: 400
      }
    }

    hours.value = {
      data: {
        labels: result.day.label,
        series: [
          [...(result.day.value && result.day.value.collect_num) || []],
          [...(result.day.value && result.day.value.comment_num) || []],
          [...(result.day.value && result.day.value.praise_num) || []]
        ]
      },
      options: {
        title: ["收藏", "评论", "点赞"],
        height: 400
      }
    }
  })
}



onMounted(() => {
  init({
    year: currentYear.value,
    month: currentMonth.value
  })
})
</script>
