<template>
<div class="module-wrap">
  <div class="module-head">
    推荐用户
    <span class="right">
      <v-space>
        <i class="iconfont icon-arrow deg180" :class="{disabled: current === 0}" style="margin: 8px !important" @click="handleToggle(-1)"></i>
        <i class="iconfont icon-arrow" :class="{disabled: current === 4 || current === dataList.length-1}" style="margin: 8px !important" @click="handleToggle(1)"></i>
      </v-space>
    </span>
  </div>
  <div class="module-content plr15">
    <div class="list-wrap mb10 pb10" v-for="(item, index) in dataList[current]" :key="index" style="display: flex">
      <div class="list-avatar">
        <v-photos :sourceData="item" />
      </div>
      <div class="list-content" style="flex: 1">
        <div class="list-title nowrap">
          {{item.nickname}}
        </div>
        <div class="list-desc nowrap">
          {{item.signature || 'Ta还没有签名'}}
        </div>
      </div>
      <div style="width: 70px">
        <v-concernbutton :data="item" :render="init" />
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  computed,
  useStore,
  ref
} from '@/utils'

const store = useStore();
const dataList: any = computed(() => store.getters['common/recommendUser']);
let current: any = ref(0)

function init() {
  store.dispatch('common/RecommendUser')
}

function handleToggle(param: any) {
  if ((param === -1 && current.value === 0) || (param === 1 && current.value === 4) || (param === 1 && dataList.value.length - 1 == current.value)) {
    return
  }
  current.value += param
}
onMounted(init)
</script>
