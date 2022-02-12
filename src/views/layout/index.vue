<template>
<div class="relative" v-if="isLogin">
  <v-header />
  <div id="main" style="padding: 80px 0 0 0;" :style="userInfo.theme">
    <router-view />
  </div>
  <!-- <v-footer /> -->
  <Player />
  <Thme />
  <v-gotop />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  useStore,
  useRouter
} from '@/utils'
import Thme from '@/views/thme/index.vue'
import Player from '@/components/player/index.vue'

export default defineComponent({
  name: 'IndexView ',
  components: {
    Thme,
    Player
  },
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const userInfo = computed(() => store.getters['common/userInfo']);
    const isLogin: any = ref(false)

    store.dispatch('common/Detect').then((res) => {
      if (res) {
        isLogin.value = true
      } else {
        router.push('/login')
      }
    })

    return {
      userInfo,
      isLogin
    }
  }
})
</script>
