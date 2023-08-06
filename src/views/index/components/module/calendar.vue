<template>
<!-- 日历 -->
<div class="module-wrap">
  <div class="module-content sign p0 clearfix">
    <v-calendar @changeMonth="changeMonth" @changeDay="changeDay" :chooseStatus="true">
      <template v-slot:default="row">
        <template v-for="(item, index) in calendarData" :key="index">
          <div style="display: flex; flex-wrap:wrap; position: absolute; width: 100%; bottom: 0px; top: 25px; padding: 10px" v-if="item.date == `${row.item.fullYear}-${row.item.month}-${row.item.day}`">
            <div class="col-md-4" style="height: 32px;" v-for="(list, i) in item.list.slice(0, 5)" :key="i"><img :src="list.photos" style="border-radius: 50px; width: 32px; height: 32px;"></div>
            <div class="col-md-4" style=" height: 32px; line-height: 32px; display: inline-block;">
              <div style="background: #ddd; border-radius: 50px; width: 32px; height: 32px;" v-if="item.list.length > 5">{{item.num}}</div>
            </div>
          </div>
        </template>
      </template>
    </v-calendar>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useStore,
  useRoute,
  ref,
} from '@/utils'
import {
  week
} from '@/assets/const'

export default defineComponent({
  name: 'SignView',
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    },
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const isShow = ref(false)
    const calendarData = ref([])
    const date: any = new Date()
    const currentData =  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`


    function changeMonth(data: any) {
      // props.render({
      //   type: route.query.mod || 'talk',
      //   year: data.fullYear,
      //   month: data.month
      // })
    }

    function changeDay(data: any) {
      props.render({
        type: route.query.mod || 'talk',
        year: data.fullYear,
        month: data.month,
        day: data.day
      })
    }

    return {
      isShow,
      currentData,
      changeMonth,
      changeDay,
      calendarData
    }
  }
})
</script>
