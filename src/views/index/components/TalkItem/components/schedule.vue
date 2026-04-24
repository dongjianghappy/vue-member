<template>
    <v-button v-model:show="isShow">
        设置
    </v-button>
    <v-dialog v-model:show="isShow" ref="dialog" title="日程设置" action="edit" :data="data" api="talkDetail" :style="{width: 600, height: 500}" :contentStyle="{height: '400px', overflow: 'auto'}" @submit="submit">
        <template v-slot:content>
            <div class="li mb15">
                <span class="label">日程</span>
                <v-select :enums="scheduleTabs" v-model:value="data.schedule_id" />
            </div>
            <div>日程列表 <span class="right" @click="handleAdd">添加</span></div>
            <div style="height: 350px; overflow-y: auto;">
                <ItemList v-for="(item, index) in data.schedule" :data="item" :index="index" @remove="handleRemove" :currentSchedule="currentSchedule" :key="index" />
            </div>
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
import ItemList from './item.vue'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  action: {
    type: String,
    default: "edit"
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
const dialog: any = ref(null)
const detail: any = ref({})
const upload: any = ref(null);
const img = ref("")
const scheduleTabs: any = ref([])
const currentSchedule: any = ref({
  cover: "",
  image: []
});

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    if(props.data.type === 'schedule'){
      schedule()
    }
  }
})

// 监听路由
watch([() => props.data.schedule_id], (newValues, prevValues) => {
  console.log("ggggggggggggggggggggggg");
  
  if(props.data.schedule_id !==0){
    const arr = scheduleList.value.filter((item: any) => {
      return item.id === props.data.schedule_id
    })
    if(arr.length > 0){
      currentSchedule.value = arr[0]
      currentSchedule.value.cover = props.data.image[0]
    }
  }
})


function handleAdd(){
  props.data.schedule.push({})
}

function handleRemove(param: any){
  console.log("ccccccccccccc");
  
  props.data.schedule.splice(param, 1)
}

function schedule(){
  scheduleTabs.value = []
  store.dispatch('common/Fetch', {
    api: "schedule",
    data: {
      system: '1'
    }
  }).then(res => {

    const arr = res.result.filter((item: any) => {
          return item.id === props.data.schedule_id
        })

    if(arr.length > 0){
      currentSchedule.value = arr[0]
      currentSchedule.value.cover = props.data.image[0]
    }

    res.result.map((item: any) => {
    scheduleTabs.value.push({
      name: item.name,
      value: item.id
    })
    })
  })
}

function submit(params: any) {
  console.log("cccccccccccccsssssssss");
  
  const param = JSON.parse(JSON.stringify(props.data.schedule))
  param.map((item: any) => {
    delete item.userList;
    if(Array.isArray(item.image)){
      item.image = `|${item.image[0].split('thumb/')[1]}|`
    }else{
      item.image = `|${item.image.split('thumb/')[1]}|`
    }
    item.talk_id = props.data.id
  })

  store.dispatch('common/Fetch', {
    api: 'updateTalkSchedule',
    data: {
      data: JSON.stringify(param)
    }
  }).then(() => {
    isShow.value = false
    props.render()
  })
}
</script>
