<template>
<div class="home">
  <Main ref="main" />
</div>
</template>

<script setup lang="ts">
import {
  computed,
  useStore,
  ref
} from '@/utils'
import TalkSend from '../components/module/talk_send.vue'
import Main from './main.vue'
const store = useStore();
const userInfo = computed(() => store.getters['user/userInfo']);
const module = computed(() => store.getters['user/config_talk'].personal_center);
const main: any = ref(null)
function init(param: any = {}) {
  return main.value.init(param)
}
</script>
