<template>
  <v-collapse title="几何元素" :iscollapse="true" >
    <v-tabs :tabs="[{name: '元素',value: 'photos'},{name: '几何',value: 'background'},{name: '工具',value: 'tool'}]">
      <template v-slot:content1>
        <div style="height: 150px; overflow-y: auto">
          <div v-for="(item, index) in dataList.filter((item) => item.type === '0')" :key="index">
            <div class="plr10">{{item.name}}</div>
            <div style="overflow: auto;">
            <div class="col-md-4 p10" v-for="(list, index) in item.list" :key="index">
              <div class="bg-666 radius-4 align_center" style="height: 40px; line-height: 40px;" :title="list.name" draggable="true" @dragend="handleDragEnd($event, list)" >
                <i class="iconfont icon-img" />
              </div>
            </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:content2>
      <div style="height: 150px; overflow-y: auto">
          <div v-for="(item, index) in dataList.filter((item) => item.type === '1')" :key="index">
            <div class="plr10">{{item.name}}</div>
            <div style="overflow: auto;">
            <div class="col-md-4 p10" v-for="(list, index) in item.list" :key="index">
              <div class="bg-666 radius-4 align_center" style="height: 40px; line-height: 40px;" :title="list.name" draggable="true" @dragend="handleDragEnd($event, list)" >
                <i class="iconfont icon-img" />
              </div>
            </div>
            </div>
          </div>
      </div>
      </template>
      <template v-slot:content3>
        <div style="height: 150px; overflow-y: auto">
          <div class="col-md-4 p10" v-for="(item, index) in toolList" :key="index">
            <div class="bg-666 radius-4 align_center" style="height: 40px; line-height: 40px;" :title="item.name" @click.stop="handleTool(item.value)" >
              <i class="iconfont icon-img" />
            </div>
          </div>
        </div>
      </template>
    </v-tabs>
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
const coding = codings.three.item
const dataList: any = ref([])
const toolList: any = ref([{
  value: 'text',
  name: '文本'
}])

function handleTool(param: any){
  document.body.style.cursor = param
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
    api: 'getBasicItem'
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