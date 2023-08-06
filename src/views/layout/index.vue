<template>
<div class="relative" v-if="isLogin">
   <!-- <v-sitesearch /> -->
  <Header />
  <div id="main" style="padding: 80px 0 0 0;" :style="userInfo.theme && userInfo.theme.theme_background">
    <router-view />
  </div>
  <Footer />
  <Thme v-if="currentUser && module && module.theme" />
  <v-gotop />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRoute,
  computed,
  ref
} from '@/utils'
import Header from './components/header/index.vue'
import Footer from './components/footer/index.vue'
import Thme from '@/views/thme/index.vue'

export default defineComponent({
  name: 'IndexView ',
  components: {
    Header,
    Footer,
    Thme,
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();

    // 如果url带有token时就存储token，并且从新跳转
    if (route.query.token) {
      document.cookie = `token=${route.query.token};path=/`
      window.location.href = window.location.origin + window.location.pathname
    }

    const module = computed(() => store.getters['user/config_talk'].personal_center);
    const userInfo = computed(() => store.getters['user/userInfo']);
    const currentUser = computed(() => store.getters['user/currentUser']);
    const isLogin: any = ref(false)

    store.dispatch('user/Detect').then((res) => {
      if (res) {
        isLogin.value = true
      } else {

      }
    })
    
    store.dispatch('common/Fetch', {
      api: "slideBanner",
      state: 'slideshow',
      data: {
        channel: 1000
      }
    })

    

    store.dispatch('common/Fetch', {
      api: "announcement",
      state: "announcement"
    })

    return {
      module,
      userInfo,
      currentUser,
      isLogin
    }
  }
})
</script>
