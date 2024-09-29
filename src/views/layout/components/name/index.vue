<template>
<div class="container w1100 space-name">
  <div class="text">
    <span class="highlight">{{userInfo.space_name || siteInfo.talk_space_name}}</span>
    
    
    <!-- <span class="right font18" @click="handlePepele">轨迹人生</span> -->
    </div>
    <!-- <canvas id="canvas" style="width: 100%; height: 10px" v-if="setting.yinpin === '1'"></canvas> -->
</div>
</template>

<script setup lang="ts">
import {
  computed,
  useStore,
  useRouter
} from '@/utils'

const store = useStore()
const router = useRouter()

const siteInfo = computed(() => store.getters['user/siteInfo']);
const userInfo = computed(() => store.getters['user/userInfo']);
const setting: any = computed(() => store.getters['user/music'].setting);

function handlePepele(){
  router.push(`/life`)
}
</script>

<style lang="less" scoped>
.space-name {
  padding: 50px 0;
  font-family: cursive;
  font-size: 36px;
  color: var(--module-background);
  text-align: center;
  // text-shadow: rgb(201, 207, 206) 0px 1px 0px, rgb(188, 194, 194) 0px 2px 0px, rgb(175, 182, 182) 0px 3px 0px, rgb(164, 173, 172) 0px 4px 0px, rgb(159, 168, 167) 0px 5px 0px, rgb(153, 163, 162) 0px 6px 0px, rgb(151, 161, 160) 0px 7px 0px, rgb(148, 158, 157) 0px 8px 0px, rgba(0, 0, 0, 0.05) 0px 0px 5px, rgba(0, 0, 0, 0.2) 0px 1px 3px, rgba(0, 0, 0, 0.2) 0px 3px 5px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.2) 0px 10px 10px, rgba(0, 0, 0, 0.3) 0px 20px 20px;

  .text {
    padding: 15px 0;
    background-image: linear-gradient(90deg, hsla(0, 0%, 100%, 0), var(--module-background), hsla(0, 0%, 100%, 0)) !important;
    color: var(--color-primary);
    span {
      font-family: cursive !important;
    }
  }
}
</style>
