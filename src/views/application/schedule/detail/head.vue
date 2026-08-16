<template>
    <div class="container w1100 mb15 radius-4" style="background: var(--module-background); height: 300px;">
        <div class="activity-banner relative" :style="`background: url(${data.background}) no-repeat; background-size: cover;`">
            <span class="absolute" style="left: 15px; top: 15px; z-index: 100">
                <span class="toggle" @click="handleClick()"><i class="iconfont icon-back" />返回</span>
            </span>
            <div class="absolute" style=" background: rgba(0, 0, 0, 0.35); left: 0; top: 0px; right: 0px; bottom: 0px"></div>
            <span class="absolute" style="top: 0px; right: 0" v-if="userInfo.account">
                <v-selectbackground kind="schedule_background" :mask="{ w: 1100, h: 280, tb: 80, lr: 0 }" :data="{id: data.id}" :style="{width: 1170, height: 570}" :img="{width: 1440}" :size="{width: 1100, height: 200}" />
            </span>
            <span class="absolute" style="top: 20px; right: 20px">
              <Setting :data="{id: data.id, coding}" :render="render" />
            </span>
        </div>
        <div class="activity_wrap relative">
            <div class="absolute  bg-999" style="left: 25px; bottom: 25px; border: 2px solid rgb(255, 255, 255); width: 154px; height: 154px;">
                <img :src="data.image" onerror="this.src='/images/noimage.png'" style="width: 150px; height: 150px;" />
                <span class="absolute" style="bottom: 0px; right: 0; width: 16px; height: 16px; z-index: 10" v-if="userInfo.account">
                    <v-selectbackground kind="schedule_photos" :mask="{ w: 500, h: 400, tb: 0, lr: 100 }" :data="{id: data.id}" :size="{width: 400, height: 400}" />
                </span>
            </div>
            <div class="pt15 flex" style="padding-left: 200px;">
              <div style="flex: 1">
                <div class="font20">{{data.name}}
                    <span class="ml15 font14">成员：23</span>
                </div>
                <div class="mt10 cl-666">
                  <span class="mr15" v-if="data.important === '1'">重要：剩余{{data.countdown}}天</span>
                  <span class="mr15" v-else>普通</span>
                  <span class="mr15">{{data.visible === '1' ? "私密" : "公开"}}</span>
                  <span class="mr15">周期：{{data.start_time}} - {{data.last_time}}</span>
                  <span>定时：{{data.alarm}}</span>
                </div>
                </div>
                <div class="flex" style="width: 400px;">
                    <div class="date-list plr25 font18">
                        <div class="service-item check-in">
                              
                            <div v-if="data.has_schedule || data.system === '0'">
                                <ClockIn action="add" :data="{id: data.id, coding}" :render="render" v-if="data.system === '0'" />
                                <ClockIn action="add" :data="{id: data.id, coding}" :render="render" v-else />
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
            </div>
        </div>
    </div>
</template>

<script setup  lang="ts">
import {
  getCurrentInstance,
  defineProps,
  computed,
  onMounted,
  ref,
  reactive,
  useStore,
  useRouter,
  useRoute,
  codings,
  getUid
} from '@/utils'

import ClockIn from './clockIn.vue'
import Detail from './detail.vue'
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

const store = useStore();
const router = useRouter();
const route = useRoute();
const coding = codings.talk
const dataList: any = ref({})
const userInfo = computed(() => store.getters['user/loginuser']);
const module = computed(() => store.getters['user/config_talk'].activity || []);



function handleClick(){
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/schedule?mod=myschedule`
  }))
}
</script>

<style lang="less" scoped>
.activity-banner {
  background: #666;
  height: 200px;
}

.activity_wrap {
  height: 100px
}
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
</style>
