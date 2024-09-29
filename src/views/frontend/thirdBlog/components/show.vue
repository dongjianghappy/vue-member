<template>
<div class="relative" style="height: -webkit-fill-available;">
<div class="p25" style="background: var(--card-background); position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0; border-radius: 8px; overflow: hidden;">
    <div class="p25 font24 align_center">
      <span class="left">
        <v-back />
      </span>
      【{{detail.title}}】十年之约
    </div>
    <div class="flex p25">
      <div class="radius-4 p25" style="background: var(--card-background); width: 40%; height: 450px">
        <div class="p35 align_center">
          <v-photos :sourceData="detail" :style="{radius: '50%', width: 150, height: 150}" />
        </div>
        <div class="p15 align_center">{{detail.nickname}}</div>
      </div>
      <div class="p25" style="flex: 1">
        <div>2025年05月27日 加入十年之约</div>
        <div class="mt25" @click="visit(detail)">查看Ta的博客</div>
      </div>
    </div>
    
</div>

</div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  onMounted,
  useStore,
  ref,
  codings,
  useRoute
} from '@/utils'

const store = useStore()
const route = useRoute()
const coding: any = codings.module.thirdBlog
const detail: any = ref({})

function init() {
  store.dispatch('common/Fetch', {
    api: 'thirdBlogDetail',
    data: {
      id: route.query.id
    }
  }).then(res => {
    detail.value = res.result
  })
}

  function visit(param: any) {

    store.dispatch('common/Fetch', {
      api: "VisitCommunity",
      data: {
        coding: coding.art,
        id: route.query.id
      }
    }).then(res => {
      window.open(param.url)

    })
  }

onMounted(() => {
  init()
})
</script>
