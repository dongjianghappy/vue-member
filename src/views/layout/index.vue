<template>
<div class="relative" v-if="isComplete">
  <Header />
  <v-message v-if="loginMessage == 'true'" />
  <div id="main" class="talk-main" style="padding: 80px 0 0 0; overflow: hidden;">
    <div class="mask-background"></div>
    <div class="relative" style="z-index: 9;">
      <router-view />
    </div>
  </div>
  <Index :loginuser="loginuser" :module="module" />
</div>
<div class="p15" v-else>正在加载...</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRoute,
  useRouter,
  computed,
  ref
} from '@/utils'
import Index from './components/index.vue'
import Header from './components/header/index.vue'
import Footer from './components/footer/index.vue'

export default defineComponent({
  name: 'IndexView ',
  components: {
    Index,
    Header,
    Footer
  },
  setup(props, context) {
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
    const userInfo = computed(() => store.getters['user/userInfo']);
    const isComplete: any = ref(false)
    const loginMessage: any = sessionStorage.getItem('loginMessage');

    store.dispatch('user/Detect').then((res) => {
      if (res) {
        isComplete.value = true
        if (res.status === '2') {
          router.push(`/b/${res.account}`)
          return
        }
        // if (res.userInfo.weibo !== "1") {
        //   router.push(`/open`)
        // } else if (res.config.talk === undefined) {
        //   router.push(`/site`)
        // } else {
        //   isComplete.value = true
        // }
      }
    })

    // if (module.slideshow) {
    store.dispatch('common/Fetch', {
      api: "slideBanner",
      state: 'slideshow',
      data: {
        channel: 1000
      }
    })
    // }

    store.dispatch('common/Fetch', {
      api: "announcement",
      state: "announcement"
    })

    return {
      module,
      loginuser,
      userInfo,
      isComplete,
      loginMessage
    }
  }
})
</script>

<style scoped>
.talk-main {
  background: var(--page-background);
  background-size: 100% 100%;
}

.mask-background {
  background: rgba(0, 0, 0, var(--page-transparent));
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0
}
</style>
