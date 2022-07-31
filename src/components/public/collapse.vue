<template>
<div class="aside">
  <div class="aside-head ptb10" style="background: #424568; margin-bottom: 1px" @click="handleShow">
    <i class="iconfont icon-arrow arrow " :class="collapse ? 'deg90' : ''"></i>
    <span>{{title}}</span>
  </div>
  <div class="aside-list ptb15 plr20" v-show="collapse">
    <slot></slot>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useRouter,
} from '@/utils'

export default defineComponent({
  name: 'v-Collapse',
  props: {
    title: {
      type: String,
      default: ""
    },
    tabs: {
      type: Array,
      default: []
    },
    icon: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "level"
    },
    className: {
      type: Object,
      default: () => {
        return {
          nav: '',
          con: ''
        }
      }
    },
    aaa: {
      type: Boolean,
      default: false
    },
    query: {
      type: Object,
      default: () => {
        return {}
      }
    },
    method: {
      type: String,
      default: "route"
    },
    isEmit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:index'],
  setup(props, context) {
    const router = useRouter();
    let collapse: any = ref(true)

    function handleShow(params: any) {
      collapse.value = !collapse.value
    }
    return {
      handleShow,
      collapse
    }
  }
})
</script>

<style scoped>
.current {
  color: #40a9ff !important;
}
</style>
