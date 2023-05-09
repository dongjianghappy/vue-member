<template>
<header>
  <div class="head-wrap w1320">
    <!-- LOGO -->
    <div class="header-left" style="height: 60px; line-height: 60px; color: #333;">
      <a href="http://www.dongblog.com" target="_brank" class="font24">东江博客</a>
    </div>
    <!-- 导航 -->
    <div class="header-content">
      <ul class="w400 left">
        <li class="pointer" @click="handleClick('')"><i class="iconfont icon-home"></i>首页</li>
        <li class="pointer" @click="handleClick('/activity')"> <i class="iconfont icon-topic"></i>话题</li>
        <li class="pointer" @click="handleClick(`/content`)"><i class="iconfont icon-app"></i>管理中心</li>
        <li class="pointer" @click="handleClick(`/appstore`)"><i class="iconfont icon-app"></i>应用中心</li>
      </ul>
      <ul class="w600 right align_right">
        <li class="searchbox ptb10" style=" line-height:0">
          <v-sitesearch />
        </li>
        <li class="plr15"  style="width: 100px; line-height: 60px;">
            <v-play :userInfo="loginuser" :style="{background: 'bg-red',color: 'cl-red', top: '60px'}" />
        </li>
        <li class="plr0" @click="handleClick('')">
          <img :src="loginuser.photos" class="photos p10" style="width:60px; height:60px; border-radius:50%;" />
        </li>
        <li>
          <v-popover content="<i class='iconfont icon-message font18'></i>" arrow="tb" offset="right" :move="-60" keys="popover-message">
            <div style="width: 150px; height: 250px">
              <ul class="font14" style="display: block">
                <li style="height: 32px" v-for="(item, index) in messge" :key="index" @click="handleClick(`/information?mod=${index}`)">{{item}}</li>
              </ul>
            </div>
          </v-popover>
          <v-popover content="<i class='iconfont icon-shezhi'></i>" arrow="tb" offset="right" :move="-60" keys="popover-setting">
            <div style="width: 150px; height: 250px">
              <ul class="font14" style="display: block">
                <li @click="handleClick('/info?mod=basic')" class="h32">基本信息</li>
                <li @click="handleClick('/setting?mod=basic')" information class="h32">隐私设置</li>
                <li @click="handleClick('/setting?mod=integration')" class="h32">积分管理</li>
                <li @click="handleClick('signOut')">退出</li>
              </ul>
            </div>
          </v-popover>
        </li>
        <li v-if="loginuser.role !== '0'"><a href="http://www.yunxi10.com/admins/admin" style="color: #f67f00;" target="_brank">后台管理</a></li>
      </ul>
    </div>
  </div>
</header>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useStore,
  useRouter,
  onMounted,
  computed,
  onBeforeRouteUpdate,
  getUid
} from '@/utils'
import {
  information
} from '@/assets/const'

export default defineComponent({
  name: 'v-Header',
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const loginuser = computed(() => store.getters['user/loginuser']);
    const userInfo = computed(() => store.getters['user/userInfo']);
    const messge: any = information;

    function init() {
      store.dispatch('common/Fetch', {
        api: 'Visited',
        data: {
          uid: getUid()
        }
      })

      let a = true
      if (a) {
        store.dispatch('user/OtherUserInfo', {
          uid: getUid()
        })
      }
    }

    // 点击跳转
    function handleClick(param: any) {
      const url = proxy.const.setUrl({
        uid: loginuser.value.account,
        query: param
      })

      // 退出登录
      if (param === 'signOut') {
        store.dispatch('common/Fetch', {
          api: "signOut"
        }).then(res => {
          if (process.env.NODE_ENV === 'development') {
            router.push(`/login`)
          } else {
            window.location.href = 'http://www.yunxi10.com/login.html'
          }
        })
      } else if (param === '/activity') {
        router.push(param)
      } else if (userInfo.value.account !== loginuser.value.account) {
        window.location.href = url; // // 如果访问用户和登录页面不相同，则跳转到登录页面
      } else {
        router.push(url)
      }
    }

    onBeforeRouteUpdate(async (to, from) => {
      //每次执行前，先移除上次插入的代码
      let star: any = document.getElementById('star')
      star && star.remove()
      const script = document.createElement('script');
      script.id = "star"
      script.src = `http://localhost/star_talk.html?uid=1101946957&to=${to.fullPath}&from=${from.fullPath}`;
      document.body.appendChild(script);
    })

    onMounted(init)

    return {
      loginuser,
      userInfo,
      messge,
      handleClick
    }
  }
})
</script>
