<template>
    <v-button v-model:show="isShow">
        打卡
    </v-button>
    <v-dialog v-model:show="isShow" ref="dialog" title="" :data="data" api="talkDetail" :style="{width: 600, height: 500}" :contentStyle="{height: '400px', overflow: 'auto'}" @submit="submit">
        <template v-slot:content>
            <div class="edit-list">
                <div class="li mb15">
                    <span class="label mb10">日程 <i class="iconfont icon-dot" /> {{detail.name}}</span>
                    <span class="right" v-if="detail.list.length">
                        <ChooseType :dataList="detail.list" @choose="chooseType" />
                    </span>
                </div>
                <div class="li">
                    <Item v-for="(item, index) in dataList" :data="item" :isRoot="detail.isRoot" :index="index" @remove="handleRemove" :formList="formList" :key="index" />
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
  computed
} from '@/utils'

import ChooseType from './chooseType.vue'
import Item from './item.vue'

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
const isShow = ref(false)
const dataList: any = ref([])
const formList: any = ref([])
const detail: any = ref({
  userList: [],
  list: [],
  image: []
})

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    getScheduleDetail()
    getForm()
  }
})


function getForm(){
    store.dispatch('common/Fetch', {
    api: 'getForm',
    data: {
      id: props.data.id,
    }
  }).then((res) => {
    formList.value = res.result
  })
}

function getScheduleDetail() {
  const params: any = {
    id: props.data.id
  }

  if(props.data.talk_id){
    params.talk_id = props.data.talk_id
  }
  store.dispatch('common/Fetch', {
    api: 'scheduleDetail',
    data: {
      ...params
    }
  }).then((res) => {
    detail.value = res.result
    dataList.value = res.result.dataList

    const some = res.result.list.filter((item: any) => res.result.dataList.some((list: any) => item.id === list.schedule_kind_id))
    some.map((item: any) => {
      item.isCurrent = true
    })
  })
}

function chooseType(param: any){
  let index: any = dataList.value.findIndex((item: any) => item.schedule_kind_id === param.id)
  if (index > -1) {
    param.isCurrent = false
    dataList.value.splice(index, 1)
  } else {
    param.isCurrent = true
    dataList.value.push({
        "schedule_id": detail.value.id,
        "schedule_kind_id": param.id,
        "name": param.name,
        "cover": "",
        "content": "",
        "userList": [],
        "image": param.image
      })
  }
}

function handleRemove(param: any){
  let index = dataList.value.findIndex((item: any) => item.schedule_kind_id === param.schedule_kind_id)
  let arr = detail.value.list.filter((item: any) => item.id === param.schedule_kind_id)
  if(arr.length > 0){
    arr[0].isCurrent = false
  }
  dataList.value.splice(index, 1)
}

function submit(params: any) {
  let paramList: any = []
  dataList.value.map((item: any) => {
    let img = item.cover.split('thumb/')[1]
    let list: any = {
      id: item.id,
      schedule_id: item.schedule_id,
      schedule_kind_id: item.schedule_kind_id,
      image: img !== undefined ? `|${img}|` : "",
      content: item.content,
      friend_id: item.friend_id
    }

    const param_extend: any = {}
    for(let i = 0; i < formList.value.length; i++){
      param_extend[formList.value[i].name] = item[formList.value[i].name]
    }
    list.extension_content = param_extend
    paramList.push(list)
  })

  
  const {
    id,
    schedule_id,
    location
  } = detail.value

  const param: any = {
    schedule_id: schedule_id || id ,
    location,
    extend: JSON.stringify(paramList)
  }

  if(props.data.talk_id){
    param.talk_id = props.data.talk_id
  }

  store.dispatch('common/Fetch', {
    api: 'updateSchedule',
    data: {
      ...param,
    }
  }).then(() => {
    isShow.value = false
    props.render()
  })
}
</script>
