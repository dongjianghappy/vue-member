<template>
<div class="theme-wrap pt15">
  <div class="theme-list left align_center" v-for="(item, index) in themeList" :key="index" @click="chooseTheme('mouse_effects', item)">
    <div class="relative p15" style="height: 50px">
      <img :src="item.file">
      <i class="iconfont icon-checkbox checkbox" v-if="item.id === currentData.mouse_effects || item.file === currentData.mouse_effects"></i>
    </div>
    <div class="theme-name ptb10 font12">{{item.name}}</div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  onMounted,
  useStore
} from '@/utils'

const props: any = defineProps({
  currentData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  chooseTheme: {
    type: Function,
    default: () => {
      return
    }
  }
})
const store = useStore();
const currentCate = ref([])
const themeList: any = ref([])

function init() {
  store.dispatch('common/Fetch', {
    api: 'mouseEffects',
  }).then(res => {
    themeList.value = res.result
  })
}

function handleClick(param: any, index: any) {
  currentCate.value = param.list || []
}

onMounted(() => {
  init()
})
</script>
