<template>
<span class="selectgroup">
  <select v-model="current.year" @change="handleclick('year')">
    <option v-for="(item, index) in yearList" :key="index" :value="item.value">{{item.name}}</option>
  </select>
  <select v-model="current.month" @change="handleclick('month')">
    <option v-for="(item, index) in monthList" :key="index" :value="item.value">{{item.name}}</option>
  </select>
  <select v-model="current.day" @change="handleclick('day')">
    <option v-for="(item, index) in dayList" :key="index" :value="item.value">{{item.name}}</option>
  </select>
</span>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
} from 'vue'

export default defineComponent({
  name: 'v-Birthday',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          year: "",
          month: "",
          day: ""
        }
      }
    },
  },
  emits: ['choose'],
  setup(props, context) {
    let month: any = ref(0)
    let day: any = ref(0)
    const current: any = props.data
    const yearList: any = ref([{
      value: 0,
      name: "--"
    }])
    const monthList: any = ref([{
      value: 0,
      name: "--"
    }])
    const dayList: any = ref([{
      value: 0,
      name: "--"
    }])

    function init() {
      // 年份列表
      var yearNow = new Date().getFullYear();
      for (let i = yearNow; i >= 1900; i--) {
        yearList.value.push({
          value: i,
          name: i
        })
      }

      // 月份列表
      for (var i = 1; i <= 12; i++) {
        monthList.value.push({
          value: i,
          name: i
        })
      }
    }

    // 日列表(仅当选择了年月)
    function BuildDay() {
      dayList.value = [{
        value: 0,
        name: "--"
      }]
      if (current.year === 0 || current.month === 0) {
        // 未选择年份或者月份
        current.day = 0
      } else {
        var dayCount = 0;
        switch (current.month) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            dayCount = 31;
            break;
          case 4:
          case 6:
          case 9:
          case 11:
            dayCount = 30;
            break;
          case 2:
            dayCount = 28;
            if ((current.year % 4 == 0) && (current.year % 100 != 0) || (current.year % 400 == 0)) {
              dayCount = 29;
            }
            break;
          default:
            break;
        }

        for (var i = 1; i <= dayCount; i++) {
          dayList.value.push({
            value: i,
            name: i
          })
        }
      }
    }

    function handleclick(params: any) {
      if (params === 'year') {
        month.value = 0
        day.value = 0
      } else if (params === 'month') {
        BuildDay();
      }
      context.emit('choose', current)

    }

    onMounted(() => {
      init()
      BuildDay()
    })
    return {
      handleclick,
      yearList,
      monthList,
      dayList,
      current
    }
  }
})
</script>
