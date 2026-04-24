<template>
  <div class="card-wrap align_center">
          
    <div class="mt25" style="color: #617a98">
            <img :src="userInfo.photos" onerror="this.src='/images/head_normal_100.png'"  style="border-radius: 50%; width: 120px; height: 120px" @click="handleOpen" />
        <div class="pt15 font18">{{userInfo.nickname}}</div>
        <div class="pt25">主人设置了权限，您可通过以下方式访问</div>
        
        </div>
        
  </div>
  <!-- <div class="card-wrap card-1">
    <img src="/images/card2.jpg" />
  </div> -->
</template>

<script setup lang="ts">
import {
  useRouter,
  computed,
  useStore,
  inject
} from '@/utils'



const store = useStore();
const router = useRouter()
const module = computed(() => store.getters['user/config_talk'].footer);

const userInfo = inject("visitUser")

function handleClick(param: any) {
  router.push(param)
}
</script>

<style lang="less" scoped>
  .card-wrap {
    background: rgba(18, 24, 38, 0.3);
    border-radius: 8px;
    margin: 50px 25px;
    padding: 25px;
    height: 400px;
    &.card-1{
       transform: rotate(10deg);
  -ms-transform: rotate(10deg);
  /* IE 9 */
  -moz-transform: rotate(10deg);
  /* Firefox */
  -webkit-transform: rotate(10deg);
  /* Safari 和 Chrome */
  -o-transform: rotate(10deg);
  /* Opera */
    }
    &.card-2{
       transform: rotate(-10deg);
  -ms-transform: rotate(-10deg);
  /* IE 9 */
  -moz-transform: rotate(-10deg);
  /* Firefox */
  -webkit-transform: rotate(-10deg);
  /* Safari 和 Chrome */
  -o-transform: rotate(-10deg);
  /* Opera */
    }
    &.card-3{
       transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  /* IE 9 */
  -moz-transform: rotate(45deg);
  /* Firefox */
  -webkit-transform: rotate(45deg);
  /* Safari 和 Chrome */
  -o-transform: rotate(45deg);
  /* Opera */
    }
    img{
      width: 100%;
    }
  }
</style>