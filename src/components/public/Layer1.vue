<template>
<div class="mask-wrap" style="z-index: 100000000">
  <div class="layer-button close absolute" style="line-height: 60px; z-index: 10000000;" @click="handleclick"><i class="iconfont icon-close font20 pointer" /></div>
  <Screen :dataList="dataList" className="" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch
} from 'vue'
import VueEvent from '@/utils/event'
import Screen from '../../views/recommend/recommend.vue'
export default defineComponent({
  name: 'v-Layer',
  components: {
    Screen
  },
  props: {
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: ""
    },
    getNeighbor: {
      type: Function,
      default: () => {
        return
      }
    },
    isShow: Boolean,
    hasInfo: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:isShow'],
  setup(props, context) {

    const keyStatus: any = ref(false)

    function handleclick() {
      document.getElementsByTagName("html")[0].style.overflow = ""
      keyStatus.value = false
      context.emit('update:isShow', false)
    }

    onMounted(() => {
      keyStatus.value = true
      document.onkeydown = (e: any) => {
        if (!keyStatus.value) {
          return
        }
        if (e.keyCode == '27') {
          handleclick()
        }
      }
    })

    return {
      handleclick
    }
  }
})
</script>

<style lang="less" scoped>
.mask-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 2, 6, .85);
  display: flex;
  min-height: 100vh;
  z-index: 100000;

  .layer-content {
    flex: 1;
    display: flex;
    flex-flow: column;
  }

  .layer-button {
    background: #645855;
    border-radius: 30px;
    width: 56px;
    height: 56px;
    line-height: 50px;

    &.close {
      top: 15px;
      left: 30px;
    }

    &.prev {
      top: 50%;
      left: 30px;
    }

    &.next {
      top: 50%;
      right: 30px;
    }
  }

  .layer-info {
    background: #fff;
    width: 350px
  }

  .picture-viewer {
    opacity: 0.5;

    &.picture-viewer-current {
      opacity: 1;
    }

    img {
      border-radius: 2px;
    }
  }
}
</style>
