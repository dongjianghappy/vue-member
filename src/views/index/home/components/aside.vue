<template>
<div class="module-wrap mb15 w180 aside_nav sidebar_fixed">
  <div class="module-head head bd-0 p15" v-if="title && loginuser.currentUser">
    <span class="right">
      <slot name="button"></slot>
    </span>
  </div>
  <div class="module-content p0" :style="{height: loginuser.currentUser ? '650px' : '650px'}">
    <ul v-if="data.length">
      <li v-for="(item, index) in data" :key="index" @click="handleClick(item.path || item.value)" class="aside">
        <i class="iconfont" :class="`icon-${item.icon || 'dot'}`" v-if="hasIcon" /> {{item.name}} <span v-if="item.num">({{item.num}})</span>
      </li>
    </ul>
    <slot name="aside"></slot>
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
  }
})
const emit: any = defineEmits(['route'])
const {
  proxy
}: any = getCurrentInstance();
const store = useStore()
const router = useRouter();
const loginuser = computed(() => store.getters['user/loginuser']);
// 初始化数据
function init() {
  proxy.$scroll.init({
    win: {
      el: window,
      y: 415,
      b: 80
    },
    doc: {
      el: 'sidebar_fixed'
    },
    type: "fixed"
  })
}

function handleClick(param: any) {
  if (Number(param) || param === "0") {
    emit('route', param)
  } else {
    if (props.isRoot) {
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: param
      }))
    } else {
      router.push(param)
    }

    setTimeout(() => {
      props.render && props.render()
    }, 100)
  }
}

onMounted(init)
</script>
