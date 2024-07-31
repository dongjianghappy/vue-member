<template>
<div class="module-wrap">
  <div class="module-head p20">我的心情</div>
  <div class="module-content content-wrap ptb15 pr10" style="min-height: 560px">
    <div class="notes-list relative" v-for="(item, index) in dataList" :key="index">
      <div class="notes-content plr5 ptb10" style="background: none; margin-bottom: 0px; border: 0px solid #f3f3f3">
        <div class="pb5 font12">{{item.times}}</div>
        【{{item.name}}】
        {{item.description}}
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  useStore
} from '@/utils'

const store = useStore();
const dataList: any = ref([])

function init() {
  store.dispatch('common/Fetch', {
    api: "moodList"
  }).then(res => {
    dataList.value = res.result
  })
}

onMounted(init)
</script>
