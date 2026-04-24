<template>
<ul class="edit-list" style="height:480px; overflow-y: auto;">
  <li class="mb15">
    <div class="mb5">名称</div>
    <input type="text" v-model="data.name" class="input-sm input-full">
  </li>
  <li>
    <div class="mb5">状态</div>
    <div style="width: 120px;">
      <v-radio label="是" name="status" value="1" v-model:checked="data.status" />
      <v-radio label="否" name="status" value="0" v-model:checked="data.status" />
    </div>
  </li>
  <li class="mb15">
    <div class="mb5 relative">
      描述
      <input type="checkbox" v-model="data.des_display" :checked="data.des_display" class="absolute" style="top: 7px; right: 0;" />  
    </div>
    <textarea v-model="data.content" placeholder="请输入描述" class="w-full"></textarea>
  </li>
  <!-- <li class="mb15">
    <div class="mb5">链接地址</div>
    <v-radiobutton name="type" v-model:checked="data.url_type" :enums="[{label: '路由', value: '0'}, {label: '链接', value: '1'}]" />
    <textarea v-model="data.url" placeholder="请输入链接" class="mt10 w-full"></textarea>
  </li> -->
  <li class="mb15" v-if="action === 'edit'">
    <span @click="hanleClick">选中图片</span>
    <div class="p15">
      <div class="col-md-4" :class="className" v-for="(item, i) in data.img" :key="i">
        <div class="m5 relative">
          <img :src="item" height="140" style="border-radius: 8px; width: 100%" @click="handleChoose(item)" />
        </div>
      </div>
    </div>
  </li>
</ul>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits
} from 'vue'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  action: {
    type: String,
    default: "add"
  },
})
const emit: any = defineEmits(['imagesTU'])
function hanleClick(){
  emit('imagesTU', "111")
}
function handleChoose(param: any) {
  let index = props.data.img.indexOf(param)
    props.data.img.splice(index, 1)
}
</script>
