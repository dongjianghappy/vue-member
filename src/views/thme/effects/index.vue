<template>
<div class="theme-cate">
  <span v-for="(item, index) in themeList" :key="index" @click="handleClick(item, index)">{{item.name}}</span>
</div>
<div class="theme-wrap">
  <div class="theme-list left" v-for="(item, index) in currentCate" :key="index" @click="chooseTheme('effects', item)">
    <div class="relative p10">
      <img :src="item.image" style="height: 80px">
      <i class="iconfont icon-checkbox checkbox" v-if="currentData.effects.indexOf(item.id) > -1"></i>
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
  },
  type: {
    type: String,
    default: "theme"
  }
})
const store = useStore();
const currentCate = ref([])
const themeList: any = ref([])

function init() {
  store.dispatch('common/Fetch', {
    api: 'Theme',
    data: {
      type: props.type
    }
  }).then(res => {
    themeList.value = res.result
    currentCate.value = res.result.length > 0 ? res.result[0].list : []
  })
}

function handleClick(param: any, index: any) {
  currentCate.value = param.list || []
}
onMounted(init)
</script>
