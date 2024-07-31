<template>
<transition>
  <div class="drawer-wrap align_left" :class="{'drawer-open': show}" style="top: 0">
    <v-mask v-show="show" />
    <template v-if="show">
      <div class="layer relative" @click.stop style=" background: #191919; left: 534.5px; display: block; z-index: 9001; opacity: 1;" :style="{width: `${style.width || 450}px`, height: `${style.height || 380}px`, top: window.top, left: window.left}">
        <span class="layer-close" @click="handleCancel" style=" top: -35px; right: -35px;"><i class="iconfont icon-close"></i></span>
        <slot name="content"></slot>
      </div>
    </template>
  </div>
</transition>
</template>

<script setup lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useStore
} from '@/utils'

const props: any = defineProps({
  style: {
    type: Object,
    default: () => {
      return {
        width: "450",
        height: "380"
      }
    }
  },
  show: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const store = useStore();
const window = {
  top: `${document.documentElement.clientHeight/2-parseInt(props.style.height)/2}px`,
  left: `${document.documentElement.clientWidth/2-parseInt(props.style.width)/2}px`
}
const isShow = ref(props.show)
</script>
