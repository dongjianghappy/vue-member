<template>
<div class="home">
  <TalkSend v-if="loginuser.account" />
  <div class="module-wrap mb10" v-else>
    <div class="module-content send_info p0" style="overflow: inherit;">
      <!-- 这里需要模块控制，暂时先注释 -->
      <v-scrolltext />
    </div>
  </div>
  <div class="mb10" v-if="module && module.slideshow">
    <v-slideshow />
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
const main: any = ref(null)


function init(param: any = {}) {
  return main.value.init(param)
}
</script>
