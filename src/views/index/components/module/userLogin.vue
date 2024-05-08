<template>
<div class="module-wrap">
  <div class="module-content user-photos p0">
    <div class="user-head" :style="`background: url(${userInfo.head_background}) no-repeat; background-size: cover`">
      <div class="photos ">
        <img src="http://www.yunxi10.com/source/public/images/head_normal_100.png" />
      </div>
    </div>
    <div class="user-info">
      <div class="name-box">
        <v-login title="立即登录" />
      </div>
      <div class="mt15 mb25 font18 align_center">{{siteInfo.talk_brand}}</div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useRouter,
  computed,
  useStore
} from '@/utils'
import Mood from '../mood.vue'

export default defineComponent({
  name: 'UserInfoView',
  components: {
    Mood
  },
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const store = useStore()
    const router = useRouter()

    const siteInfo = computed(() => store.getters['user/siteInfo']);
    function handleClick() {
      router.push('/login')
    }
    return {
      siteInfo,
      handleClick
    }
  },
})
</script>

<style lang="less" scoped>
.user-content {
  background: var(--color-primary-background);
  line-height: 30px;

  &:after {
    content: "દ ᵕ̈ ૩ ☁️ ՞•🐽•՞ ᴴᴬᵛᴱ ᴬ ᴳᴼᴼᴰ ᵀᴵᴹᴱ ˃̶͈🐽˂̶͈ 、 ʚ🐷ɞ  ʘᴗʘ 、˙Ꙫ˙、📷 ૮꒰ ˶• ༝ ◡̈ ᶜᵘᵗᵉ ✐.ɴɪᴄᴇ ᴅᴀʏ 〰︎ •˶꒱ა ʚ🐷ɞ 、՞•🐽•՞、 📧・🌷・🍒・🍨 ✨💬  (*☻-☻*)"
  }
}
</style>
