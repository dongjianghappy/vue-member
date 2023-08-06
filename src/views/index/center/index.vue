<template>
<div class="home">
  <TalkSend />
  <div class="mb10"><v-slideshow :data="slideshow" v-if="module.slideshow && Object.keys(slideshow).length > 0" /></div>
  <Main />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useStore,
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
    const module = computed(() => store.getters['user/config_talk'].personal_center);
    
    return {
      module
    }
  },
})
</script>
