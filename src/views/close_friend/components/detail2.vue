<template>
<v-button @click="handleclick">
  {{action == 'edit' ? '编辑记忆' : '新增记忆'}}
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="新增记忆" :action="action" width="950px" :style="{width: 650, height: 550}" api="closeFriendContentDetails" :data="{...data}" :hasfooter="detail.management_checked !== '1'" @submit="submit">
  <template v-slot:content v-if="isShow">
    <div style="overflow: auto;" :style="{height: '400px'}">
      <div class="form-wrap-box">
        <div class="li">
          <span class="label">亲密好友</span>
          <div class="flex">
            <div class="flex" style="flex: 1; flex-wrap: wrap;">
              <div class="relative p5 align_center" style="width: 70px; height: 80px" v-for="(item, index) in userList" :key="index">
                <v-deleteicon :dataList="userList" field="id" :data="{id: item.id}" />
                <div>
                <img :src="item.photo" onerror="this.src='/images/head_normal_100.png'" style="width: 50px; height: 50px; border-radius: 50%;">
                </div>
                <div class="font12 nowrap">{{`${item.name}`}}</div>
              </div>
              
            </div>
            <div style="width: 80px">
              <ChooseUser ref="chooseuser" :userList="userList" @choose="choose" />
            </div>
          </div>
          <div @click="handleClear">全部清除</div>
        </div>
        <div class="li">
          <span class="label">名称</span>
          <input v-model="detail.name" type="text" placeholder="记忆名称" class="input-sm input-full" />
        </div>
        <div class="li">
          <span class="label">记忆描述</span>
          <textarea placeholder="请输入记忆内容" v-model="detail.content" class="w-full"></textarea>
        </div>
        <!-- <div class="li">
          <span class="label">时间</span>
            <input v-model="detail.times" type="text" placeholder="时间" class="input-sm input-100" />
            <v-timepicker :data="detail" attr="date" />
        </div> -->
        <div class="li">
          <span class="label">图片</span>
          <v-upload ref="upload" :data="{id: detail.id}" :dataList="detail.image || []" uploadtype="friend" @imgList="image" :style="'width: 135px'" />
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
import ChooseUser from './chooseUser.vue'
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
const dataList: any = ref([])
const detail: any = ref({})
let current: any = ref({})
const img = ref("")
const userList: any = ref([])
const chooseuser: any = ref(null)

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    detail.value = await dialog.value.init()
    if(props.action === 'edit') {
      userList.value = props.data.user || []
    }
  }
})

// 设置图片
function image(a: any) {
  img.value = a
}

function handleclick(param: any) {
  isShow.value = !isShow.value
}


function choose(param: any){
  let index = userList.value.findIndex((item: any) => item.id === param.id)
  if(index === -1){
    userList.value.push(param)
  }else{
    userList.value.splice(index, 1)
  }  

  chooseuser.value.setStatus()
}

function handleClear(){
  userList.value = []
}

// 确认按钮
function submit(params: any) {
  const {
    id,
    name,
    content
  } = detail.value

  let fids = []
  for(let i = 0; i < userList.value.length; i++){
    fids.push(userList.value[i].id)
  }
  
  const param: any = {
    name,
    content,
    fid: fids.length > 0 ? `|${fids.join("|")}|` : "",
    img: img.value,
    coding: props.data.coding
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

function clickRemove(index: any) {
  dataList.value.splice(index, 1)
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

.form-wrap-box {
  overflow: hidden;

  ul {
    padding: 0;

    li {
      box-sizing: initial;

      :hover {
        background: none !important;
      }
    }
  }
}
</style>
