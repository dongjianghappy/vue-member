<template>
    <v-button v-model:show="isShow">
        <i class="iconfont icon-anonymous-iconfont" />添加
    </v-button>
    <v-dialog v-model:show="isShow" ref="dialog" title="日程种类" :style="{width: 750, height: 500}" :hasfooter="false">
        <template v-slot:content>
            <div style="height: 420px; overflow-y: auto;">
                <div class="module-wrap">
                    <div class="module-head">已选项目
                        <span class="right" @click="handleEdit">{{!isEdit ? '编辑' : '保存'}}</span>
                    </div>
                    <div class="module-content">
                        <div class="col-md-2 p10 current-schedule" v-for="(item, index) in schedule.list1" :key="index" :draggable="isEdit" @dragend="handleDragEnd($event, item)" @dragstart="handleDragStart($event, item)" @dragenter="handleDragEnter($event, item)" @dragover.prevent="handleDragOver($event, item)">
                            <div class="relative p15 align_center" style=" background: var(--card-background); border-radius: 8px;">
                                <i class="iconfont icon-close absolute" @click="choose(item.id)" style="top: 0px; right: 0px;" v-if="isEdit" />
                                <i class="iconfont icon-img font32" />
                                <div class="ptb10 h30 font6">{{item.name}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="module-wrap">
                    <div class="module-head">未选项目</div>
                    <div class="module-content">
                        <div class="col-md-2 p10" v-for="(item, index) in schedule.list2" :key="index">
                            <div class="p15 align_center" @click="choose(item.id)" style=" background: var(--card-background); border-radius: 8px;">
                                <i class="iconfont icon-img font32" />
                                <div class="ptb10 h30 font6">{{item.name}}</div>
                            </div>
                        </div>
                    </div>
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
  computed
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
const isEdit: any = ref(false)
const dataList: any = ref([])
const dragging = ref(null) // 拖拽状态
const box: any = ref(0)
let current: any = ref([])

const schedule: any = computed((item: any) => {
  let arrs: any = []
  for(let i = 0; i < current.value.length; i++){
    let arr: any = dataList.value.filter((item: any) => item.id === current.value[i])
    if(arr.length > 0){
      arrs.push(arr[0])
    }
  }

  let list2: any = dataList.value.filter((item: any) => current.value.indexOf(item.id) === -1)

  return {
    list1: arrs,
    list2
  }
})

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    init()
    current.value = props.data.schedule_id
  }else{
    isEdit.value = false
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

  if(!isEdit.value){
    return
  }

  if (index > -1) {
    current.value.splice(index, 1)
  } else {
    current.value.push(param)
  }
}

async function handleEdit(){
  isEdit.value = !isEdit.value
  if(isEdit.value) return
  
  store.dispatch('common/Fetch', {
    api: "editUserInfo",
    data: {
      schedule: current.value.join(',') || "",
    }
  }).then(res => {
    props.render()
  })
}

function handleDragStart(e: any, item: any) {
  dragging.value = item.id
}

function handleDragEnd(e: any, item: any) {
  dragging.value = null
}

function handleDragOver(e: any) {
  e.dataTransfer.dropEffect = 'move'
}

function handleDragEnter(e: any, item: any) {
  e.dataTransfer.effectAllowed = 'move'
  if (item.id === dragging.value) {
    return
  }
  const newItems = [...current.value]
  const src = newItems.indexOf(dragging.value)
  const dst = newItems.indexOf(item.id)
  box.value = dst
  newItems.splice(dst, 0, ...newItems.splice(src, 1))
  current.value = newItems
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
