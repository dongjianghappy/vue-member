<template>
  <v-collapse title="图层管理" :iscollapse="true" >
    <v-tabs :tabs="[{name: '图层',value: 'photos'}, {name: '路线',value: 'background'}, {name: '光源',value: 'background'}]">
      <template v-slot:content1>
        <ItemLayer :data="data" />
      </template>
      <template v-slot:content2>
        <LineLayer :data="data" />
      </template>
      <template v-slot:content3>
        <LightLayer :data="data" />
      </template>
    </v-tabs>
  </v-collapse>
</template>

<script setup lang="ts">
import {
  defineProps
} from '@/utils'
import ItemLayer from './itemLayer.vue'
import LineLayer from './lineLayer.vue'
import LightLayer from './lightLayer.vue'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

</script>