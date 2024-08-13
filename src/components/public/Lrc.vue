<template>
<div class="lrc-wrap lrc-bottom" v-if="setting.lrc_display === '1' && setting.lrc_location ==='bottom'">
  <div class="lrc align_left vertical-text">{{LRC[0]}}</div>
  <div class="lrc align_right vertical-text">{{LRC[1]}}</div>
</div>
<div class="lrc-wrap lrc-left" v-if="setting.lrc_display === '1' && setting.lrc_location === 'left'">
  <div class="lrc align_left vertical-text">{{LRC[0]}}</div>
  <div class="lrc align_right vertical-text">{{LRC[1]}}</div>
</div>
<div class="lrc-wrap lrc-right" v-if="setting.lrc_display === '1' && setting.lrc_location === 'right'">
  <div class="lrc align_left vertical-text">{{LRC[0]}}</div>
  <div class="lrc align_right vertical-text">{{LRC[1]}}</div>
</div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  useStore
} from '@/utils'
import VueEvent from '@/utils/event'

const store = useStore()
const setting = computed(() => store.getters['user/music'].setting || {});
const LRC: any = ref("")

VueEvent.on("showLrc", (data: any) => {
  LRC.value = data
})
</script>

<style lang="less" scoped>
.lrc {
  text-shadow: 0 0 5px var(--input-background), 0 0 10px var(--input-background);
}

.lrc-wrap {
  position: fixed;
  pointer-events: none;
  padding: 25px;
  font-size: 24px;
  z-index: 10000000;

  &.lrc-bottom {
    left: 50%;
    bottom: 0px;
    margin-left: -300px;
    width: 600px;
    height: 150px;

    .vertical-text {
      width: 100;
      height: 50px;
    }
  }

  &.lrc-left {
    left: 0px;
    top: 50%;
    margin-top: -250px;
    width: 150px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;

    .vertical-text {
      width: 50px;
      height: 100%;
      writing-mode: vertical-lr;
      text-align: center;
      letter-spacing: 8px;
    }
  }

  &.lrc-right {
    right: 0px;
    top: 50%;
    margin-top: -250px;
    width: 150px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;

    .vertical-text {
      width: 50px;
      height: 100%;
      writing-mode: vertical-lr;
      text-align: center;
      letter-spacing: 8px;
    }
  }
}
</style>
