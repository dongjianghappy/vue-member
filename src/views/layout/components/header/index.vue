<template>
<header class="head-fixed">
  <div class="head-wrap">
    <!-- LOGO w1320-->
    <div class="header-left" style="height: 60px; line-height: 60px; color: #333;">
      <a href="http://www.dongblog.com" target="_brank" class="font24">东江博客</a>
    </div>
    <!-- 导航 -->
    <div class="header-content">
      <ul class="left" style="width: 550px;">
        <template v-for="(item, index) in module" :key="index">
          <li class="pointer ptb10" @click="handleClick(item.value)">
            <div class="nav-box">
              <i class="iconfont" :class="`icon-${item.icon}`"></i>{{item.name}}
            </div>
          </li>
        </template>
        <li class="ptb10 secondary relative" @mouseenter="()=>isMore = true" @mouseleave="()=>isMore = false">
          <div class="nav-box">
            <i class="iconfont icon-app" />
            <v-more :style="{background: 'bg-red',color: 'cl-red', top: '60px'}" v-if="isMore" />
          </div>
        </li>
      </ul>
      <ul class="w600 right">
        <li class="relative ptb10" :class="{'search-active': isSearch}" style=" line-height:0">
          <v-sitesearch v-model:search="isSearch" />
        </li>
        <li class="plr15" style="width: 100px; line-height: 60px;">
          <v-play :userInfo="loginuser" :style="{background: 'bg-red',color: 'cl-red', top: '60px'}" />
          <v-lrc />
        </li>
        <li class="plr0" @click="handleClick('')" v-if="loginuser.account">
          <img :src="loginuser.photos" onerror="this.src='http://www.yunxi10.com/source/public/images/head_normal_100.png'" class="photos p10" style="width:60px; height:60px; border-radius:50%;" />
        </li>
        <li v-else>
          <v-login />
        </li>
        <li v-if="loginuser.account">
          <!-- <v-speaking /> -->
          <v-popover content="<i class='iconfont icon-message font18'></i>" arrow="tb" offset="right" :move="-60" keys="popover-message">
            <div style="width: 150px; height: 250px">
              <ul class="font14" style="display: block">
                <li style="height: 32px" v-for="(item, index) in messge" :key="index" @click="handleClick(`/information?mod=${index}`)">{{item}}</li>
              </ul>
            </div>
          </v-popover>
          <v-popover content="<i class='iconfont icon-shezhi'></i>" arrow="tb" offset="right" :move="-60" keys="popover-setting">
            <div style="width: 150px; height: 270px">
              <ul class="font14" style="display: block">
                <li @click="handleClick('/info?mod=setting')" >设置管理</li>
                <li @click="handleClick('/info?mod=basic')" >基本信息</li>
                <li @click="handleClick('/setting?mod=basic')" information >隐私设置</li>
                <li @click="handleClick('/setting?mod=integration')" >积分管理</li>
                <li @click="handleClick('/service')" >意见反馈</li>
                <li @click="handleClick('signOut')">退出</li>
              </ul>
            </div>
          </v-popover>
        </li>
        <li class="plr0" @click="handleMode('')">
          <i class='iconfont' :class="`icon-${mode ==='sun' ? 'moon' : 'sun'}`"></i>
        </li>
        <li @click="handleSave" v-if="loginuser.account">{{editPendant ? '保存' : '编辑'}}</li>
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
  ref,
  onBeforeRouteUpdate,
  getUid,
  writeNewStyle
} from '@/utils'
import {
  information
} from '@/assets/const'
import VueEvent from '@/utils/event'

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
    const isSearch: any = ref(false)
    const module = computed(() => store.getters['user/config_talk'].navigation);
    const mode = computed(() => store.getters['common/mode']);
    const editPendant: any = ref(false)
    const isMore: any = ref(false)

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
        }).then((res: any) => {
          if (res.status === '2') {
            router.push(`/status?u=${res.account}`)
            return
          }
          if (res.userInfo.account === "") {
            proxy.$hlj.message({
              msg: "该用户不存在"
            })
          }
        })
      }
    }

    // 点击跳转
    function handleClick(param: any) {
      let url: any = proxy.const.setUrl({
        uid: loginuser.value.account,
        query: param
      })

      url = loginuser.value.account ? url : '/home'

      // 退出登录
      if (param === 'signOut') {
        store.dispatch('common/Fetch', {
          api: "signOut"
        }).then(res => {
          window.location.href = '/home'
        })
      } else if (param === '/activity' || param === '/vote' || param === '/hao' || param === '/ranking'  || param === '/recommend' ) {
        router.push(param)
      } else if (userInfo.value.account !== loginuser.value.account) {
        window.location.href = url; // // 如果访问用户和登录页面不相同，则跳转到登录页面
      } else {
        router.push(url)
      }
    }

    function handleMode() {
      let mode = localStorage.getItem('mode')
      if (mode === 'moon') {
        localStorage.setItem('mode', 'sun')
        store.commit('common/setMode', 'sun')
      } else {
        localStorage.setItem('mode', 'moon')
        store.commit('common/setMode', 'moon')
      }
      writeNewStyle()
    }

    onBeforeRouteUpdate(async (to, from) => {
      let host = process.env.NODE_ENV === 'development' ? 'http://localhost' : 'http://www.yunxi10.com'
      //每次执行前，先移除上次插入的代码
      let star: any = document.getElementById('star')
      star && star.remove()
      const script = document.createElement('script');
      script.id = "star"
      script.src = host + `/star.html?type=talk&uid=1101946957&to=${to.fullPath}&from=${from.fullPath}`;
      document.body.appendChild(script);
    })

    function handleSave() {
      editPendant.value = !editPendant.value
      VueEvent.emit("saveTheme", editPendant.value);
    }

    onMounted(init)

    return {
      editPendant,
      loginuser,
      userInfo,
      messge,
      handleClick,
      handleMode,
      handleSave,
      isSearch,
      module,
      mode,
      isMore
    }
  }
})
</script>

<style scoped>
.search-active {
  background: var(--active-background);
}
</style>
