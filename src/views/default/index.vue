<template>
<div>
  <section class="bg-img">
    <div class="flex p25" style="flex-direction: row; height: 100%;">
    <div class="relative" style="flex: 1;">
      <span class="absolute" style="top: 25%; left: 15%; font-size: 48px; color: #abc5d9">记录点滴，这里开始！</span>
      <div class="absolute" style="top: 40%; left: 20%; font-size: 24px; color: #617a98">此刻，就是起点。记录吧，每一个微小日常都值得被看见</div>
      <div class="absolute cl-white bold" style="top: 80%; left: 15%;">
        <span class="btn-login mr25" style="background: #abc5d9; color: #546883"  @click="handleClick('qq')"><i class="iconfont icon-qq" style="color: #ff3766" />QQ登录</span>
        <span class="btn-login" style="background: #abc5d9; color: #546883"  @click="handleClick">账号登录</span>
      </div>
    </div>
    <div class="flex" style="width: 400px; flex-direction: column;">
      <Card />
    </div>
    </div>
  </section>
</div>
</template>

<script setup lang="ts">
import {
  ref,
  useStore,
  computed,
  useRouter
} from '@/utils'

import Card from './components/card.vue'
const router = useRouter()
const store = useStore();
const siteInfo = computed(() => store.getters['user/siteInfo']);
const userInfo: any = ref({})
const blog: any = ref({})
const msg: any = ref("")

function handleClick(param: any) {
  if (param == 'qq') {
    window.location.href = 'http://www.yunxi10.com/api/login.php'
  } else {
    if (process.env.NODE_ENV === 'development') {
      router.push(`/login`)
    } else {
      window.location.href = 'http://www.yunxi10.com/login'
    }
  }
}

store.dispatch('user/Detect').then((result) => {
  let res = result.result
  if (res && res.userInfo && res.userInfo.account) {
      window.location.href = window.location.origin + `/u/${res.userInfo.account}`
    }
})

</script>

<style lang="less" scoped>
.bg-img {
  background: url(/public/images/bg2.jpg) no-repeat;
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


}
</style>
