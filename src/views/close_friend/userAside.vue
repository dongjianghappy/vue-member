<template>
    <div id="aside-box" style="width: 280px">
        <UserInfo />
    </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  onMounted,
  computed,
  useStore
} from '@/utils'
import UserInfo from './components/userInfo.vue'

const props: any = defineProps({
  render: {
    type: Function,
    default: () => {
      return
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore()
const module = computed(() => store.getters['user/config_talk'].personal_center || {});
const loginuser = computed(() => store.getters['user/loginuser']);
onMounted(() => {
  proxy.$scroll.init({
    win: {
      el: window,
      y: 0,
      id: 'ranking',
      b: 80
    },
    doc: {
      p: 'aside-box',
      el: 'aside_fixed'
    },
    type: "sideFixed"
  })
})
</script>
