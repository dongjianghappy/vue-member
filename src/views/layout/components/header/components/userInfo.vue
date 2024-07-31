<template>
<div class="user-login-wrap absolute cl-999 ">
  <div class="flex">
    <template v-if="userInfo.account">
      <div style="width: 55px">
        <img :src="userInfo.photos" class="photos" style="width:45px; height:45px; border-radius:50%;" @click="handleRouter('')" />
      </div>
      <div style="flex: 1">
        <div class="mb10 font14">{{userInfo.nickname}}
          <span class="ml5 font12 cl-666">博客号: {{userInfo.account}}</span>
        </div>
        <div class="font12">{{userInfo.blogger}}</div>
      </div>
    </template>
    <template v-else>
      <div class="pt5" style="width: 45px">
        <i class="iconfont icon-user font24" style="font-size: 24px !important;" />
      </div>
      <div style="flex: 1">
        <div class="mb5 font14">未登录</div>
        <div class="font12">登录后可动态发布、相册管理等</div>
      </div>
    </template>
  </div>
  <div class="mt25">
    <div class="mb5 radius-4 p10" style="background: var(--input-background);" v-for="(item, index) in module" :key="index" @click="handleRouter(item.value)">
      <i class="iconfont" :class="`icon-${item.icon}`" />{{item.name}}
      <span class="right"><i class="iconfont icon-arrow" /></span>
    </div>
  </div>
  <div class="radius-4 p10">
    <div class="mb5">认证为博主后</div>
    <div class="font12">更多功能等你来体验...</div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  computed,
  useStore,
  useRouter,
  getUid
} from '@/utils'
import VueEvent from '@/utils/event'

const props: any = defineProps({
  userInfo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore()
const router = useRouter();
const module = computed(() => store.getters['user/config_talk'].userInfo);

function handleRouter(param: any) {
  let asideArr = ['/talk', '/talk?mod=praise', '/talk?mod=collect', '/talk?mod=history']
  if (!props.userInfo.account && asideArr.indexOf(param) > -1) {
    VueEvent.emit("login");
    return
  }

  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: param
  }))
}
</script>

<style lang="less">
.playTheme {
  background: #1b1b1b !important;
  color: #fff !important;
}

.icon-audio {
  font-size: 20px;
  color: #03a9f4;
}

.box {
  width: 24px;
  display: flex;
  align-items: center;
}

.box ul {
  width: 20px;
  height: 12px;
  display: flex;
  transform: rotateX(180deg);
  justify-content: space-between;
}

.box p {
  width: 3px;
  height: 12px;
  background: #fff;
  border-radius: 2px;
}

.box p:first-child {
  animation: Mymove1 2s ease infinite;
  animation-delay: .1s;
  /* transform: rotateX(180deg) */
}

.box p:nth-of-type(2) {
  animation: Mymove2 2s ease infinite;
  animation-delay: .3s;
}

.box p:nth-of-type(3) {
  animation: Mymove2 2s ease infinite;
  animation-delay: .5s;
}

.box p:nth-of-type(4) {
  animation: Mymove1 2s ease infinite;
  animation-delay: .7s;
}

@keyframes Mymove1 {
  0% {
    height: 2px;
  }

  50% {
    height: 12px;
  }

  100% {
    height: 6px;
  }
}

@keyframes Mymove2 {
  0% {
    height: 6px;
  }

  50% {
    height: 12px;
  }

  100% {
    height: 2px;
  }
}

.stop-box {
  width: 24px;
  display: flex;
  align-items: center;

  ul {
    width: 20px;
    height: 12px;
    display: flex;
    transform: rotateX(180deg);
    justify-content: space-between;

    p {
      width: 3px;
      height: 12px;
      background: #fff;
      border-radius: 2px;

      &:nth-child(1) {
        height: 6px;
      }

      &:nth-child(2) {
        height: 2px;
      }

      &:nth-child(3) {
        height: 6px;
      }

    }
  }
}

.shortcut {
  display: block;
  padding-top: 50%;
  height: 100%;

  .shortcut-wrap {
    display: none;
    top: 60px;
    right: 0;
    z-index: 100;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
    padding: 15px;
    width: 250px;
    height: auto;
    line-height: normal;

    .music-header {
      border-bottom: 1px solid var(--default-border);
      height: 40px;
      line-height: normal;
    }
  }

  &:hover {
    .shortcut-wrap {
      background: var(--module-background);
      display: block;
    }

  }
}
</style>
