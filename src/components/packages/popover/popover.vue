<template>
  <!-- @mouseover="setStatus"
       @mouseleave="handleclick" -->
  <div id="tooltip2"
       class="info-box"
       style="display: block;"
       :style="boxObject">
    <i :class="{'bottom-arrow-out': style.isTop, 'left-arrow-out': style.isRight, 'top-arrow-out': style.isBottom, 'right-arrow-out': style.isLeft}"
       :style="styleObject"></i>
    <i :class="{'bottom-arrow-in': style.isTop, 'left-arrow-in': style.isRight, 'top-arrow-in': style.isBottom, 'right-arrow-in': style.isLeft}"
       :style="styleObject"></i>
    <div class="popover_wrap">
      <div class="popover_wrap">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref, reactive, computed } from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
  name: 'v-Search',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },    
    left: {
      type: String,
      default: "10px"
    },
    styles: {
      type: Object,
      default: () => {return {
        offset: "",
        left: "0",
        top: "0",
        h: "0",
        w: "0"        
      }}
    }
  },
  
  emits: ['update:isShow'],
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const style: any = reactive({
      isTop: false,
      isRight: false,
      isBottom: false,
      isLeft: false,
      _top: 0,
      _left: 0,
      w: "0",
      h: "0",
      top: "0",
      left: "0"
    })

    let boxObject: any = reactive({})
    let styleObject: any = reactive({})
    style.isTop = computed(() => props.styles.offset === 'top')
    style.isRight = computed(() => props.styles.offset === 'right')
    style.isBottom = computed(() => props.styles.offset === 'bottom')
    style.isLeft = computed(() => props.styles.offset === 'left')

    boxObject = computed(() =>{
      if(props.styles.offset === 'top' || props.styles.offset === 'bottom'){
        if(props.styles.offset === 'top'){
          return {
            top: props.styles._top-style.h +"px",
            left: props.styles._left + props.styles.move + "px"
          }   
        }else{
          return {
            top: props.styles._top +"px",
            left: props.styles._left + props.styles.move + "px"
          }   
        }
      }else{
        if(props.styles.offset === 'left'){
          return {
            top: props.styles._top  + props.styles.move +"px",
            left: props.styles._left -style.w+"px"
          }   
        }else{
          return {
            top: props.styles._top  + props.styles.move +"px",
            left: props.styles._left+"px"
          }   
        }
      }
    })

    styleObject = computed(() =>{
      if(props.styles.offset === 'top' || props.styles.offset === 'bottom'){
        return {
          left: Math.abs(props.styles.move)+props.styles.w/2-8+"px"
        }
      }else{
        return {
          top: Math.abs(props.styles.move)+props.styles.h/2-8+"px"
        }   
      }
    })

    function init(){
      let _obj: any= document.getElementById("tooltip2");
      const {offsetWidth : w, offsetHeight: h, offsetTop: _top, offsetLeft: _left} = _obj
      style._top = _top
      style._left = _left   
      style.w = w
      style.h = h   
    }

    function handleclick(){
      context.emit('update:isShow', false)
    }
    
    // 设置全局状态
    function setStatus(){
      store.dispatch('common/TripsStatus', true)
    }
    onMounted(init)
    return {
      handleclick,
      style,
      boxObject,
      styleObject,
      setStatus
    }
  }
})
</script>
