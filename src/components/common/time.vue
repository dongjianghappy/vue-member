<template>
<div id="time-clock" style="position: fixed; left: 20px; bottom: 100px; z-index: 10;">
  <div class="align_center">
    <div class="position-r height-150">
      <svg class="background-clock position-a width-max height-max left-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
        <path d="M469.881,324.15a90.631,90.631,0,0,1,7.616-28.425l15.88-32.267c3.642-7.4,3.642-19.514,0-26.916L477.5,204.275a90.631,90.631,0,0,1-7.616-28.425L467.5,139.967c-.547-8.232-6.6-18.722-13.459-23.311l-29.885-20a90.643,90.643,0,0,1-20.809-20.809l-20-29.885C378.755,39.1,368.265,33.047,360.033,32.5L324.15,30.119A90.631,90.631,0,0,1,295.725,22.5L263.458,6.623c-7.4-3.642-19.514-3.642-26.916,0L204.275,22.5a90.631,90.631,0,0,1-28.425,7.616L139.967,32.5c-8.232.547-18.722,6.6-23.311,13.459l-20,29.885A90.643,90.643,0,0,1,75.844,96.653l-29.885,20C39.1,121.245,33.047,131.735,32.5,139.967L30.119,175.85A90.631,90.631,0,0,1,22.5,204.275L6.623,236.542c-3.642,7.4-3.642,19.514,0,26.916L22.5,295.725a90.631,90.631,0,0,1,7.616,28.425L32.5,360.033c.546,8.232,6.6,18.722,13.458,23.311l29.885,20a90.643,90.643,0,0,1,20.809,20.809l20,29.885c4.589,6.856,15.079,12.912,23.311,13.459l35.883,2.381a90.631,90.631,0,0,1,28.425,7.616l32.267,15.88c7.4,3.642,19.514,3.642,26.916,0l32.267-15.88a90.631,90.631,0,0,1,28.425-7.616l35.883-2.381c8.232-.547,18.722-6.6,23.311-13.459l20-29.885a90.643,90.643,0,0,1,20.809-20.809l29.885-20c6.856-4.589,12.912-15.079,13.458-23.311Z">
        </path>
      </svg>
      <div class="clock-box clock-hour" :style="`transform:translate(-50%) rotate(${30 * today?.time.hour}deg);`"></div>
      <div class="clock-box clock-minute" :style="`transform:translate(-50%) rotate(${6 * today?.time.minute}deg);`">
      </div>
      <div class="clock-box clock-second" :style="`transform:translate(-50%) rotate(${6 * today?.time.second}deg);`">
      </div>
      <!-- <div class="clock-box clock-second" style="border: 1px solid red;"></div> -->
    </div>
    <div class=" font18 margin-top-10 align-center a-link" style="transition: 0.3s ease;">
      <span>{{ today.todayDate2 }}</span>
      <!-- <span>CST</span> -->
    </div>
    <div class=" font36 margin-top-10 align-center a-link" style="min-width: 140px;">
      <span style="transition: 0.3s ease;">{{ today?.time.hour }}:</span>
      <span style="transition: 0.3s ease;">{{ today?.time.minute }}:</span>
      <span style="transition: 0.3s ease;">{{ today?.time.second }}</span>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onUnmounted
} from 'vue'
export default defineComponent({
  setup() {
    const today = ref(getToday())
    const count = ref()

    count.value = setInterval(() => {
      today.value = getToday()
    }, 1000)

    function getToday() {
      const array = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      const date = new Date()
      const todayDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      const todayDate2 = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
      const time = {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
      }

      return {
        week: array[date.getDay()],
        todayDate,
        todayDate2,
        time
      }

    }

    onUnmounted(() => {
      clearInterval(count.value)
      console.log('跳出页面~')
    })

    return {
      today

    }
  }

})
</script>

<style lang="less" scoped>
.background-clock{
  fill: var(--input-background);
}
.clock-box.clock-hour {
  --w: 8%;
  --h: 25%;
  --color: yellow;
}

.clock-box.clock-minute {
  --w: 8%;
  --h: 34%;
  --color: yellow;
}

.clock-box.clock-hour:before,
.clock-box.clock-minute:before {
  background: var(--color-primary);
  content: "";
  display: block;
  position: absolute;
  width: var(--w);
  height: calc(var(--h) + 4%);

  left: calc(50% - var(--w) / 2);
  bottom: 46%;
  border-radius: 50px;
  transition: 0.3s ease;
}

.clock-box.clock-second:before {
  background: var(--color-primary);
  content: "";
  display: block;
  position: absolute;
  width: 9.5%;
  height: 9.5%;
  border-radius: 50px;
  top: 6.5%;
  left: 45.25%;
  transition: 0.3s ease;
}

.clock-box {
  /* transform: translate(-50%); */
  width: 120px;
  height: 120px;
  margin: auto;
  left: 50%;
  top: 13px;
  position: absolute;
  transition: 0.3s ease;
}
</style>
