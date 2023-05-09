<template>
<div class="module-wrap">
  <div class="module-content user-photos p0">
    <div class="user-head" :style="`background: url(${userInfo.head_background}) no-repeat; background-size: cover`">
      <v-photo :data="userInfo" />
    </div>
    <div class="user-info">
      <div class="name-box">
        <div class="mb5 bold"> {{userInfo.nickname}} <span style="color: #f67f00;">LV.{{userInfo.level}}</span></div>
        <div class="font12">博客号: {{userInfo.account}} <i class="iconfont icon-copy" title="复制" @click="handleCopy(userInfo.account)"></i>
          <v-selectbackground kind="head_background"  />
        </div>
      </div>
      <div class="name-atten">
        <v-concern />
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent
} from '@/utils'

export default defineComponent({
  name: 'UserInfoView',
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {

    // 复制账号
    function handleCopy(param: any) {
      // let transfer = document.createElement('input');
      // document.body.appendChild(transfer);
      // transfer.value = param; // 这里表示想要复制的内容
      // transfer.focus();
      // transfer.select();
      // if (document.execCommand('copy')) {
      //   document.execCommand('copy');
      // }
      // transfer.blur();
      // document.body.removeChild(transfer);

    }

    return {
      handleCopy
    }
  },
})
</script>
