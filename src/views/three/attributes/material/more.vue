<template>
<v-button v-model:show="isShow">
  多面设置
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="多面设置" :action="action" :style="{width: 650, height: 400}" :hasfooter="false">
  <template v-slot:content>
    <div class="10">
      是否多面设置{{data.isMorePlane}}
      <i class="iconfont icon-img" :class="{'cl-green': data.isMorePlane === '1'}" @click="handleClick(data)" />
      <span>
        <i class="iconfont icon-add" @click="handleAdd" />
      </span>
    </div>
    <ul class="three-list">
      {{data.map}}
      <li class="flex mb10" v-for="(item, index) in data.map" :key="index">
        <span class="label">正面</span>
        <div class="flex" style=" flex: 1;">
          <div style=" flex: 1;"><input type="text" v-model="item.image" class="input-sm input-full" /></div>
          <div class="mlr5" style="width: 80px"><input type="text" v-model="item.color" class="input-sm input-full" /></div>
          <div style="width: 100px"><input type="text" v-model="item.side" class="input-sm input-full" /></div>
          <div style="width: 15">
            {{item.isUse}}
            <i class="iconfont icon-article mr10" @click="handleUse(item, index)" />
            <i class="iconfont icon-img" @click="handleDelete(index)" />
            </div>
        </div>
      </li>
    </ul>
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


const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return []
    }
  }
})

const store = useStore();
const isShow = ref(false)

const planes: any = ref([
  {image: '', color: '#ddd', side: '123'},
  {image: '', color: '#ddd', side: '123'},
  {image: '', color: '#ddd', side: '123'},
  {image: '', color: '#ddd', side: '123'},
  {image: '', color: '#ddd', side: '123'},
  {image: '', color: '#ddd', side: '123'}
])

function handleClick(param: any) {
  props.data.isMorePlane = props.data.isMorePlane === '1' ? '0' : '1'
}

function handleAdd(){
  props.data.map.push({image: '', color: '#ddd', side: '123'})
}

// 使用
function handleUse(param: any, index: any){
  param.isUse = param.isUse == 1 ? 0 : 1
}

function handleDelete(index: any){
  props.data.map.splice(index, 1)
}
</script>