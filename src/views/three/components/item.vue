<template>
  <div class="console-wrap">
    <div class="module-wrap nobg">
      <div class="module-head bd-0 p0"> 物品列表 </div>
      <div class="module-content">
        <div class="col-md-3" v-for="(item, index) in dataList" :key="index">
          <div class="p10" draggable="true" @dragend="handleDragEnd($event, item)" @dragstart="handleDragStart($event, item)"> {{item.name}} </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  ref,
  computed,
  watch,
  useStore,
  onMounted,
  codings
} from '@/utils'
import ThreeFn from '../utils/index'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const store = useStore()
const coding = codings.three.item
const dataList: any = ref([])

function handleDragStart(e: any, item: any) {
  
}

function handleDragEnd(e: any, item: any) {
  const { THREE, scene, camera, renderer, DragControls } = props.data
debugger
  ThreeFn[item.value]({
    THREE,
    scene,
    camera,
    renderer,
    DragControls,
    store,
    ThreeFn,
    position: {
      x: 0,
      z: 0
    },
    widthSegments: 3,
    number: 1,
    width: 50,
    height: 50,
    data: item,
  })
}

// 获取用户
function init(param: any = {}) {
  store.dispatch('common/Fetch', {
    data: {
      coding,
    }
  }).then((res) => {
    dataList.value = res.result
  })
}

onMounted(() => {
  init()
})

</script>

<style lang="less" scoped>
.console-wrap{
  background: rgba(0, 0, 0, 0.45);
  position: fixed;
  left: 0;
  top: 25px;
  padding: 10px;
  width: 250px;
  height: 150px;
  color: #fff;
  z-index: 100;
  .car-list{
    display: flex;
    .cell{
      flex: 1;
      &.close-up{
        color: #f00;
      }
    }
  }
}
</style>