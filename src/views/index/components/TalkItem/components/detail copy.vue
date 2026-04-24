<template>
    <v-button v-model:show="isShow">
        编辑
    </v-button>
    <v-dialog v-model:show="isShow" ref="dialog" title="编辑" action="edit" :data="data" api="talkDetail" :style="{width: 750, height: 600}" :contentStyle="{height: '500px', overflow: 'auto'}" @submit="submit">
        <template v-slot:content>
            <div class="edit-list">
                <div class="li" v-if="detail.type === 'schedule'">
                    <span class="label">日程</span>
                    <v-select :enums="scheduleTabs" v-model:value="detail.schedule_id" />
                </div>
                <div class="li" v-if="detail.type === 'schedule'">
                    <span class="label">内容</span>
                    <Detail2 />
                </div>
                <div class="li">
                    <span class="label">话题</span>
                    <input v-model="detail.title" type="text" class="input-sm input-full" />
                </div>
                <div class="li" v-if="detail.type === 'schedule'">
                  <v-radio label="自定义图" name="schedule_system_image" value="0" v-model:checked="detail.schedule_system_image" />
                  <v-radio label="系统选择" name="schedule_system_image" value="1" v-model:checked="detail.schedule_system_image" />
                </div>
                <div class="li ptb10" v-if="detail.schedule_system_image === '1'">
                    <v-album :data="currentSchedule" @onLocaltion="(e)=>data.location = e" :style="{width: '160px', height: '120px'}" />
                    <!-- <img :src="detail.image[0]" class="h150" /> -->
                </div>
                <div class="li" v-else>
                    <span class="label">图片</span>
                    <v-upload ref="upload" :data="{id: detail.id}" :dataList="detail.image || []" :uploadtype="channel" @imgList="image" :style="'width: 135px'" />

                </div>
                <div class="li">
                    <span class="label">内容</span>
                    <textarea v-model="detail.summary" style="height: 260px" placeholder="请输入内容" class="w-full"></textarea>
                </div>
                <div class="li">
                    <span class="label">所在位置</span>
                    <span class="mr10" v-if="detail.location">{{detail.location}}</span>
                    <v-location @onLocaltion="(e)=>detail.location = e" />
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
  useStore
} from '@/utils'

import Detail2 from './detail2.vue'
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
  }
})
const store = useStore();
const isShow = ref(false)
const dialog: any = ref(null)
const detail: any = ref({})
const upload: any = ref(null);
const img = ref("")
const scheduleList: any = ref([])
const currentSchedule: any = ref({
  cover: ""
});
const scheduleTabs: any = ref([])

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    detail.value = await dialog.value.init()
    if(detail.value.type === 'schedule'){
      schedule()
    }
  }
})

// 监听路由
watch([() => detail.value.schedule_id], (newValues, prevValues) => {
  if(detail.value.schedule_id !==0){
    const arr = scheduleList.value.filter((item: any) => {
      return item.id === detail.value.schedule_id
    })
    if(arr.length > 0){
      currentSchedule.value = arr[0]
      currentSchedule.value.cover = detail.value.image[0]
    }
  }
})

// 设置图片
function image(a: any) {
  img.value = a
}

function schedule(){
  scheduleTabs.value = []
  store.dispatch('common/Fetch', {
    api: "schedule",
    data: {
      system: '1'
    }
  }).then(res => {
    scheduleList.value = res.result
    const arr = res.result.filter((item: any) => {
          return item.id === detail.value.schedule_id
        })

    if(arr.length > 0){
      currentSchedule.value = arr[0]
      currentSchedule.value.cover = detail.value.image[0]
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
  const {
    id,
    title,
    image,
    schedule_id,
    schedule_system_image,
    summary,
    location
  } = detail.value

  const param: any = {
    id,
    title,
    // img: img.value,
    image: schedule_system_image === '0' ? img.value : `|${currentSchedule.value.cover.split('thumb/')[1]}|`,
    schedule_id,
    schedule_system_image,
    summary,
    location,
    coding: props.data.coding
  }

  if(props.action !== 'edit'){
    param.operation = "commit"
  }

  store.dispatch('common/Fetch', {
    api: 'updateTalk',
    data: {
      ...param,
    }
  }).then(() => {
    isShow.value = false
    props.data.image = image
    props.data.summary = summary
  })
}
</script>
