<template>
<div class="relative" v-if="isLogin">
  <Header />
  <div id="main" style="padding: 80px 0 0 0;" :style="userInfo.theme && userInfo.theme.theme_background">
    <router-view />
  </div>
  <!-- <Footer /> -->
  <Player />
  <Thme v-if="currentUser && module.theme" />
  <v-gotop />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  useStore,
  useRouter,
  useRoute
} from '@/utils'
import Header from './components/header/index.vue'
import Footer from './components/footer/index.vue'
import Thme from '@/views/thme/index.vue'
import Player from '@/components/player/index.vue'

export default defineComponent({
  name: 'IndexView ',
  components: {
    Header,
    Footer,
    Thme,
    Player
  },
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    
    // 存储token值
    if (route.query.token) {
      document.cookie = `token=${route.query.token};path=/`
      window.location.href = window.location.origin + window.location.pathname
    }

    const module = computed(() => store.getters['user/config_talk'].personal_center);
    const userInfo = computed(() => store.getters['user/userInfo']);
    const currentUser = computed(() => store.getters['user/currentUser']);
    const isLogin: any = ref(false)

    store.dispatch('user/Detect').then((res) => {
      debugger
      if (res) {
        isLogin.value = true
      } else {
        // window.location.href = 'http://www.yunxi10.com/login.html'
      }
    })

    return {
      module,
      isLogin,
      userInfo,
      currentUser
    }
  }
})
</script>
