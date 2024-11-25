<template>
  <v-collapse title="坐标设置" :iscollapse="true" >
    <v-tabs :tabs="[{name: '坐标',value: 'photos'},{name: '旋转',value: 'background'},{name: '旋转动画',value: 'background'}]">
      <template v-slot:content1>
        <Position :data="data" />
      </template>
      <template v-slot:content2>
        <Rotation :data="data" />
      </template>
      <template v-slot:content3>
        <RotationAnimation :data="data" />
      </template>
    </v-tabs>
  </v-collapse>
</template>

<script setup lang="ts">
import {
  defineProps
} from '@/utils'
import Position from './components/position.vue'
import Rotation from './components/rotation.vue'
import RotationAnimation from './components/rotationAnimation.vue'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>