<template>
<div class="module-wrap mb15 w180">
  <div class="module-content p0" :style="{height: loginuser.currentUser ? '650px' : '650px'}">
    <ul v-if="data.length">
      <li v-for="(item, index) in data" :key="index" @click="handleClick(item.path || item.value)" class="aside">
        <i class="iconfont" :class="`icon-${item.icon || 'dot'}`" v-if="hasIcon" /> {{item.name}} 
      </li>
    </ul>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  getCurrentInstance,
  useRouter,
  onMounted,
  getUid,
  computed,
  useStore
} from '@/utils'
import VueEvent from '@/utils/event'

const props: any = defineProps({
  title: {
    type: String,
    default: ""
  },
  data: {
    type: Array,
    default: () => {
      return []
    }
  },
  hasIcon: {
    type: Boolean,
    default: true
  },
  isRoot: {
    type: Boolean,
    default: true
  },
  render: {
    type: Function,
    default: () => {
      return
    }
  },
  query: {
    type: String,
    default: ""
  },
})
const emit: any = defineEmits(['route'])
const {
  proxy
}: any = getCurrentInstance();
const store = useStore()
const router = useRouter();
const loginuser: any = computed(() => store.getters['user/loginuser']);


function handleClick(param: any) {
  
  if(param === '/schedule_timeline'){
    router.push(param + `?${props.query}`)
  }else{
    router.push(proxy.const.setUrl({
      uid: getUid(),
      query: param + props.query
    }))
  }

  setTimeout(() => {
    props.render && props.render()
  }, 100)
}
</script>
