<template>
<v-button v-model:show="isShow">
  设置文本
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="设置文本" :action="action" :style="{width: 350, height: 300}" width="520px" height="450px" :data="data" @submit="submit">
  <template v-slot:content>
    <ul class="three-list">
      <li class="flex mb10">
        <span class="label">文本</span>
        <input type="text" v-model="data.content" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">颜色</span>
        <input type="text" v-model="data.color" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">大小</span>
        <input type="text" v-model="data.size" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">坐标</span>
        <div class="flex">
          <div class="mr10" style="flex: 1"><input type="text" v-model="data.position.x" class="input-sm input-full" /></div>
          <div class="mr10" style="flex: 1"><input type="text" v-model="data.position.y" class="input-sm input-full" /></div>
          <div style="flex: 1"><input type="text" v-model="data.position.z" class="input-sm input-full" /></div>
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
      return {
        content: '',
        color: '',
        size: '',
        position: {
          x: 0,
          y: 0,
          z: 0
        }
      }
    }
  }
})

const store = useStore();
const isShow = ref(false)
</script>