<template>
<v-button v-model:show="isShow">
  说明
</v-button>
<v-window v-model:show="isShow" ref="dialog" :data="data" :style="{width: 350, height: 450}">
  <template v-slot:content>
    <div class="modelLight anim-rotate360"></div>
    <div class="happy font14" style="z-index: 100">
      <div class="mb25 font20 align_center">博客记录点滴生活！</div>
      <div style="line-height: 25px; text-indent: 30px;">Hi, {{loginuser.nickname}}您好, 欢迎来到东江哥博客。海量网页素材免费下载尽在07素材网，本博客为个人博客仅记录日常。如果您有任何问题请在左下方“在线留言”留言。感谢！</div>
      <v-broadcast :content="`Hi, ${loginuser.nickname}您好, 欢迎来到东江哥博客。海量网页素材免费下载尽在07素材网，本博客为个人博客仅记录日常。如果您有任何问题请在左下方“在线留言”留言。感谢！`" />
    </div>
  </template>
</v-window>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  computed,
  useStore
} from '@/utils'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const store = useStore();
const isShow = ref(true)
const loginuser = computed(() => store.getters['user/loginuser']);
</script>

<style lang="less" scoped>
.happy {
  background: var(--module-background);
  border-radius: 8px;
  padding: 25px;
  width: 350px;
  height: 450px;
}

.modelLight {
  background: url(http://www.yunxi10.com/source/public/images/light.png) no-repeat;
  background-size: cover;
  width: 1534px;
  height: 1534px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  pointer-events: none;
}

.anim-rotate360 {
  animation: rotate-360 6s linear infinite;
}

@keyframes rotate-360 {
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
