<template>
<div class="theme-cate">
  <span v-for="(item, index) in themeList" :key="index" @click="handleClick(item, index)">{{item.name}}</span>
</div>
<div class="theme-wrap">
  <div class="theme-list left" v-for="(item, index) in currentCate" :key="index">
    <div class="relative" style="width: 100%; height: 80px" :style="`background: ${item.background_color}`" @click="chooseTheme('theme', item)">
      <img :src="item.image" style="width: 100%; height: 80px" v-if="item.image">
      <i class="iconfont icon-checkbox checkbox" v-if="currentData.theme.indexOf(item.id) > -1"></i>
    </div>
    <div class="theme-name ptb10 font12">{{item.name}}
      <Custom :data="{id: item.id, coding: coding}" action="edit" :render="init" v-if="module.custom_theme && item.custom === '1'" />
    </div>
  </div>
  <div class="theme-list left" v-if="module.custom_theme && themeList.length-1 === currentIndex">
    <Custom :data="{coding: coding}" :render="init" />
  </div>
</div>
<div class="pt50 cl-666 align_center" v-if="currentCate.length === 0">暂无主题</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  onMounted,
  computed,
  useStore,
  codings
} from '@/utils'
import Custom from '../components/custom.vue'

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
const module = computed(() => store.getters['user/config_talk'].talk_send_tool || []);
const coding = codings.user.theme
const currentIndex = ref(0)
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
    currentCate.value = res.result.length > 0 ? (res.result[0].list ? res.result[0].list : []) : []
  })
}

function handleClick(param: any, index: any) {
  currentCate.value = param.list || []
  currentIndex.value = index
}
onMounted(init)
</script>
