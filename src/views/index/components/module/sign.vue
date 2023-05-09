<template>
<!-- 签到 -->
<div class="module-wrap">
  <div class="module-content sign p0 clearfix">
    <div class="span datetime">
      <i class="week">{{datetime.week}}</i>
      <i class="time">{{datetime.year}}.{{datetime.month}}.{{datetime.day}}</i>
    </div>
    <div class="span sign-button" @click="sign"><i class="iconfont icon-feedback font18" />
      <span class="hassign" v-if="userInfo.isSign">
        已签
      </span>
      <span class="signin" v-else>签到</span>
    </div>
  </div>
</div>
<!-- 日历 -->
<div class="module-wrap">
  <div class="module-content sign p0 clearfix">
    <v-calendar @changeMonth="changeMonth" @changeDay="changeDay" height="30px">
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
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const date = new Date();
    const datetime: any = ref({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      week: week[date.getDay()]
    })

    function sign() {
      store.dispatch('common/Fetch', {
        api: 'Sign'
      }).then(res => {
        proxy.$hlj.message({
          msg: res.result.msg
        })
      })
    }

    return {
      sign,
      datetime,
    }
  },
})
</script>
