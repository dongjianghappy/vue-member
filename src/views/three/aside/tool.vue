<template>
  <v-collapse title="工具" :iscollapse="true" >
    <div style="height: 150px; overflow-y: auto">
      <div class="col-md-4 p10" v-for="(item, index) in dataList" :key="index">
        <div class="bg-666 radius-4 align_center" style="height: 40px; line-height: 40px;" :title="item.name" @click.stop="handleTool(item)" >
          <i class="iconfont icon-img" />
        </div>
      </div>
    </div>
  </v-collapse>
</template>

<script setup lang="ts">
import {
  defineProps,
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
const coding = codings.three.tool
const dataList: any = ref([])
const toolList: any = ref([{
  value: 'text',
  name: '文本'
}])

function handleTool(param: any){
  document.body.style.cursor = param.cursor_type
  store.commit('three/setCurrentTool', param)
}

function handleDragEnd(e: any, item: any) {
  const { THREE, scene, camera, renderer, DragControls } = props.data
  
  ThreeFn[item.value]({
    position: {
      x: 0,
      z: 0
    },
    widthSegments: 3,
    number: 1,
    width: 50,
    height: 50,
    data: item,
    ...props.data,
  })
}

function init(param: any = {}) {
  store.dispatch('common/Fetch', {
    data: {
      coding
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