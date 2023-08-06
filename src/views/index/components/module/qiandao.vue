<template>
<v-button v-model:show="isShow">
  <span style="color: #eb7350"><i class="iconfont icon-feedback font18" />签到</span>
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="每日签到" :style="{width: 550, height: 550}" :hasfooter="false">
  <template v-slot:content>
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
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  watch
} from 'vue'
import {
  useStore
} from 'vuex'
export default defineComponent({
  name: 'HomeViewh',
  components: {

  },
  props: {
    group: {
      type: Object,
      default: () => {
        return {}
      }
    },
    coding: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
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
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const isShow = ref(false)
    const calendarData = ref([])
    const date: any = new Date()
    const currentData =  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        let date: any = new Date()
        init({
          year: date.getFullYear(),
          month: date.getMonth() + 1
        })
      }
    })

    function init(param: any = {}) {
      store.dispatch('common/Fetch', {
        api: "Calendar",
        data: {
          type: 'sign',
          ...param
        }
      }).then((res: any) => {
        calendarData.value = res.result
        debugger
      })
    }

    function changeMonth(data: any) {
      init({
        year: data.fullYear,
        month: data.month
      })
    }

    function changeDay(data: any) {

      if(currentData !== `${data.fullYear}-${data.month}-${data.day}`){
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
          msg: res.result.msg
        })

        init({
          year: data.fullYear,
          month: data.month
        })
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

<style lang="less" scoped>
.data-list{
  position: absolute; top: 5px; right: 5px; bottom: 5px; left: 5px;
  border-radius: 5px ;
  padding-top: 22px;
  &.day{
    border: 1px dashed #f67f00;
  }
}
</style>
