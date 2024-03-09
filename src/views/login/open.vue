<template>
<div>
  <section class="bg-img" style="position:fixed; top:0; left:0; right:0; bottom:0;">
    <div class="open-text font32" style="left: 20%; top: 50%; margin-left: 0px; margin-top: -250px;">
      记录点滴，这里开始！
    </div>
    <div class="open-con p25 align_center" style="left: 50%; top: 50%; margin-left: 0px; margin-top: -250px;">
      <div class="font24">东江博客</div>
      <div class="pt15 pb25 font14 cl-666">点击以下头像以开通博客。</div>
      <div>
        <img :src="userInfo.photos" onerror="this.src='http://www.yunxi10.com/source/public/images/head_normal_100.png'" style="border-radius: 4px; width: 85px; height: 85px" @click="handleOpen" />
        <div class="pt10">{{userInfo.nickname}}</div>
      </div>
      <div class="mt15 cl-red">{{msg}}</div>
    </div>
  </section>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref
} from 'vue'
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
    const router = useRouter();
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
    return {
      userInfo,
      handleOpen,
      msg
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
