<template>
<div class="container w1100 relative clearfix">
  <!-- 侧边菜单 -->
  <div class="left-sidebar left">
    <v-aside :data="module.groups" title="首页" />
  </div>
  <!-- 主内容 -->
  <div class="main-center left" style="width: 620px;">
    <div class="module-wrap">
      <div class="module-content plr15" style="height: 650px;">
        <div class="mb15 flex">
          <div class="font18" style="flex: 1">每周日程概况</div>
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
            <i class="iconfont icon-bus font32" :class="list ? 'complete' : 'cl-ccc'" v-if="list != 2" />
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
                <span class="cl-ccc" v-if="item.status">已搭车</span>
                <span class="relative" @click="handleClick(item)" v-else>去搭车
                  <i class="iconfont icon-dot cl-red" style="position: absolute; top: --15px; right: -15px;"></i>
                </span>
              </span>
            </span>
            <span class="cl-999" v-else>-</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 右侧 -->
  <div class="w280 right">
    <RightView :module="module.personal_center" :userInfo="userInfo" :render="init" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  useStore,
  useRouter,
  useRoute,
  ref,
  getUid,
  codings
} from '@/utils'

import Detail from './components/detail.vue'
import RightView from '../../index/components/right_aside.vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    Detail,
    RightView
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const coding: any = codings.user.schedule.cate
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    let query: any = computed(() => route.query || "");
    const module = computed(() => store.getters['user/config_talk']);
    const userInfo = computed(() => store.getters['user/loginuser']);
    const currentData = ref({})
    const userGroup = ref([])
    const list: any = ref(null);
    let weeks: any = ["一", "二", "三", "四", "五", "六", "日"]
    let weekDates: any = ref([])
    let dataList: any = ref([])
    const current: any = ref(0)
    const sidebar = computed(() => {
      const sidebar = store.getters['user/config'].bookmark || []
      sidebar.groups && sidebar.groups.map((item: any) => {
        item.path = `/bookmark?item=${item.value}`
      })
      return sidebar
    });

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
        monday = new Date(currentDate.setDate(currentDate.getDate() - (day-1)));
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
          uid: getUid(),
          index: current.value
        }
      }).then(res => {
        dataList.value = res.result
        getDatas()
      })
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
          fid: param.id
        }
      }).then(res => {
        init()
      })

    }

    onMounted(() => {
      getDatas()
      init()
    })

    return {
      coding,
      module,
      userInfo,
      handleClick,
      handleToggle,
      query,
      sidebar,
      list,
      currentData,
      userGroup,
      init,
      weeks,
      dataList,
      weekDates,
      current
    }
  }
})
</script>

<style lang="less" scoped>
.cal_m_weeks {
  background: #f0f1f4;
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
  background: #f0f1f4;
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

    // &:hover {
    //   background: var(--tabs-button-background);
    // }
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
</style>
