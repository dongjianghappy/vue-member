<template>
<div>
  <section class="bg-img">
    <div class="open-text font32">
      记录点滴，这里开始！
    </div>
    <div class="open-con p25 align_center">
      <div class="font24">{{siteInfo.talk_site_name}}</div>
      <div class="pt15 pb25 font14 cl-666">
        <span v-if="blog.close_blog === '0'">亲，欢迎回来，点击头像进入博客</span>
        <span v-else>点击以下头像以开通博客。</span>
      </div>
      <div>
        <img :src="userInfo.photos" onerror="this.src='/images/head_normal_100.png'" class="radius-4" style="width: 85px; height: 85px" @click="handleOpen" />
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
  useStore,
  computed
} from '@/utils'

const store = useStore();
const siteInfo = computed(() => store.getters['user/siteInfo']);
const userInfo: any = ref({})
const blog: any = ref({})
const msg: any = ref("")

store.dispatch('user/Detect').then((result) => {
  let res = result.result
  console.log("vvvvvvvvv");
  
  if (res) {
    if (res.userInfo && res.userInfo.weibo == '1' && res.privacy_setting && res.privacy_setting.blog.close_blog == '1') {
      window.location.href = window.location.origin + `/u/${res.userInfo.account}`
    }
    userInfo.value = res.userInfo
    blog.value = res.privacy_setting && res.privacy_setting.blog || {}
  }
})

function handleOpen() {
  store.dispatch('common/Fetch', {
    api: 'openWeibo'
  }).then((res) => {
    if (res.result && res.result.status === "1") {
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
  background: url(/public/images/default.jpg) no-repeat;
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
