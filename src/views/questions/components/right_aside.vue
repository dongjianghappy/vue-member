<template>
<div id="aside-box" style="width: 280px; height: 500px;">
  <Ask />
  <Recommend />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted
} from '@/utils'
import Recommend from './recommend.vue'
import Ask from './asks.vue'


export default defineComponent({
  name: 'RightView',
  components: {
    Ask,
   Recommend
  },
  props: {
    module: {
      type: Object,
      default: () => {
        return {}
      }
    },
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    },
  },
  setup() {
    const {
      proxy
    }: any = getCurrentInstance();

    onMounted(() => {
      proxy.$scroll.init({
        win: {
          el: window,
          y: 0,
          id: 'ranking',
          b: 80
        },
        doc: {
          p: 'aside-box',
          el: 'aside_fixed'
        },
        type: "sideFixed"
      })
    })
  }
})
</script>
