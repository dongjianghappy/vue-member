<template>
<div class="cal_con">
  <div class="cal_header">
    <div class="cal_h_left">
      <div class="cal_h_btn" @click="preYear">
        <svg class="cal_h_l_icon">
          <polyline points="6,0 2,4 6,8" style="fill:none;stroke:#909399;stroke-width:1" />
          <polyline points="10,0 6,4 10,8" style="fill:none;stroke:#909399;stroke-width:1" />
        </svg>
      </div>
      <div class="cal_h_btn" @click="preMonth">
        <svg class="cal_h_l_icon">
          <polyline points="6,0 2,4 6,8" style="fill:none;stroke:#909399;stroke-width:1" />
        </svg>
      </div>
    </div>

    <div>
      <span class="cal_h_time">{{ year }} 年 </span>
      <span class="cal_h_time">{{ month }} 月</span>
    </div>

    <div class="cal_h_left">
      <div class="cal_h_btn" @click="nextMonth">
        <svg class="cal_h_l_icon">
          <polyline points="2,0 8,4 2,8" style="fill:none;stroke:#909399;stroke-width:1" />
        </svg>
      </div>
      <div class="cal_h_btn" @click="nextYear">
        <svg class="cal_h_l_icon">
          <polyline points="2,0 8,4 2,8" style="fill:none;stroke:#909399;stroke-width:1" />
          <polyline points="6,0 12,4 6,8" style="fill:none;stroke:#909399;stroke-width:1" />
        </svg>
      </div>
    </div>
  </div>

  <div class="cal_month">
    <div class="cal_m_weeks">
      <span v-for="w in weeks" :key="w" class="cal_m_day_cell cal_m_day_week" style="height: 40px">{{w}}</span>
    </div>
    <div class="cal_m_days">
      <div v-for="(ds, index) in monthData" :key="index" class="cal_m_day_line">
        <div v-for="d in ds" :key="d.day" class="cal_m_day_cell p5" :style="{color: getCellColor(d)}" @mouseenter="mouseenter(d, $event)" @mouseleave="mouseleave(d, $event)" @click="handleClick(d, $event)">
          <div class="cell-box" :class="{'choose-cell': (chooseStatus && d === chooseDay)}" style="border: 1px dashed #ccc; border-radius: 5px;" :style="style">
          {{ d.day }}
          <slot :item="d" :index="index" :another-attribute="anotherAttribute"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  useRoute
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    // 展示状态: 用于弹窗和抽提框
    show: {
      type: Boolean,
      default: false
    },
    // 可点击状态
    disabled: {
      type: Boolean,
      default: true
    },
    // 按钮类型: text为文本类型，button为按钮类型
    buttonType: {
      type: String,
      default: "text"
    },
    // 展示选择状态，只有请求数据的时候才展示
    chooseStatus: {
      type: Boolean,
      default: false
    },
    style: {
      type: Object,
      default: () => {
        return {
          'height': '30px',
          'line-height': '30px'
        }
      }
    }
  },
  emits: ['changeMonth', 'changeDay'],
  setup(props, context) {
    const route = useRoute();
    let now: any = ref(new Date())
    let year: any = ref(0)
    let month: any = ref(0)
    let weeks: any = ["日", "一", "二", "三", "四", "五", "六"]
    let monthData: any = ref([])
    let currentYear: any = new Date().getFullYear()
    let currentMonth: any = new Date().getMonth() + 1
    let currentDay: any = new Date().getDate()
    let chooseDay: any = ref("")

// 监听弹窗变量
    watch(route, (newValues, prevValues) => {
      chooseDay.value = ""
    }, {
      deep: true
    })

    // 设置年月
    function setYearMonth(now: any) {
      year.value = now.getFullYear()
      month.value = now.getMonth() + 1
    }

    // 上一年
    function preYear() {
      let n = now.value
      let date = new Date(n.getFullYear() - 1, n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds());

      setYearMonthInfos(date)
    }

    // 上一月
    function preMonth() {
      let n = now.value
      let date = new Date(n.getFullYear(), n.getMonth() - 1, n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds());

      setYearMonthInfos(date)
    }

    // 下一年
    function nextYear() {
      let n = now.value
      let date = new Date(n.getFullYear() + 1, n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds());

      setYearMonthInfos(date)
    }

    // 下一月
    function nextMonth() {
      let n = now.value
      let date = new Date(n.getFullYear(), n.getMonth() + 1, n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds());

      setYearMonthInfos(date)
    }

    function setYearMonthInfos(date: any) {
      setYearMonth(date)
      generateMonth(date)
      now.value = date
      dateChange()
    }

    function generateMonth(date: any) {
      date.setDate(1)
      debugger
      // 星期 0 - 6， 星期天 - 星期6
      let weekStart = date.getDay()

      // 如果1号是星期天,则去前7天
      weekStart = weekStart === 0 ? 7 : weekStart

      let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      let dayEnd = endDate.getDate()
      // 星期 0 - 6， 星期天 - 星期6
      let weeEnd = endDate.getDay()

      let milsStart = date.getTime()
      let dayMils = 24 * 60 * 60 * 1000
      let milsEnd = endDate.getTime() + dayMils

      let monthDatas = []
      let current: any;

      // 上个月的几天
      for (let i = 0; i < weekStart; i++) {
        current = new Date(milsStart - (weekStart - i) * dayMils)
        monthDatas.push({
          type: -1,
          date: current,
          fullYear: current.getFullYear(),
          month: current.getMonth() + 1,
          day: current.getDate()
        })
      }

      // 当前月
      for (let i = 0; i < dayEnd; i++) {
        current = new Date(milsStart + i * dayMils)
        monthDatas.push({
          type: 0,
          date: current,
          fullYear: current.getFullYear(),
          month: current.getMonth() + 1,
          day: current.getDate()
        })
      }
      
      // 下个月的几天
      for (let i = 0; i < (6 - weeEnd); i++) {
        current = new Date(milsEnd + i * dayMils)
        monthDatas.push({
          type: 1,
          date: current,
          fullYear: current.getFullYear(),
          month: current.getMonth() + 1,
          day: current.getDate()
        })
      }

      monthData.value = []
      for (let i = 0; i < monthDatas.length; i++) {
        let mi = i % 7;
        if (mi == 0) {
          monthData.value.push([])
        }
        monthData.value[Math.floor(i / 7)].push(monthDatas[i])
      }

      // 少于6行，补足6行
      if (monthData.value.length <= 5) {
        milsStart = current.getTime()
        let lastLine = []
        for (let i = 1; i <= 7; i++) {
          current = new Date(milsStart + i * dayMils)
          lastLine.push({
            type: 1,
            date: current,
            fullYear: current.getFullYear(),
            month: current.getMonth() + 1,
            day: current.getDate()
          })
        }
        monthData.value.push(lastLine)
      }
    }

    function getCellColor(d: any) {
      if (d.fullYear == currentYear.value && d.month == currentMonth.value && d.day == currentDay.value) {
        return "#409eff"
      }
      let color = d.type == -1 ? '#c0c4cc' : (d.type == 1 ? '#c0c4cc  ' : '')

      return color;
    }

    function mouseenter(d: any, event: any) {
      // this.$emit("enter", event, d)
    }

    function mouseleave(d: any, event: any) {
      // this.$emit("leave", event, d)
    }

    function dateChange() {
      let fullYear = now.value.getFullYear()
      let _month = now.value.getMonth()

      let startDay = new Date(fullYear, _month, 1)
      let endDay = new Date(fullYear, _month + 1, 0, 23, 59, 59)
      
      context.emit("changeMonth", {
        fullYear,
        month: month.value ,
        startDay,
        endDay
      })
    }

    function handleClick(param: any, event: any){
      chooseDay.value = chooseDay.value === param ? "" : param
      context.emit("changeDay", chooseDay.value)
    }

    onMounted(() => {
      setYearMonth(now.value)
      generateMonth(now.value)
    })

    return {
      year,
      month,
      weeks,
      preYear,
      nextYear,
      preMonth,
      monthData,
      nextMonth,
      currentDay,
      getCellColor,
      mouseenter,
      mouseleave,
      handleClick,
      chooseDay
    }
  }
})
</script>

