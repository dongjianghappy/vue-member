<template>
<div class="container flex w1100" style="background: var(--module-background);">
  <div class="w220 p15" style="background: var(--card-background);">
    <div class="mb25 font32">{{detail.title}}</div>
    <div class="mb25 font12 cl-999">
      <span class="mr25">标签：{{detail.tag}}</span>
    </div>
    <div class="mb25">播报：<v-broadcast :content="detail.content" /></div>
  </div>
  <div style="flex: 1; min-height: 650px; background: var(--module-background)">
    <Article :data="detail" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  computed,
  useStore,
  useRouter,
  useRoute,
  onMounted,
  ref,
  codings
} from '@/utils'
import Article from './article.vue'

const coding: any = codings.common_sense.art
const router = useRouter();
const route = useRoute();
const store = useStore();
const detail: any = ref({})

document.documentElement.scrollTop = 0

function init() {
  store.dispatch('common/Fetch', {
    api: 'detail',
    data: {
      id: route.query.id,
      coding,
    }
  }).then(res => {
    detail.value = res.result
  })
}

onMounted(() => {
  init()
})
</script>
