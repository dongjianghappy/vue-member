<template>
  <div class="card-wrap card-1">
    <img src="/images/default.jpg" />
  </div>
  <div class="card-wrap card-1">
    <img src="/images/card2.jpg" />
  </div>
</template>

<script setup lang="ts">
import {
  useRouter,
  computed,
  useStore
} from '@/utils'

const store = useStore();
const router = useRouter()
const module = computed(() => store.getters['user/config_talk'].footer);

function handleClick(param: any) {
  router.push(param)
}
</script>

<style lang="less" scoped>
  .card-wrap {
    background: #fff;
    opacity: 0.5;
    border-radius: 8px;
    margin: 25px;
    padding: 10px;
    width: 300px;
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