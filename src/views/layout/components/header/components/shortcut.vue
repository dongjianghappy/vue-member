<template>
<div class="relative shortcut flex">
  <i class="iconfont icon-shortcut font20"></i>
  <div class="shortcut-wrap absolute cl-999 ">
    <div class="flex">
      <div class="pt15" style="width: 45px">
        <i class="iconfont icon-folder-open font24" />
      </div>
      <div style="flex: 1">
        <div class="mb10 font14">添加网页收藏夹</div>
        <div class="font12">「Ctrl+D」添加博客至收藏夹</div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  onMounted,
  useStore,
  durationTrans,
  useRouter,
  getUid
} from '@/utils'

export default defineComponent({
  name: 'v-Shortcut',
  setup(props, context) {

    return {

    }
  }
})
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
