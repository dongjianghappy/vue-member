<template>
    <div class="container w1100 mb15 radius-4 relative" style="background: var(--module-background); height: 200px;">
        <div class="flex font32 p25">
          <div style="width: 50px;"><i class="m0 mr15 iconfont icon-hot font24" style="font-size: 44px !important;" /></div>
          <div style="width: 150px;">能量球</div>
          <span class="toggle ml25" @click="handleClick()">返回<i class="iconfont icon-return1" /></span>
        </div>
        <div class="flex plr50">
            
        </div>
        <div class="date-list absolute plr25 font18">
            <div class="service-item" @click="handleList('ranking')">
                能量榜单
            </div>
            <div class="service-item" @click="handleList('fish')">
                养殖兑换
            </div>
            <div class="service-item" @click="handleList('list')">
                能量明细
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
function handleList(param: any = ''){
  let query = ""
  if(param){
    query = `&item=${param}`
  }
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/schedule?mod=energy${query}`
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