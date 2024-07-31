<template>
<div class="m25 flex" style="height: 64px" v-for="(item, index) in data.list" :key="index">
  <div class="mr10">
    <input type="radio" name="name" :value="value" v-model="checked" style="width: 20px; height: 20px;" v-if="data.choose === '1'" />
    <input type="checkbox" style="width: 20px; height: 20px;" v-else />
  </div>
  <div class="mr10">{{item.votetitle}}</div>
  <div class="relative" style=" flex: 1">
    <span class="absolute font12 cl-999" style="top: -20px; left: 0" v-if="item.description">{{item.description}}</span>
    <div class=" h30" style="border-radius: 4px;" :style="{background: item.color}"></div>
  </div>
  <div class="ml15 pb5">{{item.vote}}票</div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  getUid,
  useStore,
  useRouter
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Array,
    default: () => {
      return {}
    }
  }
})
const store = useStore();
const router = useRouter()

function init() {
  store.dispatch('common/Fetch', {
    api: 'visitorList',
    data: {
      uid: getUid()
    }
  })
}

function handleBack() {
  router.push('/vote')
}

onMounted(init)
</script>
