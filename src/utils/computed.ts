import {computed, useStore} from '@/utils'
const store = useStore();

const loginuser = computed(() => store.getters['user/loginuser']);

export {
  loginuser
};