<template>
<v-button v-model:show="isShow">
  选择车辆
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="选择车辆" :action="action" :style="{width: 550, height: 350}" width="520px" height="450px" :data="data" @submit="submit">
  <template v-slot:content>
    <div class="modle-wrap flex">
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
          <span class="pr15">{{currentModel.trackName}}</span>
          <SetTrack :data="currentModel" @Track="Track" />
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
  computed,
  inject
} from '@/utils'

import Modle from './model.vue'
import SetTrack from '../attributes/setTrack.vue'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const coding = codings.three
const store = useStore();
const parentsData: any = inject('parentsData')
const dialog: any = ref(null)
const isShow = ref(false)
const dataList: any = ref([])
const currentIndex: any = ref(0)
const currentModel = computed(() => {
  return dataList.value[currentIndex.value] || {}
})
const currentRoadLine = computed(() => {
  let line = store.getters['three/geometryInfo'].roadLine

  return JSON.parse(JSON.stringify(line))
});

const roadLine: any = ref([])

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

function Track(param: any){
  currentModel.value.road_line = param
  currentModel.value.trackName = param.name
  currentRoadLine.value.name = param.name
  currentRoadLine.value.points = param.points
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
      coding: coding.model,
    }
  }).then((res: any) => {
    dataList.value = res.result
  })

store.dispatch('common/Fetch', {
    data: {
      coding: coding.road_line,
    }
  }).then((res) => {
    roadLine.value = res.result || []
  })
}

function submit(params: any) {
  const { THREE, scene, ThreeFn } = parentsData

  const {
    car_color,
  } = detail.value
  props.data.ThreeFn.car({
    store,
    ...parentsData,
    roadLine: currentRoadLine.value,
    config: {
      car_color,
      road_line: currentModel.value.road_line,
      direction: currentDirection.value.id
    }
  })
  debugger
  isShow.value = false
}
</script>