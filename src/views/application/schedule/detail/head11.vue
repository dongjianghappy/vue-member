<template>
    <div class="container w1100 mb15 radius-4 relative" style="background: var(--module-background); height: 200px;">
        <div class="flex font32 p25">
          <div style="width: 50px;"><i class="m0 mr15 iconfont icon-img font24" style="font-size: 44px !important;" /></div>
          <div style="width: 150px;">{{data.name}}</div>
          <span class="toggle ml25" @click="handleClick()">返回<i class="iconfont icon-return1" /></span>
          <div class="font18 align_right" style="flex: 1">
            <Setting :data="{id: data.id, coding}" :render="render" />
          </div>
        </div>
        <div class="flex plr25">
            描述：{{data.description}}
        </div>
        <div class="flex mt15 plr25">
            <span class="mr15" v-if="data.important === '1'">重要：剩余{{data.countdown}}天</span>
            <span class="mr15" v-else>普通</span>
            <span class="mr15">{{data.visible === '1' ? "私密" : "公开"}}</span>
            <span class="mr15">周期：{{data.start_time}} - {{data.last_time}}</span>
            <span>定时：{{data.alarm}}</span>
        </div>
        <div class="date-list absolute plr25 font18">
            <div class="service-item check-in">
                <div v-if="data.has_schedule || data.system === '0'">
                    <ClockIn action="add" :data="{id: data.id, coding}" :render="render" />
                </div>
            </div>
            <div class="service-item">
                <div class="service-title">12</div>
                <div class="service-title">昨天打卡</div>
            </div>

            <div class="service-item">
                <div class="service-title">12</div>
                <div class="service-title">今日打卡</div>
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

// import ClockIn from './clock_in.vue'
import ClockIn from './clockIn.vue'
import Setting from './setting.vue'

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
  width: 400px;
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
      padding: 28px 0;
      color: #32be6d;
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