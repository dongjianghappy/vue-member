<template>
<div class="integration-wrap absolute">
  <ul>
    <li :class="{current: current.id === item.id}" v-for="(item, index) in data" :key="index" @click="handleClick(item)">
      <i class="iconfont icon-dot" style="color: var(--default-font);" />
      {{item.name}}
    </li>
  </ul>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  computed,
  ref,
  useStore,
  useRouter
} from '@/utils'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter();
const loginuser = computed(() => store.getters['user/loginuser']);
const module = computed(() => store.getters['user/config_talk'].more);
const current: any = ref({})

function handleClick(param: any) {
  current.value = param
  props.data.forEach((item: any, index: any) => {
    item.Highlight = false
    if(item.id === param.id){
      item.Highlight = true
    }
  });
}
</script>

<style scoped>
.current{
  color: #f00;
}
</style>