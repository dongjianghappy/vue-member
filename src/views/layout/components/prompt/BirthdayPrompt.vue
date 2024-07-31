<template>
<v-button v-model:show="isShow">
  说明
</v-button>
<v-window v-model:show="isShow" :data="data" :style="{width: 350, height: 450}">
  <template v-slot:content>
    <div class="modelLight anim-rotate360"></div>
    <div class="happy font14" :style="`background: url(${loginuser.birthday && loginuser.birthday.background}) no-repeat; background-size: cover; opacity: 1; z-index: 100`">
      <div class="mb25 pt25 font20 align_center">
        <img src="http://yunxi10.com/user/110506372/photos/110506372.png" style="border-radius: 50%; width: 125px; height: 125px;" />
      </div>
      <div class="align_center">
        亲爱的{{loginuser.nickname}}
        <div class="mt10 bold font32" style="font-style: italic;">生日快乐</div>
      </div>
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
