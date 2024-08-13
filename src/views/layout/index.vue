<template>
<div class="relative" v-if="isComplete">
  <Header />
  <div id="main" class="talk-main">
    <div class="mask-background"></div>
    <div class="relative" style="z-index: 9;">
      <router-view />
    </div>
  </div>
  <Index />
</div>
<div class="p15" v-else>正在加载...</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  computed,
  ref,
  useStore,
  useRoute,
  useRouter
} from '@/utils'
import Header from './components/header/index.vue'
import Index from './components/index.vue'

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const route = useRoute();
const router = useRouter();

// 如果url带有token时就存储token，并且从新跳转
if (route.query.token) {
  document.cookie = `token=${route.query.token};path=/`
  window.location.href = window.location.origin + window.location.pathname
  sessionStorage.setItem("loginMessage", 'true')
}

const module: any = computed(() => store.getters['user/config_talk'].personal_center);
const loginuser = computed(() => store.getters['user/loginuser']);
const isComplete: any = ref(false)


store.dispatch('user/Detect').then((res) => {
  if (res) {
    const {config, userInfo} = res.result
    isComplete.value = true
    if (res.status === '2') {
      router.push(`/b/${res.account}`)
      return
    }
    if (userInfo.weibo !== "1") {
      // router.push(`/open`)
    } else if (config.talk === undefined) {
      router.push(`/site`)
    }else{
      if (res.ifSuccess == '1' && userInfo.account) {
        let timer: any = ""
        timer = setInterval(() => {
          store.dispatch('common/Fetch', {
            api: "online"
          }).then((res: any) => {
            if (res.result.online == 0) {
              clearInterval(timer)
              proxy.$hlj.message({
                type: 'tips',
                msg: "登录超时，请重新登录"
              })
            }
          })
        }, 60000)
      }
    }
    
  }
})

// 幻灯片
// if (module.slideshow) {
store.dispatch('common/Fetch', {
  api: "slideBanner",
  state: 'slideshow',
  data: {
    channel: 1000
  }
})
// }

// 公告
store.dispatch('common/Fetch', {
  api: "announcement",
  state: "announcement"
})
</script>
