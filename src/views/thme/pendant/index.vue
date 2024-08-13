<template>
<div class="theme-cate">
  <span v-for="(item, index) in themeList" :key="index" @click="handleClick(item, index)">{{item.name}}</span>
</div>
<div class="theme-wrap">
  <div class="theme-list left" v-for="(item, index) in currentCate" :key="index" @click="chooseTheme(item)">
    <div :id="`pendant_${index}`" style="cursor: move;" draggable="true" @dragstart="(e, fType, style)=>dragstart(e, `pendant_${index}`, item.style)">
      <img :src="item.image" :title="item.name" style="height: 80px">
      <i class="iconfont icon-checkbox checkbox" v-if="currentData.pendants.indexOf(item.image) > -1"></i>
    </div>
    <div class="theme-name ptb10 font12">
      {{item.name}}
      <Custom :data="{id: item.id, coding: coding}" action="edit" :render="init" v-if="module.custom_pendant && item.custom === '1'" />
    </div>
  </div>
  <div class="theme-list left" v-if="module.custom_pendant && themeList.length-1 === currentIndex">
      <Custom :data="{coding: coding}" :render="init" />
    </div>  
</div>
<div class="pt50 cl-666 align_center" v-if="currentCate.length === 0">暂无挂件</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  getCurrentInstance,
  ref,
  onMounted,
  computed,
  useStore,
  codings
} from '@/utils'

import Custom from '../components/custom_pendant.vue'

const props: any = defineProps({
  currentData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const emit: any = defineEmits(['onClick'])
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const module = computed(() => store.getters['user/config_talk'].talk_send_tool || []);
const coding = codings.user.pendant
const currentIndex: any = ref(0)
const currentCate = ref([])
const themeList: any = ref([])
const index: any = ref(0)

function init() {
  store.dispatch('common/Fetch', {
    api: 'Pendant'
  }).then(res => {
    themeList.value = res.result
    currentCate.value = res.result.length > 0 ? res.result[0].list : []
  })
}

function handleClick(param: any, index: any) {
  currentCate.value = param.list || []
  currentIndex.value = index
}

function chooseTheme(param: any) {
  emit('onClick', param)

}

function dragstart(e: any, fType: any, style: any) {
  e.dataTransfer.setData('ftype', fType)
  e.dataTransfer.setData('style', style)
}

onMounted(() => {
  init()
  let el: any = document.getElementById('main')
  el.addEventListener('dragover', (e: any) => {
    e.preventDefault()
  })
  el.addEventListener('drop', (e: any) => {
    let ftype: any = e.dataTransfer.getData('ftype')
    let style: any = e.dataTransfer.getData('style')
    let content: any = document.getElementById(ftype)
    var y = content.children[0].cloneNode(true);
    
    y.style = style

    let arrs = []
    let arr = style.split(";")
    for (let j = 0; j < arr.length; j++) {
      let b = arr[j].split(":")
      b[0].trim() && arrs.push(b[0].trim())
    }

    var container = document.createElement('div') //创建ul节点
    container.style.position = "absolute"
    container.style.left = e.pageX + "px"
    container.style.top = e.pageY + "px"
    container.classList.add('pendant-box')
    container.appendChild(y);

    document.body.appendChild(container)

    y.setAttribute('data', arrs)
    proxy.$pendant.init()
  })
})
</script>
