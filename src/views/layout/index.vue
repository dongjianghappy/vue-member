<template>
    <template v-if="!loginuser.currentUser && visitStatus !== '0'">
        <Auth :userInfo="loginuser" />
    </template>
    <template v-else>
        <template v-if="isThree === 'true'">
            <Three />
        </template>
        <template v-else>
            <div class="relative" v-if="isComplete">
                <Header />
                <div id="main" class="talk-main">
                    <div class="mask-background"></div>
                    <div class="relative" style="z-index: 9;">
                        <router-view />
                    </div>
                </div>
                <Index />
                <Fish v-if="module.fishEffects && !isSea" />
            </div>
            <div class="p15" v-else>正在加载...</div>
        </template>
    </template>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore,
  useRoute,
  useRouter,
  getUid,
  provide
} from '@/utils'
import Header from './components/header/index.vue'
import Index from './components/index.vue'
import Three from './components/three.vue'
import Fish from '../application/fish/index.vue'
import Auth from '../login/authority‌.vue'

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
const isSea = computed(() => store.getters['common/isSea']);
const isThree: any = computed(() => store.getters['user/isThree']);
const isComplete: any = ref(false)
const visitUser: any = ref({})
const visitStatus: any = ref('0')

provide('visitUser', visitUser)

async function init(){
 await  store.dispatch('user/Detect').then((res) => {
    if (res) {
      const {config, userInfo, privacy_setting} = res.result
      isComplete.value = true

      // 用户未登录
      if(!userInfo.account){
        router.push(`/default`)
        return
      }

      if (res.status === '2') {
        router.push(`/b/${res.account}`)
        return
      }
      
      // 未开通博客
      if (userInfo.weibo !== "1" || privacy_setting && privacy_setting.blog.close_blog === '0') {
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

  // 访问其他用户
  if (!loginuser.value.currentUser && getUid()) {
      store.dispatch('user/OtherUserInfo', {
        uid: getUid()
      }).then((res: any) => {
        visitUser.value = res.userInfo
        visitStatus.value = res.privacy_setting.blog.visit
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

      // 访客统计
      store.dispatch('common/Fetch', {
        api: 'Visited',
        data: {
          name: "伍乘",
          uid: getUid()
        }
      })
    }
}
init()
</script>
