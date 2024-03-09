<template>
<span @mouseenter="handleclick" @mouseleave="handleleave">
  <slot></slot>
</span>
<transition>
  <popover v-model:isShow="isShow" :styles="style" v-if="isShow">
    <div v-html="content"></div>
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
      default: "top"
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
      context.emit('onClick', isShow.value)

      switch (props.arrow) {
        case 'top':
          style._left = left
          style._top = top - 16
          style.offset = "top"
          break;
        case 'right':
          style._top = top
          style._left = left + h + 8
          style.offset = "right"
          break;
        case 'bottom':
          style._left = left
          style._top = top + h + 8
          style.offset = "bottom"
          break;
        case 'left':
          style._top = top
          style._left = left - 16
          style.offset = "left"
          break;

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
