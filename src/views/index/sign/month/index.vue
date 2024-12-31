<template>
<v-calendar @changeMonth="changeMonth" @changeDay="changeDay" :style="{
    'height': '50px',
    'line-height': '30px'
  }">
    <template v-slot:default="row">
      <template v-for="(item, index) in calendarData" :key="index">
        <div class="data-list font12" :class="{day: item.status}" v-if="item.date == `${row.item.fullYear}-${row.item.month}-${row.item.day}`">

          <div class="cl-green" v-if="item.sign == 'true'">已签</div>
          <template v-else>
            <div class="cl-ccc" v-if="item.status">未签</div>
            <div class="cl-ccc" v-else>未签</div>
          </template>
        </div>
      </template>
    </template>
  </v-calendar>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  ref,
  useStore
} from '@/utils'
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const calendarData: any = ref([])
    const date: any = new Date()
    const currentData = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    function init(param: any = {}) {
      store.dispatch('common/Fetch', {
        api: "Calendar",
        data: {
          type: 'sign',
          ...param
        }
      }).then((res: any) => {
        calendarData.value = res.result
      })
    }
  
function changeDay(data: any) {

      if (currentData !== `${data.fullYear}-${data.month}-${data.day}`) {
        return
      }

      store.dispatch('common/Fetch', {
        api: 'Sign',
        data: {
          year: data.fullYear,
          month: data.month,
          day: data.day
        }
      }).then(res => {
        proxy.$hlj.message({
          type: 'info',
          msg: res.result.msg
        })

        init({
          year: data.fullYear,
          month: data.month
        })
      })
    }

    function changeMonth(data: any) {
      init({
        year: data.fullYear,
        month: data.month
      })
    }

</script>