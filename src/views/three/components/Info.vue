<template>
  <div class="console-wrap">
    <div class="module-wrap nobg">
      <div class="module-head bd-0 p0"> 坐标信息 </div>
      <div class="module-content">
        <span @click="handleSave">保存</span>
        <div class="flex mb5">
          <div style="width: 60">坐标：</div>
          <div class="flex" style="flex: 1">
            <div style="flex: 1">
              <input v-model="geometry.position.x" class="input-full" />
            </div>
            <div style="flex: 1">
              <input v-model="geometry.position.y" class="input-full" />
            </div>
            <div style="flex: 1">
              <input v-model="geometry.position.z" class="input-full" />
            </div>
          </div>
        </div>
        
        <!-- 宽高 -->
        <div class="flex mb5">
          <div style="width: 60">宽高：</div>
          <div class="flex" style="flex: 1">
            <div style="flex: 1">
              <input v-model="geometry.parameters.width" class="input-full" />
            </div>
            <div style="flex: 1">
              <input v-model="geometry.parameters.height" class="input-full" />
            </div>
          </div>
        </div>

        <!-- 旋转 -->
        <div class="flex mb5">
          <div style="width: 60">旋转：</div>
          <div class="flex" style="flex: 1">
            <div style="flex: 1">
              <input v-model="geometry.rotation.z" class="input-full" />
            </div>
          </div>
        </div>        

        <!-- 颜色 -->
        <div class="flex mb5">
          <div style="width: 60">颜色：</div>
          <div class="flex" style="flex: 1">
            <div style="flex: 1">
              <input v-model="geometry.material.color" class="input-full" />
            </div>
          </div>
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
  codings
} from '@/utils'
import AddCar from './addCar.vue'
import { closeUpAnimate } from '../utils/car'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const coding = codings.three.scene_item
const store = useStore()
const geometry = computed(() => store.getters['three/geometryInfo']);
const geometryList = computed(() => store.getters['three/geometryList']);

// 监听弹窗变量
watch(geometry, (newValues, prevValues) => {
  store.commit('three/setGeometry', geometry.value)
  
}, {
  deep: true
})

function handleSave(){
  let mewGeometryList = []
console.log("aaa");
  mewGeometryList = geometryList.value.filter((item: any) => props.data.scene.children.filter((data: any) => item.uuid === data.uuid))
debugger


  // props.data.forEach((item: any) => {
  //   if(geometryList.value.indexOf(item.uuid)){
      
  //   }
  // })
  
  store.dispatch('common/Fetch', {
    api: 'saveThreeItem',
    data: {
      coding,
      body: JSON.stringify(geometryList.value)
    }
  }).then(res => {
    
  })
}

// function handleBlur(param: any){
//   debugger
//   geometry1.value.position[param] = geometry.value[param]
// }

</script>

<style lang="less" scoped>
.console-wrap{
  background: rgba(0, 0, 0, 0.45);
  position: fixed;
  right: 0;
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