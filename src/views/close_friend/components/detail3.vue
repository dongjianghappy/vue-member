<template>
<v-button @click="handleclick">
  {{action == 'edit' ? '编辑' : '新增碎片'}}
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="记忆碎片" :action="action" width="950px" :style="{width: 650, height: 550}" :data="{...data, coding: data.coding.detail}" @submit="submit">
  <template v-slot:content v-if="isShow">
    <div style="height: 400px; overflow: auto;">
      <ul class="form-wrap-box">
        <li class="li">
          <span class="label">记忆</span>
          <input v-model="detail.name" type="text" placeholder="记忆碎片" class="input-sm input-full" />
        </li>
        <li class="li">
          <span class="label">名称</span>
          <input v-model="detail.name" type="text" placeholder="记忆碎片" class="input-sm input-full" />
        </li>
        <li class="li">
          <span class="label">时间</span>
          <div class="flex">
          <div class="w150">
            <input v-model="detail.date" type="text" placeholder="请输入开始时间" class="input-sm input-100" />
            <v-timepicker :data="detail" attr="date" />
          </div>
          <div class="w80 mr10">
            <input v-model="detail.time" type="text" placeholder="12" class="input-sm w50" />时
          </div>
          <div style="flex: 1">
            <input v-model="detail.time_specification" type="text" placeholder="请输入时长说明" class="input-sm w-full" />
          </div>
          </div>
          <!-- <input v-model="detail.start_time" type="text" placeholder="开始时间" class="input-sm input-150" />
          至
          <input v-model="detail.last_time" type="text" placeholder="结束时间" class="input-sm input-150" /> -->
        </li>
        <li class="li">
          <span class="label">地点</span>
          <input v-model="detail.address" type="text" placeholder="请输入投票名称" class="input-sm input-full" />
        </li>
        <li class="li">
          <span class="label">说明</span>
          <textarea placeholder="请输入投票说明" v-model="detail.content" class="w-full"></textarea>
        </li>
        <li class="li">
          <span class="label">图片</span>
          <div class="relative" style="padding-right: 100px">
            <div class="flex">
          <div class="align_center relative" style="width: 33%;" v-for="(item, index) in imageList" :key="index">
            <v-deleteicon :dataList="imageList" field="src" :data="{src: item}" />
            <img :src="item" onerror="this.src='/images/head_normal_100.png'" class="photos p5" style="width: 100%; height: 150px;">
          </div>
            </div>
          <div class="plr15 absolute" style="width:100px; top: 0; right: 0; z-index: 100">
            <ChooseImage :data="{id: detail.fid, coding: data.coding.content}" :imageList="imageList"  @choose="choose" />
            </div>
            </div>
        </li>
      </ul>
    </div>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  ref,
  useStore,
  watch
} from '@/utils'
import ChooseImage from './chooseImage.vue'
const props: any = defineProps({
  action: {
    type: String,
    default: 'add'
  },
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  type: {
    type: String,
    default: "talk"
  },
  render: {
    type: Function,
    default: () => {
      return 'Default function'
    }
  }
})
const isShow: any = ref(false)
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const element: any = document.getElementsByTagName('html');
const dialog: any = ref(null)
const detail: any = ref({})
let current: any = ref({})
const imageList: any = ref([])

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    detail.value = await dialog.value.init()
    if(detail.value.img){
      imageList.value = detail.value.img
    }
    
  }
})

function init(param: any = "") {
  store.dispatch('common/Fetch', {
    data: {
      talk_id: props.data.id
    }
  }).then(res => {
    detail.value = res.result
  })
}

function handleclick(param: any) {
  isShow.value = !isShow.value
}

function choose(param: any){
  let index = imageList.value.findIndex((item: any) => item === param)
  if(index === -1){
    imageList.value.push(param)
  }else{
    imageList.value.splice(index, 1)
  } 
}


// 确认按钮
function submit(params: any) {
  const {
    id,
    fid,
    name,
    content,
    date,
    time,
    time_specification,
    address
  } = detail.value

  let imgArr = []
  for(let i = 0; i < imageList.value.length; i++){
    let len = imageList.value[i].split("/")
    imgArr.push(len[len.length-1])
  }
  

  const param: any = {
    fid: fid || props.data.id,
    name,
    content,
    date,
    time,
    time_specification,
    address,
    image: imgArr.length > 0 ? `|${imgArr.join("|")}|` : "",
    coding: props.data.coding.detail
  }
  if (props.action === 'edit') {
    param.id = id
  }
  
  store.dispatch('common/Fetch', {
    api: props.action === 'add' ? "Insert" : 'Update',
    data: {
      ...param
    }
  }).then(res => {
    props.render()
    isShow.value = false
  })
}

</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  width: 4px;
  /* 设置滚动条的宽度 */
  background-color: #222;
  /* 设置滚动条的背景颜色 */
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  /* 设置滚动条滑块的圆角 */
  background-color: #45494e;
  /* 设置滚动条滑块的颜色 */
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  /* 为滚动条轨道添加阴影效果 */
}
</style>
