<template>
  <ul class="three-list">
    <li class="flex mb10">
      <span class="label">音频</span>
      <div style="display: flex">
        <div style="flex: 1;">文件名: 
          <!-- <span class="ml10" >
            <i class="iconfont" :class="`icon-${1 ? 'stop' : 'play1'}`" />
          </span> -->
        </div>
        <div class="cl-red pointer" style=" width: 60px; text-align: right" >重新上传</div>
      </div>
    </li>
    <li class="flex mb10">
      <span class="label">播报</span>
        <input type="checkbox" :value="geometry.voice.broadcast" :checked="geometry.voice.broadcast == '1' ? true: false" @change="handleChange($event, geometry)" />
    </li>
    <li class="flex mb10">
      <span class="label">话术</span>
      <textarea v-model="geometry.voice.speech" placeholder="请输入话术" class="w-full"></textarea>
    </li>
  </ul>
</template>

<script setup lang="ts">
import {
  computed,
  useStore,
} from '@/utils'

const store = useStore()
const geometry = computed(() => store.getters['three/geometryInfo']);

function handleChange(e: any, param: any){
  param.broadcast = e.currentTarget.checked ? '1' : '0'
}
</script>