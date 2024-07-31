<template>
<div class="container w1100 clearfix">
  <div class="w180 left">
    <v-aside :data="module.ranking" title="排行榜" :isRoot="false" :render="init">
      <template v-slot:aside>
      </template>
    </v-aside>
  </div>
  <div class="m0 right" style="width: 910px">
    <Index :dataList="dataList" :mod="route.query.mod" :module="module.ranking" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
  useStore,
  useRoute
} from '@/utils'
import Index from './components/index.vue'

const store = useStore();
const route = useRoute();
const dataList: any = ref([])
const module: any = computed(() => {
  let site = store.getters['user/config_talk']
  site.ranking && site.ranking.map((item: any) => {
    item.path = `/ranking?mod=${item.value}`
  })
  return site
})

function init() {
  store.dispatch('common/Fetch', {
    api: 'ranking',
    data: {
      type: route.query.mod
    }
  }).then(res => {
    dataList.value = res.result
  })
}

onMounted(init)
</script>
