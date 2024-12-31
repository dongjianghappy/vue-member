<template>
  <v-collapse title="材质设置" :iscollapse="true" >
    <ul class="three-list">
      <Type :data="geometry.material" />
      <li>
        <span class="label">颜色</span>
        <Color :data="geometry.material" />
      </li>
      <li>
        <span class="label">图片</span>
        <input type="text" v-model="geometry.material.image" class="input-sm input-full" />
      </li>
      <li>
        <span class="label">渲染</span>
        <v-select :enums="[{name: '正面', value: 'FrontSide'}, {name: '背面', value: 'BackSide'}, {name: '双面', value: 'DoubleSide'}]" v-model:value="geometry.material.side" :defaultValue="geometry.material.side = geometry.material.side ? geometry.material.side : 'FrontSide'" />
      </li>
      <li>
        <span class="label">文本</span>
        <div style="flex: 1">
          <span class="mr15" :style="{color: geometry.material.text.color}" v-if="geometry.material.text.content">{{geometry.material.text.content}}</span>
          <setText :data="geometry.material.text" class="right" />
        </div>
      </li>
      <li v-if="geometry.type !== 'PlaneGeometry' && geometry.type !== 'SphereGeometry'">
        <span class="label"></span>
        <span class="mr25"><More :data="geometry.material" /></span>
        <span><Height :data="geometry.material" /></span>
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
import { closeUpAnimate } from '../../utils/car'
import Type from './type.vue'
import Color from '../../components/color.vue'
import More from './more.vue'
import Height from './height.vue'
import setText from '../setText.vue'

const store = useStore()
const geometry = computed(() => store.getters['three/geometryInfo']);

// 监听弹窗变量
watch(geometry, (newValues, prevValues) => {
  store.commit('three/setGeometry', geometry.value)
}, {
  deep: true
})
</script>