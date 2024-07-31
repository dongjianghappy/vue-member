<template>
<div v-if="isShow" class="container w500 p25 font24 no-event fixed" style="left: 10px; right: 10px; bottom: 10px; height: 100px;">
  <div class="lrc align_left" style="height: 40px; line-height: 40px; color: var(--color-primary);">{{LRC[0]}}</div>
  <div class="lrc align_right" style="height: 40px; line-height: 40px; color: var(--color-primary);">{{LRC[1]}}</div>
</div>
</template>

<script setup lang="ts">
import {
  ref
} from '@/utils'
import VueEvent from '@/utils/event'

const isShow = ref(false)
const LRC: any = ref("")

VueEvent.on("lrc", (data: any) => {
  isShow.value = !isShow.value
})

VueEvent.on("showLrc", (data: any) => {
  LRC.value = data
})
</script>

<style lang="less" scoped>
.lrc {
  text-shadow: 0 0 5px var(--input-background), 0 0 10px var(--input-background);
}
</style>
