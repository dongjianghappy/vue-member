<template>
<v-popover content="<i class='iconfont icon-calendar' />" arrow="tb" offset="right" :move="-150" keys="calendar">
  <div style="width: 350px; height: 350px;">
    <v-calendar @changeMonth="changeMonth" @changeDay="changeDay">
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
</v-popover>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineProps,
  defineEmits,
  ref
} from 'vue'
import {
  colorList
} from '@/assets/const'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  attr: {
    type: String,
    default: ""
  }
})
const emit: any = defineEmits(['color'])
const {
  proxy
}: any = getCurrentInstance();

function changeDay(data: any) {
  let date: any = `${data.fullYear}-${data.month}-${data.day}`
  let currentTime = new Date(date)

  if(!data){
    return
  }
  // 校验开始时间
  if(props.attr === 'start_time' && props.data.last_time !== "" && currentTime > new Date(props.data.last_time)){
    proxy.$hlj.message({
      msg: "开始时间不能大于结束时间"
    })
    return
  }
  // 校验开始时间
  else if(props.attr === 'last_time' && props.data.start_time !== "" && currentTime < new Date(props.data.start_time)){
    proxy.$hlj.message({
      msg: "结束时间不能小于开始时间"
    })
    return
  }

  props.data[props.attr] = date
}
</script>
