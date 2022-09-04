<template>
<header>
  <div class="head-wrap w1320">
    <div class="header-left" style="height: 60px; line-height: 60px; color: #333;">
      <a href="http://www.dongblog.com" target="_brank" class="font24" >东江博客</a>
    </div>
    <div class="header-content">
      <ul class="w400 left">
        <li class="pointer" @click="handleclick('')"><i class="iconfont icon-home"></i>首页</li>
        <li class="pointer" @click="handleclick('/activity')"> <i class="iconfont icon-topic"></i>话题</li>
        <li class="pointer" @click="handleclick(`/appstore`)"><i class="iconfont icon-app"></i>应用中心</li>
        <!-- <li class="pointer" @click="handleclick(`/manage`)"><i class="iconfont icon-app"></i>管理中心</li> -->
      </ul>
      <ul class="w600 right align_right">
        <li class="searchbox ptb10" style=" line-height:0">
          <v-search />
        </li>
        <li @click="handleclick('')">
          <img :src="loginuser.photos" class="photos p10" style="width:60px; height:60px; border-radius:50%;" />
        </li>
        <li>
          <Popover content="<i class='iconfont icon-message font18'></i>" arrow="tb" offset="right" :move="-60" keys="popover-message">
            <div style="width: 150px; height: 250px">
              <ul class="font14" style="display: block">
                <li style="height: 32px" v-for="(item, index) in messge" :key="index" @click="routing(`/information?mod=${index}`)">{{item}}</li>
              </ul>
            </div>
          </Popover>
          <Popover content="<i class='iconfont icon-shezhi'></i>" arrow="tb" offset="right" :move="-60" keys="popover-setting">
            <div style="width: 150px; height: 250px">
              <ul class="font14" style="display: block">
                <li @click="routing('/info?mod=basic')" class="h32">基本信息</li>
                <li @click="routing('/setting?mod=basic')" information class="h32">隐私设置</li>
                <li @click="routing('/setting?mod=integration')" class="h32">积分管理</li>
                <li @click="routing('signOut')">退出</li>
              </ul>
            </div>
          </Popover>
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
  onMounted,
  computed,
  useStore,
  useRouter,
  getUid
} from '@/utils'
import {
  basicInfo,
  information
} from '@/assets/const'
import Popover from '@/components/packages/popover/index.vue';

export default defineComponent({
  name: 'v-Header',
  components: {
    Popover
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const loginuser = computed(() => store.getters['user/loginuser']);
    const userInfo = computed(() => store.getters['user/userInfo']);
    const menu: any = basicInfo;
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
    function handleclick(param: any) {
      if (param === '/activity') {
        router.push(param)
      } else if (userInfo.value.account !== loginuser.value.account) {
        const url = proxy.const.setUrl({
          uid: loginuser.value.account,
          query: param
        })
        window.location.href = url;
      } else {
        router.push(proxy.const.setUrl({
          uid: loginuser.value.account,
          query: param
        }))
      }
    }

    // 路由跳转
    function routing(param: any) {
      if (param === 'signOut') {
        store.dispatch('common/Fetch', {
          api: "signOut"
        }).then(res => {
          window.location.href = 'http://www.yunxi10.com/login.html'
        })
      } else {
        router.push(proxy.const.setUrl({
          uid: loginuser.value.account,
          query: param
        }))
      }
    }

    onMounted(init)

    return {
      loginuser,
      userInfo,
      menu,
      messge,
      handleclick,
      routing
    }
  }
})
</script>
