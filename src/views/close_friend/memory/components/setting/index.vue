<template>
<div class="module-wrap nobg">
  <div class="module-content" style="min-height: 500px">
    <v-tabs :tabs="[{name: '基本信息',value: 'image'},{name: '节点信息',value: 'talk'}]" :className="{con: 'p0', box: 'p0'}" :isEmit="true" class="pl25" v-model:index="index">
      <template v-slot:content1>
        <Main :data="data" @imagesTU="imagesTU" :render="render" />
      </template>
      <template v-slot:content2>
        <Node :data="data" @action="actions" :render="render" />
      </template>
    </v-tabs>
    <div class="half-circle-left deg180" @click="expand" v-if="!isSeting"><i class="iconfont icon-shezhi" style="margin: 0 !important" /></div>
    <div class="half-circle" @click="expand" v-else><i class="iconfont icon-arrow" style="margin: 0 !important" /></div>
  </div>
</div>
<div v-if="bbbb.status">
  <NodeSetting :action="bbbb.action" :data="aaaa" level="2" :ccccc="bbbb" @imagesTU="imagesTU" :render="render" />
</div>
<div v-if="bbbb.imageKu">
  <Images :action="bbbb.action" :data="data" :currentData="aaaa.basic" level="2" :ccccc="bbbb" :render="render" />
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  computed,
  ref
} from '@/utils'

import Main from './components/detail.vue'
import Node from './components/detail2.vue'
import NodeSetting from './components/detail3.vue'
import Images from './components/images.vue'
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
const emit: any = defineEmits(['setting'])
const isSeting: any = ref(false)
const bbbb: any = ref({
  status: false,
  imageKu: false,
  action: 'add'
})
const aaaa: any = ref({})

function expand() {
  isSeting.value = !isSeting.value
  emit('setting')
}

function imagesTU(){
  bbbb.value.imageKu = true
}

function actions(type: any, param: any, parentData: any) {
  bbbb.value.status = true
  bbbb.value.action = type
  debugger
  aaaa.value = {
    root: parentData,
    basic: param
  }
}
</script>

<style lang="less">
.collapse {
  background: var(--card-background);

  .collapse-head {
    background: var(--card-background);
  }

  .collapse-list {
    background: var(--card-background);
  }
}
</style>