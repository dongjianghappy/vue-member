<template>
<div class="module-wrap mb15 w180 aside_nav sidebar_fixed">
  <div class="module-head head bd-0 p15" v-if="title">
    <span class="font22">{{title}}</span>
    <span class="right">
      <slot name="button"></slot>
    </span>
  </div>
  <div class="module-content p0">
    <ul v-if="data.length">
      <li v-for="(item, index) in data" :key="index" @click="handleClick(item.id)" class="aside">
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
  getCurrentInstance,
  useRouter,
  onMounted,
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
const router = useRouter();
// 初始化数据
function init() {
  proxy.$scroll.init({
    win: {
      el: window,
      y: 0,
      b: 80
    },
    doc: {
      el: 'sidebar_fixed'
    },
    type: "fixed"
  })
}

function handleClick(param: any) {
  if (param === "") {
    router.push(window.location.pathname)
  } else {
    router.push(`${window.location.pathname}?mod=${param}`)
  }

  props.render(param)

}

onMounted(init)
</script>
