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
        <span class="pointer" :class="{'opacity': tabIndex == 1}" @click="handleTabs(0)">能量日程</span>
        <span class="ml15 pointer" :class="{'opacity': tabIndex == 0}" @click="handleTabs(1)">我的日程</span>
      </div>
      <div class="module-content plr15" style="min-height: 650px;">
        <div class="mb20 flex" v-if="tabIndex == 0">
          <div style="flex: 1">
            <i class="iconfont icon-info" />
          能量日程打卡后会获得一定的能量值。
          </div>
          <div class="w50" style="display: inline-flex;">
            <i class="iconfont icon-arrow deg180 pointer" @click="handleToggle(-1)" />
            <i class="iconfont icon-arrow pointer" @click="handleToggle(1)" />
          </div>
          <div class="pt5 w100 align_right">
            <SystemDetail :data="{schedule_id, coding}" :render="init" />
          </div>
        </div>
        <div class="mb20 flex" v-else>
          <div class="font14" style="flex: 1">
            <i class="iconfont icon-info" />
            我的日程用户可以自行管理记录打卡自己的项目</div>
          <div class="w50" style="display: inline-flex;">
            <i class="iconfont icon-arrow deg180 pointer" @click="handleToggle(-1)" />
            <i class="iconfont icon-arrow pointer" @click="handleToggle(1)" />
          </div>
          <div class="pt5 w100 align_right">
            <Detail :data="{coding}" />
          </div>
        </div>
        <div class="cal_m_weeks">
          <div class="w100">项目</div>
          <div class="col" v-for="(item, index) in weekDates" :key="index">
            <div>{{item.week}}</div>
            <div class="cl-999">{{item.day}}</div>
          </div>
          <div class="w100">操作</div>
        </div>
        <div class="cal_m_days" v-for="(item, index) in dataList" :key="index">
          <div class="w100">{{item.name}}</div>
          <div class="col" v-for="(list, i) in item.list" :key="i">
            <i class="iconfont icon-bus font24" :class="list ? 'complete' : 'cl-ccc'" v-if="list != 2" />
          </div>
          <div class="w100">
            <span v-if="current == '0'">
              <span v-if="item.value">
                <span class="cl-ccc" v-if="item.status">已更新</span>
                <span class="relative" v-else>未更新
                  <i class="iconfont icon-dot cl-red" style="position: absolute; top: --15px; right: -15px;"></i>
                </span>
              </span>
              <span v-else>
                <Clockin :data="{...item, coding,  sync: item.sync === '1' ? true : false}" />
              </span>
            </span>
            <span class="cl-999" v-else>-</span>
          </div>
        </div>
        <div class="p30 cl-666 align_center" v-if="!dataList.length">暂无日程</div>
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

import Detail from './components/detail.vue'
import SystemDetail from './components/systemDetail.vue'
import RightView from '../../index/components/right_aside.vue'
import Clockin from './components/clock_in.vue'

const coding: any = codings.user.schedule.cate
const store = useStore();
const module = computed(() => store.getters['user/config_talk']);
const userInfo = computed(() => store.getters['user/loginuser']);
let weeks: any = ["一", "二", "三", "四", "五", "六", "日"]
let weekDates: any = ref([])
let dataList: any = ref([])
const current: any = ref(0)
const tabIndex: any = ref(0)
const schedule_id: any = ref([])

function getDatas() {
  // 获取当前日期  
  let currentDate = new Date();
  let day = currentDate.getDay()
  weekDates.value = []
  // 设置星期一为当前日期  

  let monday: any = ""
  if (day == 0) {
    monday = new Date(currentDate.setDate(currentDate.getDate() - 6));
  } else {
    monday = new Date(currentDate.setDate(currentDate.getDate() - (day - 1)));
  }

  // 获取一周的日期   
  for (let i = 0; i < 7; i++) {
    let day = new Date(monday.getTime() + i * 24 * 60 * 60 * 1000 + current.value * 7 * 86400000)
    let data = `${day.getMonth()+1}.${day.getDate()}` // ${day.getFullYear()}.
    weekDates.value.push({
      week: weeks[i],
      day: data
    }); // 一天的毫秒数  
  }
}

function init() {
  store.dispatch('common/Fetch', {
    api: "schedule",
    data: {
      coding: coding,
      index: current.value,
      system: (tabIndex.value === 0 ? '1' : '0')
    }
  }).then(res => {
    dataList.value = res.result || []
    res.result && res.result.map((item: any) => {
      schedule_id.value.push(item.id)
    })
    getDatas()
  })
}

function handleTabs(index: any) {
  tabIndex.value = index
  init()
}

function handleToggle(param: any) {
  current.value = current.value + param
  init()
}

function handleClick(param: any) {
  store.dispatch('common/Fetch', {
    api: "updateSchedule",
    data: {
      coding: coding,
      uid: getUid(),
      fid: param.id,
      system: param.system,
      style: JSON.stringify({left: Math.floor(Math.random() * 20 + 10), top: Math.floor(Math.random() * 100 - 150)})
    }
  }).then(res => {
    init()
  })
}

onMounted(() => {
  getDatas()
  init()
})
</script>

<style lang="less" scoped>
.cal_m_weeks {
  background: var(--card-background);
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-around;
  justify-items: center;
  text-align: center;

  .col {
    flex: 1;
    border-right: 2px solid var(--default-border);
    padding-top: 5px;
    line-height: 20px;

    &:nth-child(2) {
      border-left: 2px solid var(--default-border);
    }
  }
}

.cal_m_days {
  background: var(--card-background);
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-around;
  justify-items: center;
  text-align: center;
  border-top: 2px solid var(--default-border);
  flex-wrap: wrap;

  .col {
    flex: 1;
    border-right: 2px solid var(--default-border);
    padding-top: 8px;
    height: 42px;

    &:nth-child(2) {
      border-left: 2px solid var(--default-border);
    }
  }

  &:nth-child(7n) {
    border-right: 0;
  }

  .cal_m_day_line {
    width: 100%;
    display: flex;
    justify-content: space-around;
    justify-items: center;
  }

  .complete {
    color: #f67f00;
  }
}
.opacity {
  opacity: 0.5
}
</style>
