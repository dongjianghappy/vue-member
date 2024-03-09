<template>
<div>
  <section style="position:fixed; top:0; left:0; right:0; bottom:0; background: #f1f2f5">
    <div class="container bg-white absolute p50 w1000" style="top: 50px; bottom: 50px; left: 50%; margin-left: -500px; border-radius: 8px;">
      <div class="font18 cl-eb7350">
        <i class="iconfont icon-info font24 cl-eb7350" />
        因违反相关法律法规，该用户目前处于封禁状态</div>
      <div class="mt25 pl40" @click="handlePrev">返回</div>
    </div>
  </section>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useRoute
} from '@/utils'
import {
  useStore
} from 'vuex'
import {
  useRouter
} from 'vue-router'
import img from '@/components/public/img.vue';

export default defineComponent({
  components: {
    img
  },
  name: 'HomeViewbbb',
  setup(props, context) {
    const store = useStore();
    const route = useRoute()
    const router = useRouter();
    const userInfo: any = ref({})
    const msg: any = ref("")

    function handlePrev() {
      router.go(-1)
    }

    return {
      userInfo,
      msg,
      route,
      handlePrev
    }
  }
})
</script>

<style lang="less" scoped>
.bg-img {
  background: url(http://www.yunxi10.com/source/public/images/20171122191532_f2975b.jpg) no-repeat;
  background-size: cover;

  .open-text {
    position: absolute;
    width: 400px;
    height: 300px;
    color: #fff;
  }

  .open-con {
    background: #fff;
    position: absolute;
    border-radius: 8px;
    width: 400px;
    height: 300px;
  }
}
</style>
