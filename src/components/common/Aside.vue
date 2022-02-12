<template>
<div class="module-wrap mb15 w180 aside_nav sidebar_fixed">
  <div class="module-head head p20 font22" v-if="title">{{title}}
    <slot name="button">

    </slot>
  </div>
  <div class="module-content p0 h500">
    <ul>
      <li v-for="(item, index) in data" :key="index" @click="handleclick(item.path)" class="aside">
        <i class="iconfont font20" :class="[item.icon || 'icon-dot']"></i> {{item.name}} <span v-if="item.num">({{item.num}})</span>
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
  computed,
  useStore,
  useRouter,
  useRoute,
  onMounted
} from '@/utils'
import {
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
      type: Object,
      default: () => {
        return
      }
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
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const loginuser = computed(() => store.getters['common/loginuser']);
    const groups = computed(() => store.getters['common/groups']);

    function init() {
      debugger
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

    function handleclick(param: any) {
      if (Number(param) || param === "0") {
        context.emit('route', param)
      } else {
        router.push(proxy.const.setUrl({
          uid: getUid(),
          query: param
        }))

        props.render && props.render()
      }
    }

    onMounted(init)

    return {
      handleclick,
      groups
    }
  }
})
</script>
