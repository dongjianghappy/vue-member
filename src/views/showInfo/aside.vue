<template>
<div class="module-wrap mb15 w280 aside_nav sidebar_fixed">
  <div class="module-head head bd-0 p15" v-if="title">
    <span class="font22">{{title}}</span>
    <span class="right">
      <slot name="button"></slot>
    </span>
  </div>
  <div class="module-content p0 h500">
   <UserInfo :userInfo="userInfo" />
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
import UserInfo from '../index/components/module/userInfo.vue'
export default defineComponent({
  name: 'AsideView',
  components: {
    UserInfo
  },
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
