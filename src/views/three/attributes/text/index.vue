<template>
  <v-collapse title="文本信息" :iscollapse="true" >
    <ul class="three-list">
      <li>
        <span class="label">内容</span>
        <input type="text" v-model="textInfo.name" class="input-sm input-full" />
      </li>
      <li>
        <span class="label">颜色</span>
        <input type="text" v-model="textInfo.color" class="input-sm input-full" />
      </li>
      <li>
        <span class="label">大小</span>
        <input type="text" v-model="textInfo.size" class="input-sm input-full" />
      </li>
    </ul>
  </v-collapse>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  useStore,
} from '@/utils'

const store = useStore()
const textInfo = computed(() => store.getters['three/textInfo']);

// 监听弹窗变量
watch(textInfo, (newValues, prevValues) => {
  store.commit('three/updateTextItem', textInfo.value)
}, {
  deep: true
})
</script>