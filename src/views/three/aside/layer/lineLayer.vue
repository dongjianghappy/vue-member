<template>
  <div style="overflow: hidden">
    <div class="flex plr5" :class="{'current-layer': current.id === item.id}" v-for="(item, index) in dataList" :key="index">
      <div @click="hanleRoadLine(item)" style="flex: 1">
        {{item.name}}
      </div>
      <div class="align_center" style="width: 40px">
        <i class="iconfont icon-recycle m0" title="删除" @click="handleDelete(item)" />
      </div>
    </div>
  </div>
  <div>
    <Copy :data="{current: {copyType: 'roadLine'}}" @copy="handleCopy" />
    <span @click="handleaddRoadLine">添加</span>
    <span class="ml25" @click="handleSave">保存</span>
  </div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineProps,
  ref,
  computed,
  useStore,
  onMounted,
  codings
} from '@/utils'
import Copy from './copy.vue'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const {
  proxy
}: any = getCurrentInstance();

const store = useStore()
const dataList = computed(() => store.getters['three/trackLine']);
const coding = codings.three.road_line
// const dataList: any = ref([])
const current: any = ref({})

// function init(param: any = {}) {
//   store.dispatch('common/Fetch', {
//     data: {
//       coding,
//     }
//   }).then((res) => {
//     dataList.value = res.result || []
//   })
// }

// 选择路线
function hanleRoadLine(param: any) {
  props.data.scene.children = props.data.scene.children.filter((item: any) => !(item.userData && item.userData.isRoad))
  current.value = param
  store.commit('three/setRoadLine', param)
  store.commit('three/setSceneRoadLine', param)
  store.commit('three/setCurrentEdit', "roadLine")
}

function handleCopy(){
  let date = new Date()
  let newLine = JSON.parse(JSON.stringify(current.value))
  newLine.id = date.getTime()
  newLine.name = "副本-"+newLine.name
  dataList.value.push(newLine)
}

// 添加路线
function handleaddRoadLine(){
  dataList.value.push({
    name: '路线'+(dataList.value.length+1),
    description: '',
    points: [],
    status: '1'
  })
}

// 删除路线
function handleDelete(param: any, index: any){
  dataList.value.splice(index, 1)
  store.commit('three/setRoadLine', {
    name: '',
    type: '',
    description: '',
    points: [],
    status: '1'
  })
  props.data.scene.children = props.data.scene.children.filter((item: any) => item.userData.id !== 'line_'+param.id)
}

// 保存路线
function handleSave(){
store.dispatch('common/Fetch', {
    api: 'saveRoadLine',
    data: {
      body: JSON.stringify(dataList.value)
    }
  }).then(res => {
      proxy.$hlj.message({
        type: 'info',
        msg: "保存成功"
      })
      // init()
  })
}

</script>