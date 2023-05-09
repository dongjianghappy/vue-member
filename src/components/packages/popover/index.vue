<template>
<!-- @mouseover="handleclick" @mouseleave="handleleave"-->
<span @click="handleclick" v-html="content" style="display: inline-block" :class="keys">
</span>
<transition>
  <popover v-model:isShow="isShow" :styles="style" v-if="isShow">
    <slot></slot>
  </popover>
</transition>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  reactive,
  computed
} from 'vue'
import {
  useStore
} from 'vuex'
import popover from './popover.vue'
import VueEvent from '@/utils/event'
export default defineComponent({
  name: 'v-Search',
  components: {
    popover
  },
  props: {
    keys: {
      type: String,
      default: ""
    },
    // 展示方向有tb、lr
    arrow: {
      type: String,
      default: "tb"
    },
    // 箭头移动位置
    move: {
      type: Number,
      default: 0
    },
    // 偏移、固定设置箭头展示方向有top、right、bottom、left
    offset: {
      type: String,
      default: ""
    },
    // 类型、是提示还是可点击操作
    type: {
      type: String,
      default: "click"
    },
    // 按钮为包含HTML元素
    content: {
      type: String,
      default: ""
    },
    getData: {
      type: Function
    }
  },
  mounted() {
    // document.addEventListener("click", this.close);
    VueEvent.on("selectColor", (data: any) => {
      // this.close
    });
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const isShow: any = ref(false)
    const tripsStatus = computed(() => store.getters['common/tripsStatus']);
    const style: any = reactive({
      offset: "",
      move: props.move,
      _top: 0,
      _left: 0,
      h: "0",
      w: "0"
    })

    function handleclick(e: any) {
      isShow.value = !isShow.value
      const doc = document.documentElement
      const el = e.currentTarget;
      const {
        clientWidth: _w,
        clientHeight: _h
      } = doc
      const {
        offsetWidth: w,
        offsetHeight: h,
        offsetTop: top,
        offsetLeft: left
      } = el
      style.w = w
      style.h = h

      if (props.arrow === 'lr') {
        style._top = top
        if (_w / 2 - e.x <= 0) {
          if (props.offset === 'right') {
            style._left = left + h + 8
            style.offset = "right"
          } else {
            style._left = left - 16
            style.offset = "left"
          }
        } else {
          if (props.offset === 'left') {
            style._left = left - 16
            style.offset = "left"
          } else {
            style._left = left + h + 8
            style.offset = "right"
          }
        }
      } else {
        style._left = left
        if (_h / 2 - e.y <= 0) {
          if (props.offset === 'bottom') {
            style._top = top + h + 8
            style.offset = "bottom"
          } else {
            style._top = top - 16
            style.offset = "top"
          }
        } else {
          if (props.offset === 'top') {
            style._top = top - 16
            style.offset = "top"
          } else {
            style._top = top + h + 8
            style.offset = "bottom"
          }
        }
      }
      props.getData && props.getData()
    }

    function handleover(e: any) {
      if (props.type === 'click') {
        return
      }
      handleclick(e)
    }

    function handleleave(e: any) {
      if (props.type !== 'click') {
        isShow.value = false
      } else {
        // store.dispatch('common/TripsStatus', false)
        // setTimeout(()=>{
        //   if(tripsStatus.value === false){
        //     isShow.value = false
        //   }
        // },200)
      }
    }

    function close(e: any) {
      if ((e.target.className && e.target.className.indexOf && e.target.className.indexOf(props.keys) > -1) || e.target.parentNode.className.indexOf(props.keys) > -1) {
        return
      }
      let list = document.getElementsByClassName("popover_wrap");
      if (list && list[0] && !list[0].contains(e.target)) {
        isShow.value = false
      }

    }
    return {
      handleclick,
      handleover,
      handleleave,
      isShow,
      style,
      tripsStatus,
      close
    }
  }
})
</script>
