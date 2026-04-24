<template>
    <v-button v-model:show="isShow">
        编辑
    </v-button>
    <v-dialog v-model:show="isShow" ref="dialog" title="" :action="action" :data="{short_url_id: data.short_url_id, coding: data.coding}" api="talkDetail" :style="{width: 600, height: 500}" :contentStyle="{height: '400px', overflow: 'auto'}" @submit="submit">
        <template v-slot:content>
            <div class="edit-list">
                <div class="li mb15">
                    <span class="label">话题</span>
                    <input v-model="detail.title" type="text" class="input-sm input-full" />
                </div>
                <div class="li img-wrap">
                    <v-upload ref="upload" :data="{id: detail.id}" :dataList="detail.image || []" :uploadtype="channel" @imgList="image" :style="'width: 135px'" />
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
  },
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
  }
})

// 设置图片
function image(a: any) {
  img.value = a
}

function submit(params: any) {
  const {
    id,
    title,
    image,
    summary,
    location
  } = detail.value

  const param: any = {
    id,
    title,
    img: img.value,
    summary,
    location,
    coding: props.data.coding
  }

  if(props.action !== 'edit'){
    param.operation = "commit"
  }

  store.dispatch('common/Fetch', {
    api: props.type === 'schedule' ? 'updateSchedule' : 'updateTalk',
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