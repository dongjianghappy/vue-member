<template>
<ul class="edit-list">
  <li class="mb15">
    <div class="mb5">内容类型</div>
    <v-select :enums="trackmapType" v-model:value="data.type" :defaultValue="data.type = data.type ? data.type : '0'" />
  </li>
  <li class="mb15 flex">
    <div class="mr25" style="flex: 1">
      <div class="mb5">字体大小</div>
      <input type="text" v-model="data.font_size" class="input-sm input-full" @input="handleChange('font_size')">
    </div>
    <div style="flex: 1">
      <div class="mb5">字体颜色</div>
      <div class="flex">
        <input type="text" v-model="data.font_color" class="input-sm input-full">
        <div style="flex: 1">
          <v-colorpicker @color="chooseColor" :color="data.font_color" attr="font_color" />
        </div>
      </div>
    </div>
  </li>
  <li class="mb15 flex">
    <div class="mr25" style="flex: 1">
      <div class="mb5">主轴节点X间距</div>
      <input type="text" v-model="data.space_x" class="input-sm input-full" @input="handleChange('space_x')">
      <!-- <v-select :enums="spaceX" v-model:value="data.space_x" :defaultValue="data.space_x = data.space_x ? data.space_x : '200'" @onChange="handleChange('space_x')" /> -->
    </div>
    <div style="flex: 1">
      <div class="mb5">主轴节点y间距</div>
      <v-select :enums="spaceY" v-model:value="data.space_y" :defaultValue="data.space_y = data.space_y ? data.space_y : '150'" />
    </div>
  </li>
  <li class="mb15 flex">
        <div class="mr25" style="flex: 1">
      <div class="mb5">轨道图类型</div>
      <v-select :enums="displayType" v-model:value="data.display_type" :defaultValue="data.display_type = data.display_type ? data.display_type : '0'" />
    </div>
  </li>
  <li class="mb15 flex">
    <div class="mr25" style="flex: 1">
      <div class="mb5">主线粗细</div>
      <div class="flex">
        <input type="text" v-model="data.line_width" class="input-sm input-full" @input="handleChange('line_width')">
      </div>
    </div>
    <div style="flex: 1">
      <div class="mb5">主线条颜色</div>
      <div class="flex">
        <input type="text" v-model="data.line_color" class="input-sm input-full">
        <div style="flex: 1">
          <v-colorpicker @color="chooseColor" :color="data.line_color" attr="line_color" />
        </div>
      </div>
    </div>
  </li>
</ul>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  computed,
  ref,
  watch,
  useStore,
  useRouter,
  onMounted
} from '@/utils'

import { spaceX, spaceY } from '@/assets/const'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
    render: {
    type: Function,
    default: () => {
      return
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter();
const loginuser = computed(() => store.getters['user/loginuser']);
const module = computed(() => store.getters['user/config_talk'].more);

function handleChange(param: any){
  props.data.list.forEach((item: any, index: any) => {
    // 坐标处理    
    if(param === 'space_x' || param === 'space_y'){
      if(param === 'space_x'){
        item.config.x = props.data[param] * (index + 1)
      }else{
        item.config.y = props.data[param] * (index + 1) + 250
      }
    }else{
      item.config[param] = props.data[param]
    }
  });
  props.render()
}

function chooseColor(param: any) {
  props.data[param.attr] = param.value
  props.data.list.forEach((item: any) => {
    item.config[param.attr] = param.value
  });
  props.render()  
}

function handleClick(param: any) {

}
</script>
