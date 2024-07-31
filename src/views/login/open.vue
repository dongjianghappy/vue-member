<template>
<div>
  <section class="bg-img">
    <div class="open-text font32">
      记录点滴，这里开始！
    </div>
    <div class="open-con p25 align_center">
      <div class="font24">东江博客</div>
      <div class="pt15 pb25 font14 cl-666">点击以下头像以开通博客。</div>
      <div>
        <img :src="userInfo.photos" class="radius-4" style="width: 85px; height: 85px" @click="handleOpen" />
        <div class="pt10">{{userInfo.nickname}}</div>
      </div>
      <div class="mt15 cl-red">{{msg}}</div>
    </div>
  </section>
</div>
</template>

<script setup lang="ts">
import {
  ref,
  useStore
} from '@/utils'

const store = useStore();
const userInfo: any = ref({})
const msg: any = ref("")

store.dispatch('user/Detect').then((res) => {
  if (res) {
    if (res.userInfo.weibo == '1') {
      window.location.href = window.location.origin + `/u/${res.userInfo.account}`
    }
    userInfo.value = res.userInfo
  }
})

function handleOpen() {
  store.dispatch('common/Fetch', {
    api: 'openWeibo'
  }).then((res) => {
    if (res.ifSuccess === 1) {
      setTimeout(() => {
        window.location.href = window.location.origin + `/u/${userInfo.value.account}`
      }, 1000)
    } else {
      msg.value = res.returnMessage
    }
  });

}
</script>

<style lang="less" scoped>
.bg-img {
  background: url(http://www.yunxi10.com/source/public/images/20171122191532_f2975b.jpg) no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .open-text {
    position: absolute;
    left: 20%;
    top: 50%;
    margin-left: 0px;
    margin-top: -250px;
    width: 400px;
    height: 300px;
    color: #fff;
  }

  .open-con {
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: 0px;
    margin-top: -250px;
    border-radius: 8px;
    width: 400px;
    height: 300px;
  }
}
</style>
