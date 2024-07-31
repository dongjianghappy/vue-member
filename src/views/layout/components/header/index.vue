<template>
<header class="head-fixed">
  <div class="head-wrap">
    <!-- LOGO w1320-->
    <div class="header-left" style="height: 60px; line-height: 60px; color: #333;">
      <a :href="`${loginuser.account ? '/u/'+loginuser.account : '/home'}`" target="_brank" class="font24">{{siteInfo.talk_site_name}}</a>
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
        <li class="relative user-login-btn plr0" v-if="loginuser.account">
          <img :src="loginuser.photos" class="photos p10" @click="handleClick('')" style="width:60px; height:60px; border-radius:50%;" />
          <UserInfo :userInfo="loginuser" />
        </li>
        <li class="relative user-login-btn" v-else>
          <v-login />
          <UserInfo />
        </li>
        <li class="relative plr10">
          <Shortcut />
        </li>
        <li class="relative plr10" v-if="loginuser.account">
          <v-message :router="handleClick" />
        </li>
        <li class="relative plr10" v-if="loginuser.account">

          <v-popover content="<i class='iconfont icon-shezhi'></i>" arrow="tb" offset="right" :move="-60" keys="popover-setting">
            <div style="width: 150px; height: 300px">
              <ul class="font14" style="display: block">
                <li @click="handleClick(item.value)" v-for="(item, index) in setting" :key="index">{{item.name}}</li>
                <li @click="handleClick('signOut')">退出</li>
              </ul>
            </div>
          </v-popover>
        </li>
        <li class="plr0" @click="handleMode('')">
          <i class='iconfont' :class="`icon-${mode ==='sun' ? 'moon' : 'sun'}`"></i>
        </li>
        <li @click="handleSave" v-if="loginuser.account">
          <i class="iconfont icon-theme1" :class="{'cl-666': !editPendant}" /></li>
      </ul>
    </div>
  </div>
</header>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  useStore,
  useRouter,
  onMounted,
  computed,
  ref,
  onBeforeRouteUpdate,
  getUid,
  writeNewStyle,
  useRoute
} from '@/utils'

import VueEvent from '@/utils/event'
import UserInfo from './components/userInfo.vue'
import Shortcut from './components/shortcut.vue'

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const route = useRoute()
const router = useRouter();
const siteInfo = computed(() => store.getters['user/siteInfo']);
const loginuser = computed(() => store.getters['user/loginuser']);
const userInfo = computed(() => store.getters['user/userInfo']);
const messgeData: any = ref({})
const isSearch: any = ref(false)
const module = computed(() => store.getters['user/config_talk'].navigation);
const setting = computed(() => store.getters['user/config_talk'].setting);
const mode = computed(() => store.getters['common/mode']);
const editPendant: any = ref(false)
const isMore: any = ref(false)

function getMessage() {
  store.dispatch('common/Fetch', {
    api: 'message',
  }).then((res: any) => {
    messgeData.value = res.result
  })
}

function init() {
  store.dispatch('common/Fetch', {
    api: 'Visited',
    data: {
      uid: getUid()
    }
  })

  let a = true
  if (route.path !== '/home') {
    store.dispatch('user/OtherUserInfo', {
      uid: getUid()
    }).then((res: any) => {
      if (res.status === '2') {
        router.push(`/status?u=${res.account}`)
        return
      }
      if (res.userInfo.account === "") {
        proxy.$hlj.message({
          type: "info",
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
  } else if (param === '/activity' || param === '/vote' || param === '/hao' || param === '/ranking' || param === '/recommend' || param === '/service' || param === '/contribute') {
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
  // writeNewStyle()
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

onMounted(() => {
  // getMessage()
  init()
  VueEvent.on("saveTheme", (data: any) => {
    editPendant.value = data
  })
})
</script>

<style lang="less" scoped>
.search-active {
  background: var(--module-background);
}

.user-login-btn {
  .user-login-wrap {
    display: none;
    top: 60px;
    right: 0;
    z-index: 100;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
    padding: 15px;
    width: 320px;
    height: auto;
    line-height: normal;

    .music-header {
      border-bottom: 1px solid var(--default-border);
      height: 40px;
      line-height: normal;
    }
  }

  &:hover {
    .user-login-wrap {
      background: var(--module-background);
      display: block;
    }
  }
}
</style>
