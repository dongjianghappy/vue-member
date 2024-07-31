<template>
<div class="module-wrap">
  <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 650px">
    <v-tabs :tabs="[{name: '数据总览',value: 'total'},{name: '微博数据',value: 'talk'},{name: '频道数据',value: 'channel'},{name: '用户数据',value: 'visit'}]" :isEmit="true" v-model:index="index">
      <template v-slot:content1>
        <Index />
      </template>
      <template v-slot:content2>
        <Talk />
      </template>
      <template v-slot:content3>
        <Channel />
      </template>
      <template v-slot:content4>
        <User />
      </template>
    </v-tabs>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  ref,
  watch
} from '@/utils'
import Index from './components/index.vue'
import Channel from './channel/index.vue'
import Talk from './talk/index.vue'
import User from './user/index.vue'
import Detail from './components/detail.vue'

const isDetail = ref(false)
const index: any = ref(0)
const currentData = ref({})

// 监听
watch([index], async (newValues, prevValues) => {
  isDetail.value = false
})

function getDetail(param: any) {
  isDetail.value = true
  currentData.value = param
}
</script>
