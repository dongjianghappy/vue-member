<template>
<div class="module-wrap mb15 w180 aside_nav sidebar_fixed">
  <div class="module-head head p20 font14" v-if="title">
    <span>{{title}}</span>
    <span class="right">
      <slot name="button"></slot>
    </span>
  </div>
  <div class="module-content p0 h500">
    <ul v-if="data.length">
      <li v-for="(item, index) in data" :key="index" @click="handleClick(item.path || item.value)" class="aside">
        <i class="iconfont" :class="`icon-${item.icon || 'dot'}`" v-if="hasIcon" /> {{item.name}} <span v-if="item.num">({{item.num}})</span>
      </li>
    </ul>
    <slot name="aside"></slot>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useRouter,
  onMounted,
  getUid
} from '@/utils'
export default defineComponent({
  name: 'AsideView',
  props: {
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
  },
  emits: ['route'],
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
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
      if (Number(param) || param === "0") {
        context.emit('route', param)
      } else {
        router.push(proxy.const.setUrl({
          uid: getUid(),
          query: param
        }))

        setTimeout(() => {
          props.render && props.render()
        }, 100)
      }
    }

    onMounted(init)

    return {
      handleClick
    }
  }
})
</script>
