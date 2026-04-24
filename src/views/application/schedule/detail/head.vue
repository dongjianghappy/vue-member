<template>
    <div class="container w1100 mb15 radius-4 relative" style="background: var(--module-background); height: 200px;">
        <div class="flex font32 p25">
            {{data.name}}
        </div>
        <div class="flex plr50">
            日程描述：{{data.description}}
        </div>
        <div class="date-list absolute plr25 font18">
            <div class="service-item check-in">
                <div>
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
        <div class="card-user absolute">
            <div class="service-item">
                
            </div>

            <div class="service-item">
                12313人打卡
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
import ClockIn from './detail.vue'

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
  bottom: 50px; 
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
.card-user {
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
</style>