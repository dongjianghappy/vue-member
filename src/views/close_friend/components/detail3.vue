<template>
    <v-button @click="handleclick">
        <i class="iconfont icon-edit" v-if="action == 'edit'"></i>
        <span v-else>新增碎片</span>
    </v-button>
    <v-dialog v-model:show="isShow" ref="dialog" title="记忆碎片" :action="action" width="950px" :style="{width: 600, height: 500}" api="getCloseFrienddetail" :data="{...data, coding: data.coding.detail}" @submit="submit">
        <template v-slot:content v-if="isShow">
            <div style="height: 350px; overflow: auto;">
                <div class="edit-list">
                    <div class="li mb25">
                        <div class="label mb5">关联标题
                          <v-relation :data="{coding: data.coding.content}" @choose="chooseRelation" />
                        </div>
                        {{detail.title}}
                    </div>
                    <div class="li">
                        <div class="label">名称</div>
                        <input v-model="detail.name" type="text" placeholder="记忆碎片" class="input-sm input-full" />
                    </div>
                    <div class="li mtb10">
                        <div class="flex mb15">
                            <div class="mr10" style="flex: 1">
                                <div>日期</div>
                                <div class="relative">
                                  <input v-model="detail.date" type="text" placeholder="请输入日" class="input-sm w-full" />
                                  <span class="absolute" style="top: 5px; right: 0px;"><v-timepicker :data="detail" attr="date" /></span>
                                </div>
                            </div>
                            <div style="flex: 1">
                                <div>时段</div>
                                <v-select :enums="period" v-model:value="detail.period" :defaultValue="'0'" />
                            </div>
                        </div>
                        <div class="flex">
                            <div class="mr10" style="flex: 1">
                                <div>时间(24小时制)</div>
                                <input v-model="detail.time" type="text" placeholder="请输入间" class="input-sm w-full" />
                            </div>
                            <div style="flex: 1">
                                <div>时长(分钟)</div>
                                <input v-model="detail.time_specification" type="text" placeholder="请输入时长" class="input-sm w-full" />
                            </div>
                        </div>
                        <!-- <input v-model="detail.start_time" type="text" placeholder="开始时间" class="input-sm input-150" />
          至
          <input v-model="detail.last_time" type="text" placeholder="结束时间" class="input-sm input-150" /> -->
                    </div>
                    <div class="li mtb10">
                        <div class="label">内容</div>
                        <textarea placeholder="请输入内容" v-model="detail.content" class="w-full"></textarea>
                    </div>
                    <div class="li mtb10" style="height: auto">
                        <div class="label">图片

                            <div class="right" style="z-index: 100">
                                <ChooseImage :data="{id: detail.fid, coding: data.coding.content}" :imageList="imageList" @choose="choose" />
                            </div>
                        </div>
                        <div class="relative" style="padding-right: 100px">
                            <div class="flex">
                                <div class="align_center relative" style="width: 33%; height: 150px;" v-for="(item, index) in imageList" :key="index">
                                    <v-deleteicon :dataList="imageList" field="src" :data="{src: item}" />
                                    <img :src="item" onerror="this.src='/images/head_normal_100.png'" class="photos p5" style="width: 100%; height: 150px;">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="li mt25">
                        <span class="label">地点</span>
                        <span class="mr10" v-if="detail.address">{{detail.address}}</span>
                        <v-location @onLocaltion="(e)=>detail.address = e" />
                        <!-- <input v-model="detail.address" type="text" placeholder="请输入投票名称" class="input-sm input-full" /> -->
                    </div>
                </div>
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
import {
  PERIOD
} from '@/assets/const'
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
const period: any = PERIOD
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

function chooseRelation(param: any){
  detail.value.title = param.name
  detail.value.fid = param.id
}

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
    period,
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
    period,
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
