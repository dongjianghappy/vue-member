<template>
    <v-button v-model:show="isShow">
      {{data.type === 'schedule' ? '打卡' : '编辑'}}
    </v-button>
    <v-dialog v-model:show="isShow" ref="dialog" title="编辑" action="edit" :data="data" api="talkDetail" :style="{width: 600, height: 500}" :contentStyle="{height: '400px', overflow: 'auto'}" @submit="submit">
        <template v-slot:content>
            <div class="edit-list">
                <div class="li mb25" v-if="detail.type === 'schedule'">
                    <span class="label">日程 <i class="iconfont icon-dot" /> {{detail.schedule_name}}</span>
                    <span class="right">
                        <Detail2 :data="detail" :render="init" />
                    </span>
                </div>
                <div class="li mb15" v-if="detail.type !== 'schedule'">
                    <span class="label">话题</span>
                    <input v-model="detail.title" type="text" class="input-sm input-full" />
                </div>
                <div class="li img-wrap">
                    <div class="flex" v-if="detail.type === 'schedule'">
                        <div class="m15" v-for="(item, index) in detail.schedule" :key="index" style="width: 135px; height: 100%">
                            <img :src="item.image" style="width: 135px; height: 135px" />
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                    <v-upload ref="upload" :data="{id: detail.id}" :dataList="detail.image || []" :uploadtype="channel" @imgList="image" :style="'width: 135px'" v-else />
                </div>
                <div class="li">
                    <span class="label">内容</span>
                    <textarea v-model="detail.summary" style="height: 260px" placeholder="请输入内容" class="w-full"></textarea>
                </div>
                <div class="li mt10">
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
  useStore,
  provide
} from '@/utils'

import Detail2 from './detail2.vue'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  type: {
    type: String,
    default: ''
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


// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    detail.value = await dialog.value.init()
    if(props.type === 'schedule'){
      const { id, name } = props.data
      detail.value = props.data
      detail.value.schedule = []
      detail.value.userList = []
      detail.value.schedule_name = name
      detail.value.schedule_id = id
    }
  }
})

async function init(){
  detail.value = await dialog.value.init()
}


// 设置图片
function image(a: any) {
  img.value = a
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
    img: img.value,
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

<style scoped>
.img-wrap{
  background: var(--color-primary-background);
  overflow: auto;
  height: auto;
}
</style>