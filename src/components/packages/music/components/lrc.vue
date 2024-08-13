<template>
<div class="relative align_center" style="height: 145px; z-index: 100000">
  <div class="absolute" style="width: 100%; bottom:0; z-index: -1;">
  </div>
  <div style="height: 145px; overflow: hidden;">
    <div id="lrc-wrap" style="transition: all 0.3s; z-index: 100; transform: translateY(60px)" v-if="Object.keys(data).length > 0">
      <div v-for="(item, key, index) in data" :key="index" style="line-height: 30px;">
        <span class="font14" :class="currentIndex === index ? 'bold font16 cl-999' : 'opacity'" @click="handleClick(key, index)">{{item}}</span></div>
    </div>
    <div class="pt25 cl-666" v-else>暂无歌词</div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  onMounted,
  ref,
  timeToSeconds
} from '@/utils'
import VueEvent from '@/utils/event'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const currentIndex: any = ref(0)

function handleClick(key: any, index: any) {
  let lrc: any = document.getElementById("lrc-wrap")
  lrc.style.transform = `translateY(-${30*(index-2)}px)`
  currentIndex.value = index

  let audio: any = document.getElementById('listen_music');
  audio.currentTime = timeToSeconds(`00:${key}`)
  audio.play()
}
onMounted(() => {
  VueEvent.on("sliding", (index: any) => {
    let lrc: any = document.getElementById("lrc-wrap")
    if(!lrc){
      return
    }
    lrc.style.transform = `translateY(-${30*(index-2)}px)`
    currentIndex.value = index
  })
})
</script>

<style lang="less" scoped>
.opacity{
  opacity: 0.45
}
</style>