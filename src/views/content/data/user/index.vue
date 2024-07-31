<template>
<div class="mb25" style="overflow: auto;">
  <div class="col-md-4" style="padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="关注" :value="total.myconcern || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日关注" :value="total.yestday_myconcern || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日关注" :value="total.today_myconcern || 0" />
    </div>
  </div>
  <div class="col-md-4" style="padding-left: 8px; padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="粉丝" :value="total.concernmy || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日粉丝" :value="total.yestday_concernmy || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日粉丝" :value="total.today_concernmy || 0" />
    </div>
  </div>
  <div class="col-md-4" style="padding-left: 8px; padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="访问量" :value="total.visit || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日访问" :value="total.yestday_visit || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日访问" :value="total.today_visit || 0" />
    </div>
  </div>
</div>
<div class="mb10" style="overflow: auto;">
  <div class="col-md-12" style=" padding-right: 8px;">
    <MonthToogle title="用户每月关注涨粉概况图表" :month="currentMonth" @toggle="handleToggle" />

    <div class="module-wrap mb25">
      <div class="module-head">
        {{currentMonth}} 月份关注 {{myconcern_num}} 位用户
      </div>
      <div class="module-content plr15" style="height: 545px">
        <ChartLine :chartData="myconcern.data" :chartOptions="myconcern.options" />
      </div>
    </div>

    <div class="module-wrap">
      <div class="module-head">
        {{currentMonth}} 月份新增 {{concernmy_num}} 个粉丝
      </div>
      <div class="module-content plr15" style="height: 545px">
        <ChartLine :chartData="concernmy.data" :chartOptions="concernmy.options" />
      </div>
    </div>   

    <div class="module-wrap">
      <div class="module-head">
        {{currentMonth}} 月份有 {{visit_num}} 位访客
      </div>
      <div class="module-content plr15" style="height: 545px">
        <ChartLine :chartData="visit.data" :chartOptions="visit.options" />
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

import MonthToogle from '../components/monthToogle.vue'

const store = useStore();
let currentYear: any = ref(new Date().getFullYear())
let currentMonth: any = ref(new Date().getMonth() + 1)

const total: any = ref({});
const myconcern: any = ref({})
const concernmy: any = ref({})
const visit: any = ref({})
const myconcern_num: any = ref(0)
const concernmy_num: any = ref(0)
const visit_num: any = ref(0)

function handleToggle(param: any) {
  currentMonth.value = param
  init({
    year: currentYear.value,
    month: currentMonth.value
  })
} 

function init(param: any = {}) {
  store.dispatch('common/Fetch', {
    api: 'userStatistics',
    data: {
      ...param
    }
  }).then((res: any) => {
    const result: any = res.result
    total.value = result.total

    myconcern_num.value = result.day.value.myconcern_num.reduce(function(value1: any, value2: any){
      return value1+value2
    }, 0)

    concernmy_num.value = result.day.value.concernmy_num.reduce(function(value1: any, value2: any){
      return value1+value2
    }, 0)

    visit_num.value = result.day.value.visit_num.reduce(function(value1: any, value2: any){
      return value1+value2
    }, 0)

    myconcern.value = {
      data: {
        labels: result.day.label,
        series: [
          [...(result.day.value && result.day.value.myconcern_num) || []]
        ]
      },
      options: {
        height: 400
      }
    }

    concernmy.value = {
      data: {
        labels: result.day.label,
        series: [
          [...(result.day.value && result.day.value.concernmy_num) || []]
        ]
      },
      options: {
        height: 400
      }
    }

    visit.value = {
      data: {
        labels: result.day.label,
        series: [
          [...(result.day.value && result.day.value.visit_num) || []]
        ]
      },
      options: {
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
