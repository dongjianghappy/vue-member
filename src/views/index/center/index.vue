<template>
<div class="home">
  <TalkSend v-if="loginuser.account" />
  <div class="module-wrap mb10" v-else>
    <div class="module-content send_info p0" style="overflow: inherit;">
      <v-scrolltext :dataList="announcement" />
    </div>
  </div>
  <div class="mb10" v-if="module && module.slideshow && Object.keys(slideshow).length > 0">
    <v-slideshow :data="slideshow" />
  </div>
  <Main ref="main" />
</div>
</template>

<script setup lang="ts">
import {
  defineExpose,
  computed,
  useStore,
  ref
} from '@/utils'
import TalkSend from '../components/module/talk_send.vue'
import Main from './main.vue'

defineExpose({
  init
})
const store = useStore();
const loginuser = computed(() => store.getters['user/loginuser']);
const module = computed(() => store.getters['user/config_talk'].personal_center);
const announcement = computed(() => store.getters['common/announcement']);
const main: any = ref(null)
const slideshow = computed(() => {
  let slides: any = store.getters['common/slideshow']
  let arr: any = {}
  for (let key in slides) {
    if (key === 'slideshow_11') {
      arr = slides[key]
    }
  }
  return arr
});

function init(param: any = {}) {
  return main.value.init(param)
}
</script>
