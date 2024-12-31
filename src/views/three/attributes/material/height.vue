<template>
<v-button v-model:show="isShow">
  高级设置
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="高级设置" :action="action" :style="{width: 650, height: 400}" :hasfooter="false">
  <template v-slot:content>
    <ul class="three-list">
      <li>
        <span class="label">发光色</span>
        <Color :data="data" attr="emissive" />
      </li>
      <li>
        <span class="label">强度</span>
        <input type="text" v-model="data.intensity" class="input-sm input-full" />
      </li>
      <li>
        <span class="label">反射</span>
        <Color :data="data" attr="sepcular" />
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

import Color from '../../components/color.vue'


const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
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