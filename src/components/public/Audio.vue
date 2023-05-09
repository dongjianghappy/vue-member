<template>
<div>
  <i class="iconfont icon-music absolute cl-white" @click="handlePlay" style=" background: rgba(0, 0, 0, 0.3); border-radius: 2px; right: 0px; bottom: 0px; padding: 2px; z-index: 1;" v-if="hasMusic"></i>
  <i class="iconfont listen" :class="`icon-${isplay ? 'audio' : 'listen'}`" @click="handlePlay" v-else></i>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted
} from '@/utils'
import VueEvent from '@/utils/event'
export default defineComponent({
  name: 'v-Audio',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    hasMusic: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    function handlePlay(e: any, index: any, status: any) {
      VueEvent.emit("musicPley", props.data);
    }
    onMounted(() => {
      VueEvent.emit("pley", props.data);
    })
    return {
      handlePlay
    }
  }
})
</script>
