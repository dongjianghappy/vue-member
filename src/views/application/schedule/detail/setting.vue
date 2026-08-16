<template>
    <v-button v-model:show="isShow">
        <i class="iconfont icon-shezhi" />
    </v-button>
    <v-dialog v-model:show="isShow" ref="dialog" action="edit" title="日程设置" :data="data" api="scheduleDetailInfo" :style="{width: 600, height: 500}" :contentStyle="{height: '440px', overflow: 'auto'}" @submit="submit">
        <template v-slot:content>
            <div class="edit-list">
                <div class="li mb15">
                    <span class="label mb10">日程 <i class="iconfont icon-dot" /> {{detail.name}}</span>
                </div>
                <div class="li mb15">
                  <div class="label mb5">重要日程</div>
                    <v-radio label="否" name="important" value="0" v-model:checked="detail.important" />
                    <v-radio label="是" name="important" value="1" v-model:checked="detail.important" />
                  </div>                
                <div class="li mb15" v-if="detail.important === '1'">
                    <div class="label mb5">倒计时提醒(天)</div>
                    <input type="text" v-model="detail.countdown" class="input-sm input-full">
                </div>
                <div class="label mb5">闹钟</div>
                <div>
                  <input type="text" v-model="detail.alarm" class="input-sm input-full">
                </div> 
                <div class="label mb5">周期</div>
                <div>
                  
                </div> 
                <div class="label mb5">权限</div>
                <div>
                  <input v-model="detail.start_time" type="text" placeholder="开始时间" class="input-sm input-150" />
                  <v-timepicker :data="detail" attr="start_time" />
                  至
                  <input v-model="detail.last_time" type="text" placeholder="结束时间" class="input-sm input-150" />
                  <v-timepicker :data="detail" attr="last_time" />
                </div> 
            </div>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  useStore,
  provide,
  computed,
  codings
} from '@/utils'

const props: any = defineProps({
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
})
const store = useStore();
const coding: any = codings.user.schedule.cate
const dialog: any = ref(null)
const isShow = ref(false)
const formList: any = ref([])
const detail: any = ref({})

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    detail.value = await dialog.value.init()
  }
})

function submit(params: any) {
  const {
    id,
    important,
    countdown,
    alarm,
    start_time,
    last_time,
    visible
  } = detail.value

  const param: any = {
    coding,
    id ,
    important,
    countdown,
    alarm,
    start_time,
    last_time,
    visible
  }

  store.dispatch('common/Fetch', {
    api: 'Update',
    data: {
      ...param,
    }
  }).then(() => {
    isShow.value = false
    props.render()
  })
}
</script>
