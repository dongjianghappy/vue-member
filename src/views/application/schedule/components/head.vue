<template>
    <!--  :style="`background: url(${data.background}) no-repeat; background-size: cover;`" -->
    <div class="container w1100 mb15 radius-4 relative" style="background: var(--module-background); height: 200px;">
        <span class="absolute" style="top: 0px; right: 0">
            <v-selectbackground kind="schedule_background" :mask="{ w: 1100, h: 280, tb: 80, lr: 0 }" :data="{id: data.id}" :style="{width: 1170, height: 570}" :img="{width: 1440}" :size="{width: 1100, height: 200}" />
        </span>
        <div class="flex font32 p25">
            <div style="width: 50px;"><i class="m0 mr15 iconfont icon-img font24" style="font-size: 44px !important;" /></div>
            <div style="width: 150px;">
              <span class="relative">
                {{data.name}}
                <i class="absolute iconfont icon-user" style="top:3px;" v-if="data.system === '0'" />
              </span>

            </div>
            <span class="toggle ml25" @click="handleClick()">返回<i class="iconfont icon-return1" /></span>
            <div class="font18 align_right" style="flex: 1">
                <Setting :data="{id: data.id, coding}" :render="render" v-if="data.system === '0'" />
            </div>
        </div>
        <div class="flex plr25">
            <div class="multiple-wrap-2" style="width: 450px; height: 40px; color: var(--color-primary);">{{data.description}}</div>
        </div>
        <div class="flex mt15 plr25">
            <span class="mr15" v-if="data.important === '1'">重要：剩余{{data.countdown}}天</span>
            <span class="mr15" v-else>普通</span>
            <span class="mr15">{{data.visible === '1' ? "私密" : "公开"}}</span>
            <span class="mr15">周期：{{data.start_time}} - {{data.last_time}}</span>
            <span>定时：{{data.alarm}}</span>
        </div>
        <div class="date-list absolute plr25 font18">
            <div class="service-item check-in flex align_center" style="flex-direction: row;">
                <div class="datetime">
                    <i class="week cl-eb7350">{{datetime.week}}</i>
                    <i class="time cl-eb7350">{{datetime.year}}.{{datetime.month}}.{{datetime.day}}</i>
                </div>
                <div class="clockin-btn">
                  <Detail action="add" :data="{id: data.id, coding}" :render="render" />
                    <!-- <ClockIn action="add" :data="{id: data.id, coding}" :render="render" v-if="data.has_schedule || data.system === '0'" />
                    <Detail action="add" :data="{id: data.id, coding}" :render="render" v-else /> -->
                </div>
            </div>
            <div class="service-item">
                <div class="service-title">12人次</div>
                <div class="service-title">昨天参与</div>
            </div>

            <div class="service-item">
                <div class="service-title">12人次</div>
                <div class="service-title">今日参与</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineProps,
  ref,
  watch,
  useStore,
  useRouter,
  getUid
} from '@/utils'
import {
  week
} from '@/assets/const'
// import ClockIn from './clock_in.vue'
import ClockIn from '../detail/clockIn.vue'
import Detail from '../detail/detail.vue'
import Setting from '../detail/setting.vue'

const props: any = defineProps({
  data: {
    type: Array,
    default: () => {
      return {}
    }
  },
  render: {
    type: Function,
    default: () => {
      return 'Default function'
    }
  }
})

const {
  proxy
}: any = getCurrentInstance();
const detail: any = ref({})
const router = useRouter();
const date = new Date();
const datetime: any = ref({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
  week: week[date.getDay()]
})

function handleClick(){
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/schedule?mod=myschedule`
  }))
}
</script>

<style lang="less" scoped>
.date-list {
  bottom: 0; 
  right: 0;
  width: 450px;
  display: flex;
  grid-template-columns: repeat(3, 1fr); /* 3列布局 */
  padding: 0;
  .service-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;

    .service-icon {
      width: 60px;
      height: 60px;
      margin-bottom: 12px;
    }

    .service-title {
      font-size: 18px;
      color: #333;
    }
    &.check-in{
      flex: none;
      width: 200px !important;
      color: #32be6d;
      .datetime{
        width: 50%;
        // background: var(--color-primary);
      }
      .clockin-btn{
        padding: 10px 0;
        width: 50%;
        height: 100%
      }
    }
  }
}
.toggle{
    background: var(--card-background);
    padding: 10px;
    font-size: 18px;
    border-radius: 50px;
}
</style>