<style lang="less" scoped>
.cal_con {
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  color: #606266;
  // border: 1px solid #e4e7ed;
  // box-shadow: 0 2px 12px 0 #0000006e;
  // background: #fff;
  // border-radius: 4px;
  margin: auto;

  .cal_header {
    height: 40px;
    padding: 5px;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    justify-items: center;
    text-align: center;

    .cal_h_time {
      cursor: pointer;
    }

    .cal_h_time:hover {
      color: #409eff;
    }

    .cal_h_left {
      height: 100%;
      display: flex;

      .cal_h_btn {
        height: 100%;
        width: 24px;
        cursor: pointer;
      }

      .cal_h_btn:hover {
        background-color: #ebeef5;
      }

      .cal_h_l_icon {
        height: 8px;
        width: 12px;
        margin: auto;
      }
    }
  }

  .cal_month {
    font-size: 14px;
    text-align: center;
    height: calc(100% - 34px);

    .cal_m_day_cell {
      // border-bottom: 1px solid #ebeef5;
      // border-right: 1px solid #ebeef5;
      width: 100%;
      // min-height: 40px;
      line-height: 24px;
      cursor: pointer;
      position: relative;
      &.current{
          background: #409eff;
          color: #fff;
          // border: 2px solid #40a9ff;
          // width: calc(100% - 6px);
        }
      &.cal_m_day_week {
        min-height: 24px;
        border: 0
      }
    }

    .cal_m_day_cell .cell-box:hover {
      background: #eee;
      // color: #409eff;
    }

    .cal_m_day_cell .choose-cell{
      background: #ffc09f;
      color: #fff;
    }

    .cal_m_weeks {
      height: 45px;
      padding: 8px;
      display: flex;
      justify-content: space-around;
      justify-items: center;
      border-bottom: 1px solid #e4e7ed;
    }

    .cal_m_days {
      height: calc(100% - 49px);
      display: flex;
      justify-content: space-around;
      justify-items: center;
      flex-wrap: wrap;
      padding: 5px;
      padding-bottom: 10px;
      &:nth-child(7n) {
        border-right: 0;
      }

      .cal_m_day_line {
        width: 100%;
        display: flex;
        justify-content: space-around;
        justify-items: center;
      }
    }
  }
}
</style>
