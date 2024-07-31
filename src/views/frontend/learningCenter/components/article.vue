<template>
<div class="module-wrap">
  <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 560px">
    <div class="mb15 font18 bold align_center">
      <span class="font16 left" @click="handleBack">
        <i class="iconfont icon-back" />
      </span>
      {{detail.title}}</div>

    <v-tabs :tabs="[{name: '演示'}, {name: '代码'}]" :isEmit="true" v-model:index="index">
      <template v-slot:content1>
        <div style=" text-indent: 30px; line-height: 25px;" v-html="detail.content"></div>
      </template>
      <template v-slot:content2>
        <textarea placeholder="请输入内容" class="w-full h350" v-model="detail.content"></textarea>
      </template>
    </v-tabs>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  useStore,
  useRouter,
  useRoute,
  codings
} from '@/utils'

const store = useStore();
const router = useRouter()
const route = useRoute()
const coding: any = codings.code
const detail: any = ref([])

function init() {
  store.dispatch('common/Fetch', {
    api: "detail",
    data: {
      coding: coding.art,
      id: route.query.item
    }
  }).then(res => {
    detail.value = res.result
  })
}

function handleBack() {
  router.push('/learning')
}

onMounted(init)
</script>
