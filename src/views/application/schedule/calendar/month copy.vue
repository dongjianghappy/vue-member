<template>
<div class="container w1100 clearfix">
  <div class="w220 left">
    <Aside />
  </div>
  <div class="m0 main-center right" style="width: 870px">
<div class="module-wrap">
  <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 510px">
    <div class="mb15">
      <span class="font18 bold">日期查看</span>
      <span class="right">
        <v-condition name="年份" :defaultValue="{value: '2023', name: '2023'}" icon="sort" field="year" :enums="yaerList" :render="init" /></span>
    </div>
    <div class="mb10 pl10">
      <span class="mr5">Less</span>
      <span class="inline mr5 calendar-graph-day calendar-graph-box"></span>
      <span class="inline mr5 calendar-graph-day calendar-graph-box calendar-graph-day-1"></span>
      <span class="inline mr5 calendar-graph-day calendar-graph-box calendar-graph-day-2"></span>
      <span class="inline mr5 calendar-graph-day calendar-graph-box calendar-graph-day-3"></span>
      <span class="inline mr5 calendar-graph-day calendar-graph-box calendar-graph-day-4"></span>
      <span>More</span>
    </div>
    <div class="col-md-4 p10" v-for="(item, index) in dataList" :key="index">
      <div class="p15" style=" background: var(--card-background); border-radius: 8px;">
        <div class="ptb10 font6">
          <div class="mb15 align_center">{{item.month}}月</div>
          <div>
            <template v-for="(list, i) in item.list" :key="i">
              <div class="inline mt5 ml5" @click="handleDay(list)">
                <v-tooltip :content="`${list.date} ${list.num} 条`" arrow="top" offset="right" :move="-45" :keys="`popover-img$-${index}`" type="hover">
                  <div class="inline calendar-graph-day" :class="bg(list.num)">
                  </div>
                </v-tooltip>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  ref,
  useStore,
  useRouter,
  getUid
} from '@/utils'
import Aside from '../components/aside.vue'
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter();
const dataList: any = ref([])
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

function handleDay(param: any){
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/schedule?mod=myschedule&item=day&date=${param.date}`
  }))
}

function init(param: any = "") {
  let date: any = new Date()

  const params: any = {
    year: date.getFullYear()
  }

  Object.assign(params, param)

  store.dispatch(`common/Fetch`, {
    api: "scheduleMonth",
    data: {
      ...params
    }
  }).then((res: any) => {
    dataList.value = res.result
  })
}

const bg = ((num: any) => {

  if (num == 1) {
    return "calendar-graph-day-1"
  } else if (num == 2) {
    return "calendar-graph-day-2"
  } else if (num == 3) {
    return "calendar-graph-day-3"
  } else if (num >= 4) {
    return "calendar-graph-day-4"
  }
})

onMounted(init)
</script>

<style lang="less" scoped>
.calendar-graph-day {
  width: 25px;
  height: 25px;
  background-color: #e9ecef;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, .0625);
  &.calendar-graph-box{
    width: 10px;
    height: 10px;
  }
}

.calendar-graph-day-1 {
  background: #9be9a8 !important;
}

.calendar-graph-day-2 {
  background: #40c463 !important;
}

.calendar-graph-day-3 {
  background: #30a14e !important;
}

.calendar-graph-day-4 {
  background: #216e39 !important;
}
</style>
