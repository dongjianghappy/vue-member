<template>
<div class="module-wrap">
  <div class="module-content user-photos p0">
    <div class="user-head" :style="`background: url(${userInfo.head_background}) no-repeat; background-size: cover`">
      <div class="photos ">
        <img src="http://www.yunxi10.com/source/public/images/head_normal_100.png" />
      </div>
    </div>
    <div class="user-info">
      <div class="name-box">
        <v-login title="立即登录" />
      </div>
      <div class="mt15 mb25 font18 align_center">{{siteInfo.talk_brand}}</div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  useRouter,
  computed,
  useStore
} from '@/utils'

const store = useStore()
const router = useRouter()
const userInfo = computed(() => store.getters['user/loginuser']);
const siteInfo = computed(() => store.getters['user/siteInfo']);

function handleClick() {
  router.push('/login')
}
</script>
