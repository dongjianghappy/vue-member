<template>
<div class="module-wrap mb15">
  <div class="module-content form-wrap-box detail" style="padding: 25px 50px !important; min-height: 500px;">
    <div class="align_center">
      <div class="mb10 font24">
        <span class="pointer font14 align_left" @click="handlePrev">返回</span>
        {{detail.title}}</div>
      <div> {{detail.times}}</div>
    </div>
    <div>{{detail.content}}</div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  useStore,
  useRoute,
  useRouter
} from '@/utils'

const store = useStore();
const router = useRouter();
const route = useRoute();
const detail: any = ref({})

// 初始化数据
function init() {
  store.dispatch('common/Fetch', {
    api: "messageDetail",
    data: {
      id: route.query.id
    }
  }).then(res => {
    detail.value = res.result
  })
}

function handlePrev() {
  router.go(-1)
}

onMounted(() => {
  init()
})
</script>
