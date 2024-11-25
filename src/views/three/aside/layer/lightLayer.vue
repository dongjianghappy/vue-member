<template>
  <div class="p5" style=" height: 150px; overflow-y: auto">
    <div class="flex plr5" :class="{'current-layer': current.uuid === item.uuid}" v-for="(item, index) in dataList" :key="index">
      <div @click="hanleClick(item)" style="flex: 1">
        <!-- <span class="cl-666">[{{threeItem[item.geometry.type]}}]</span> -->
        {{ item.name }}
      </div>
      <div class="align_right" style="width: 80px">
        <span>
          <!-- <i class="iconfont icon-link m0 mr5" title="链接" @click="handleIsHide(item)" /> -->
          <i class="iconfont icon-view m0 mr5" title="显示和隐藏" @click="handleIsHide(item)" />
          <i class="iconfont icon-recycle m0" title="删除" @click="handleDelete(item)" />
        </span>
      </div>
    </div>
  </div>
  <div>
    <Copy :data="{...data, current}" />
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  computed,
  useStore
} from '@/utils'

import { threeItem } from '@/assets/const'
import Copy from './copy.vue'
import { three3DType } from '@/assets/threeConst'

console.log(three3DType);

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const store = useStore()
const current: any = ref({})
console.log(three3DType);
const dataList: any = computed(() => store.getters['three/sceneLayer'].filter((item: any) => three3DType.light.indexOf(item.userData.type) > -1 ));
console.log(three3DType);
debugger

// 选择
function hanleClick(param: any) {
  debugger
  current.value = param
  store.commit('three/setGeometryInfo', param)
  store.commit('three/setCurrentEdit', "light")
}

function handleIsHide(param: any){
  param.visible = !param.visible
}

// 删除
function handleDelete(param: any){
  const dataList: any = computed(() => store.getters['three/sceneLayer']);
  props.data.scene.children = props.data.scene.children.filter((item: any) => item.uuid !== param.uuid)
  store.commit('three/setLayer')
}


</script>