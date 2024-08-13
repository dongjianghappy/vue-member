<template>
<v-button v-model:show="isShow">
  <i class="iconfont icon-anonymous-iconfont" />日程类型
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="日程类型" :style="{width: 750, height: 500}" @submit="submit">
  <template v-slot:content>
    <ul class="schedule-wrap clearfix">
      <li class="m10 p10 left" :class="{current: current.indexOf(item.id) > -1}" v-for="(item, index) in dataList" :key="index" @click="choose(item.id)">
        {{item.name}}
      </li>
    </ul>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  useStore
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
      return
    }
  }
})
const store = useStore();
const dialog: any = ref(null)
const isShow = ref(false)
const dataList: any = ref([])
let current: any = ref(props.data.schedule_id)

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    init()
  }
})

function init() {
  store.dispatch('common/Fetch', {
    api: "schedule",
    data: {
      coding: props.coding,
      system: '1'
    }
  }).then(res => {
    dataList.value = res.result || []
  })
}

function choose(param: any) {
  let index = current.value.indexOf(param)
  if (index > -1) {
    current.value.splice(index, 1)
  } else {
    current.value.push(param)
  }
}

function submit(params: any) {

  store.dispatch('common/Fetch', {
    api: "editUserInfo",
    data: {
      schedule: current.value.join(',') || "",
    }
  }).then(res => {
    props.render()
    isShow.value = false
  })
}
</script>

<style lang="less" scoped>
.schedule-wrap{
  .current{
    background: var(--card-background) !important;
    border-radius: 4px;
  }
}
</style>
