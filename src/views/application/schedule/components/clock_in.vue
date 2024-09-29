<template>
<v-button v-model:show="isShow">
  <span class="relative" v-if="!data.status">
    去搭班车
    <i class="iconfont icon-dot cl-red" style="position: absolute; top: --15px; right: -15px;"></i>
  </span>
  <span v-else>已搭班车</span>
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="去搭班车" :action="action" :style="{width: 550, height: 680}" width="520px" height="450px" :hasfooter="!data.status" @submit="submit">
  <template v-slot:content>
    <ul class="edit-list">
      <li>
        <div>日程名称：{{data.name}}</div>
      </li>
      <li>
        <div>日程介绍：{{data.description}}</div>
      </li>
      <li>
        <v-album :data="data" @onLocaltion="(e)=>data.location = e" />
        <div class="font12 cl-666">点击图片以选择
        </div>
      </li>
      <li class="vertical">
        <div class="bg-white" style="overflow: hidden;">
        <v-upload ref="upload" @imgList="image" file="talk" :mask="true" />
        </div>
        <div class="font12 cl-666" @click="upload.handleclick()">
          上传图片
        </div>
      </li> 
      <li class="vertical">
        <div class="label">简单描述</div>
        <textarea v-model="description" class="w-full" placeholder="投稿说明(必填)"></textarea>
      </li>   
      <li>
        {{data.location}}
        <v-location @onLocaltion="(e)=>data.location = e" />
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
  useStore,
  getUid
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
const description: any = ref("")
const img: any = ref("")
const upload: any = ref(null);

// 监听图片上传
function image(a: any) {
  img.value = a
}

function submit(params: any) {
  const {
    id,
    name,
    location,
    sync,
    system,
    cover
  } = props.data

  const param: any = {
    fid: id,
    location,
    sync,
    system,
    image: cover.split('thumb/')[1],
    summary: name,
    description: description.value,
    style: JSON.stringify({left: Math.floor(Math.random() * 20 + 10), top: Math.floor(Math.random() * 100 - 150)})
  }

  store.dispatch('common/Fetch', {
    api: "updateSchedule",
    data: {
      coding: props.data.coding,
      uid: getUid(),
      ...param
    }
  }).then(res => {
    props.render()
    isShow.value = false
  })
}
</script>
