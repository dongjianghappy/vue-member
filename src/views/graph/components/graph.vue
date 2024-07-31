<template>
<v-button v-if="type !== 'text'" @click="handleclick">
  <i class="iconfont icon-chart" style="color: #f67f00;"></i>
</v-button>
<span v-else @click="handleclick" v-html="name" class="cursor"></span>
<v-dialog v-model:show="isShow" ref="form" :title="title || name" width="950px" :style="{width: 600, height: 600}" :hasfooter="false" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <slot name="content">
      <v-graph :data="data" :isShow="true" />
    </slot>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref
} from '@/utils'

const props: any = defineProps({
  title: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "button"
  },
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const isShow: any = ref(false)

function handleclick(param: any) {
  isShow.value = !isShow.value
}
</script>
