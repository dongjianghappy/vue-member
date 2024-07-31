<template>
<div id="aside-box" style="width: 280px">
  <UserInfo v-if="loginuser.account" />
  <RecommendUser />
  <Footer id="ranking" />
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
import UserInfo from './userInfo.vue'
import RecommendUser from '../../views/index/components/module/recommendUser.vue'
import Footer from '@/views/layout/components/footer/footer.vue'


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

</script>
