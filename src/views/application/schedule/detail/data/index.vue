<template>
<div class="module-wrap">
  <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 650px">
    <v-tabs :tabs="[{name: '数据总览',value: 'total'},{name: '今日与昨日打卡',value: 'talk'},{name: '日期总览',value: 'channel'}]" :isEmit="true" v-model:index="index">
      <template v-slot:content1>
        <div class="col-md-4 p10">
          <v-cards :data="{title: '参与用户', value: total.user}" />
        </div>
        <div class="col-md-4 p10">
          <v-cards :data="{title: '累计打卡', value: total.total}" />
        </div>
        <div class="col-md-4 p10">
          <v-cards :data="{title: '今天打卡', value: total.today_num}" />
        </div>
        <div class="col-md-4 p10">
          <v-cards :data="{title: '昨天打卡', value: total.yestday_num}" />
        </div>
      </template>
      <template v-slot:content2>
        <div class="module-wrap">
          <div class="module-head">
            今日与昨日打卡量
          </div>
          <div class="module-content plr15" style="height: 545px">
            <ChartLine :chartData="hours.data" :chartOptions="hours.options" />
          </div>
        </div> 
      </template>
      <template v-slot:content3>
        <div class="module-wrap">
          <div class="module-head">
            今日与昨日打卡量
          </div>
          <div class="module-content plr15" style="height: 545px">
            <ChartLine :chartData="month.data" :chartOptions="month.options" />
          </div>
        </div> 
      </template>
    </v-tabs>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  onMounted,
  useStore,
  useRoute
} from '@/utils'
import {
  ChartLine,
  ChartPie,
  ChartBar,

} from '@/components/packages/chart/index'
// import Index from './components/index.vue'
// import Channel from './channel/index.vue'
// import Talk from './talk/index.vue'
// import User from './user/index.vue'
// import Detail from './components/detail.vue'
const props: any = defineProps({
  data: {
    type: Array,
    default: () => {
      return {}
    }
  }
})

const store = useStore();
const route = useRoute()
const isDetail = ref(false)
const index: any = ref(0)
const total: any = ref({});
const month: any = ref({})
const hours: any = ref({})

function init() {
  store.dispatch('common/Fetch', {
    api: 'scheduleDataStatistics',
    data: {
      id: route.query.id,
      year: 2026,
      month: 5,
      system: props.data.system
    }
  }).then((res: any) => {
    const result: any = res.result
    total.value = result.total

    month.value = {
      data: {
        labels: result.month.label,
        series: [
          [...(result.month.value && result.month.value.num) || []]
        ]
      },
      options: {
        title: ["2026年5月打卡概况"],
        height: 400
      }
    }

    hours.value = {
      data: {
        labels: result.hours.label,
        series: [
          [...(result.hours.value && result.hours.value.today) || []],
          [...(result.hours.value && result.hours.value.yestday) || []]
        ]
      },
      options: {
        title: ["今日打卡概况", "昨日打卡概况"],
        height: 400
      }
    }
  })
}

onMounted(init)
</script>
