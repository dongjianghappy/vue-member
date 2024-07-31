<template>
<div class="container w1100 mb25" style="min-height: 600px">
  <div class="module-wrap">
    <div class="module-head">
      <span class="bold">音效素材</span>
    </div>
    <div class="module-content plr15">
      <div style="overflow: auto;">
        <ul>
          <li class="col-md-4 music-list" v-for="(item, index) in dataList" :key="index">
            <Audio :dataList="dataList" :data="item" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  useStore,
  ref,
  codings,
} from '@/utils'
import Audio from './components/audio.vue'

const coding: any = codings.sound
const store = useStore();
const dataList: any = ref([])

function init() {
  store.dispatch('common/Fetch', {
    api: "ArticleList",
    data: {
      coding: coding.art,
      page: 1,
      pagesize: 20
    }
  }).then(res => {
    dataList.value = res.result.list
  })
}

onMounted(() => {
  init()
})
</script>
