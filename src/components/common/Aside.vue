<template>
<div class="module-wrap mb15 w180" :class="{'aside_nav sidebar_fixed' :isFixed}">
  <div class="module-head head bd-0 p15" v-if="title">
    <span class="font22">{{title}}</span>
    <span class="right mt5">
      <slot name="button"></slot>
    </span>
  </div>
  <div class="module-content p0" :style="{height: loginuser.currentUser ? '650px' : '650px'}">
    <ul v-if="data.length">
      <li v-for="(item, index) in data" :key="index" @click="handleClick(item.path || item.value)" class="aside">
        <i class="iconfont" :class="`icon-${item.icon || 'dot'}`" v-if="hasIcon" /> {{item.name}} 
        <span v-if="item.num">({{item.num}})</span>
        <v-flag :data="item" v-if="item.flag" />
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
  isFixed: {
    type: Boolean,
    default: true
  }
})
const emit: any = defineEmits(['route'])
const {
  proxy
}: any = getCurrentInstance();
const store = useStore()
const router = useRouter();
const loginuser: any = computed(() => store.getters['user/loginuser']);

function init() {
  if(!props.isFixed){
    return
  }
  proxy.$scroll.init({
    win: {
      el: window,
      y: document.getElementsByClassName("space-name").length > 0 ? document.getElementsByClassName("space-name")[0].clientHeight : 0,
      b: 80
    },
    doc: {
      el: 'sidebar_fixed'
    },
    type: "fixed"
  })
}

function handleClick(param: any) {
  let asideArr = ['/', '?mod=concern', '?mod=friend', '/talk', '/album', '/my_video', '/journal', '/application?mod=feedback&item=tome', '/schedule']
  if (!loginuser.value.account && asideArr.indexOf(param) > -1) {
    VueEvent.emit("login");
    return
  }
  if (Number(param) || param === "0") {
    emit('route', param)
  } else {
    if (props.isRoot) {
      let arr = ['/recommend', '/camera', '/vlog']
      if (arr.indexOf(param) > -1) {
        router.push(param)
      } else {
        router.push(proxy.const.setUrl({
          uid: getUid(),
          query: param
        }))
      }

    } else {
      router.push(param)
    }

    setTimeout(() => {
      props.render && props.render()
    }, 100)
  }
}

onMounted(() => {
  init()
})
</script>
