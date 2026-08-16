<template>
    <v-button v-model:show="isShow">
        打卡
    </v-button>
    <v-dialog v-model:show="isShow" ref="dialog" title="去搭班车" :action="action" :style="{width: 550, height: 600}" :contentStyle="{height: '500px', overflow: 'auto'}" :hasfooter="!data.status" @submit="submit">
        <template v-slot:content>
            <ul class="edit-list">
                <li>
                    <div>日程名称：{{data.name}}</div>
                </li>
                <li>
                    <div>日程介绍：{{data.description}}</div>
                </li>
                <li class="vertical">
                    <div class="label">图片
                        <span class="ml25 cl-666" @click="handleToggle()">
                            <span v-if="imgType === '1'">图片上传</span>
                            <span v-else>系统选择</span>
                        </span>
                    </div>
                    <template v-if="imgType === '1'">
                        <!-- <v-album :data="data" @onLocaltion="(e)=>data.location = e" :style="{width: '160px', height: '120px'}" /> -->

                        <!-- @click="upload.handleclick()" -->
                    </template>
                    <div style="overflow: hidden;" v-else>
                        <v-upload ref="upload" @imgList="image" file="talk" :mask="true" :showUpload="imgType === '0'" />
                    </div>
                </li>
                <li class="vertical">
                    <div class="label">简单描述</div>
                    <textarea v-model="summary" class="w-full" placeholder="投稿说明(必填)"></textarea>
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
const summary: any = ref("")
const img: any = ref("")
const upload: any = ref(null);
const imgType = ref("1");

// 监听图片上传
function image(a: any) {
  img.value = a
}

function handleToggle(){
  imgType.value = imgType.value === '0' ? '1' : '0';
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
    image: imgType.value === '0' ? img.value : `|${cover.split('thumb/')[1]}|`,
    summary: summary.value,
    imgType: imgType.value,
    schedule_id: id
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
