<template>
<div class="home">
  <Main ref="main" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useStore,
  ref
} from '@/utils'
import TalkSend from '../components/module/talk_send.vue'
import Main from './main.vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    TalkSend,
    Main
  },
  setup(props, context) {
    const store = useStore();
    const loginuser = computed(() => store.getters['user/loginuser']);
    const userInfo = computed(() => store.getters['user/userInfo']);
    const module = computed(() => store.getters['user/config_talk'].personal_center);
    const main: any = ref(null)
    const slideshow = computed(() => {
      let slides: any = store.getters['common/slideshow']
      let arr: any = {}
      for (let key in slides) {
        if (key === 'slideshow_11') {
          arr = slides[key]
        }
      }
      debugger
      return arr
    });

    function init(param: any = {}) {
      debugger
      return main.value.init(param)
    }

    return {
      main,
      loginuser,
      userInfo,
      module,
      slideshow,
      init
    }
  },
})
</script>
