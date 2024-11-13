<template>
<v-button v-model:show="isShow">
  选择车辆
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="选择车辆" :action="action" :style="{width: 550, height: 350}" width="520px" height="450px" :data="data" @submit="submit">
  <template v-slot:content>
    <div class="car-wrap flex">
      <div class="car-img">
        <div class="prev deg180"><i class="iconfont icon-arrow" :class="{'gay': currentIndex === 0}" @click="handleToggle(-1)" /></div>
        <div class="img-box">
          <Modle :data="currentModel" />
        </div>
        <div class="next"><i class="iconfont icon-arrow" :class="{'gay': currentIndex === dataList.length-1}" @click="handleToggle(1)" /></div>
      </div>
      <div class="car-info">
        <div class="mb25">名称: {{currentModel.name}}</div>
        <div class="mb25">
          <span>颜色: </span>
          <v-colorpicker @color="chooseColor" :color="currentModel.color" /></div>
        <div class="mb25">
          <span>路线: </span> 
          <v-popover :content="currentRoad.name || roadLine[0].name" arrow="bt" offset="right" :move="-60" keys="popover-setting">
            <div style="width: 150px; height: 100px">
              <ul class="font14" style="display: block">
                <li @click="handleChoose(item)" v-for="(item, index) in roadLine" :key="index">{{item.name}}</li>
              </ul>
            </div>
          </v-popover>
        </div>
        <div class="mb25">
          <span>方向: </span>
          <v-popover :content="currentDirection.name" arrow="bt" offset="right" :move="-60" keys="popover-setting">
            <div style="width: 150px; height: 100px">
              <ul class="font14" style="display: block">
                <li @click="handleDirection(item)" v-for="(item, index) in direction" :key="index">{{item.name}}</li>
              </ul>
            </div>
          </v-popover>
          </div>
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
  codings,
  computed
} from '@/utils'

import Modle from './model.vue'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const coding = codings.three.model
const store = useStore();
const dialog: any = ref(null)
const isShow = ref(false)
const dataList: any = ref([])
const currentIndex: any = ref(0)
const currentModel = computed(() => {
  return dataList.value[currentIndex.value] || {}
})


const roadLine = computed(() => store.getters['three/config'].home.roadLine || []);
const currentRoad: any = ref({})

const currentDirection: any = ref({name: '顺时针', id: '1'})
const direction: any = ref([
  {name: '顺时针', id: '1'},
  {name: '逆时针', id: '2'}
])

const detail: any = ref({
  car_color: '#ff0000'
})

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    currentRoad.value = {}
    init()
  }
})

// 切换模型
function handleToggle(param: any){
  debugger
  if((param == -1 && currentIndex.value == 0) || (param == 1 && currentIndex.value == dataList.value.length - 1) ){
    return
  }else{
    if(param == -1){
      currentIndex.value--
    }else{
      currentIndex.value++
    }
  }

}

function handleChoose(param: any){
  currentRoad.value = param
}

function handleDirection(param: any){
  currentDirection.value = param
}


function chooseColor(param: any) {
  currentModel.value.color = param.value
}

function init() {
  store.dispatch('common/Fetch', {
    data: {
      coding,
    }
  }).then((res: any) => {
    dataList.value = res.result
  })
}

function submit(params: any) {
  const {
    car_color,
  } = detail.value
  debugger
  props.data.ThreeFn.car({
    ...props.data,
    config: {
      car_color,
      road_line: Object.keys(currentRoad.value).length !== 0 ? currentRoad.value : roadLine.value[0],
      direction: currentDirection.value.id
    }
  })
  isShow.value = false
}
</script>

<style lang="less" scoped>
.car-wrap{
  padding: 10px;
  .car-img{
    display: flex;
    margin-right: 25px;
    width: 50%;
    .prev, .next{
      padding-top: 83px;
      width: 25px;
      i{
        font-size: 24px !important;
        cursor: pointer;
        &.gay{
          color: #333 !important;
        }
      }
    }
    .img-box{
      text-align: center;
      flex: 1;
    }
  }
  .car-info{
    flex: 1
  }
}
</style>