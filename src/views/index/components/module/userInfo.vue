<template>
<div class="module-wrap">
  <div class="module-content user-photos p0">
    <div class="user-head" :style="`background: url(${userInfo.head_background}) no-repeat; background-size: cover`">
      <v-photo :data="userInfo" />
    </div>
    <div class="user-info">
      <div class="name-box">
        <div class="mb5 bold"> {{userInfo.nickname}} <span style="color: #f67f00;">LV.{{userInfo.level}}</span></div>
        <div class="font12">博客号: {{userInfo.account}} 
          <v-copy :data="userInfo.account" />
          <v-selectbackground kind="head_background"  />
          <v-qrcode :user="userInfo" />
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

    return {
      
    }
  },
})
</script>
