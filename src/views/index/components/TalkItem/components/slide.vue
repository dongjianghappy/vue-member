<template>
<transition>
  <div class="video-wrap" :style="`height: ${style.height}`">
    <div class="background-mask" v-if="mask">
      <img :src="data[0]">
    </div>
    <div class="relative" :style="`height: ${style.height}`">
      <div class="_container" :style="style">
        <div ref="banner" class="imgcon">
          <ul style="transition: left 0.3s;">
            <li style="background: rgba(34, 34, 34, 0.75); overflow: hidden;" v-for="(item, index) in data" :key="index" :style="style">
              <img :src="item.replace(/thumb/g, 'view')">
            </li>
          </ul>
        </div>
      </div>
      <div class="number absolute">
        {{`${index+1}/${data.length}`}}
      </div>
      <div class="absolute" style="z-index: 100" :style="{width: '100%', left: `0px`, bottom: `10px`}" v-if="data.length > 1">
        <ul class="align_center">
          <li v-for="(item, i) in data" :key="i" class="radius-4" style="display: inline-block; margin-left:1px; margin-right: 1px; width: 10px; height: 2px;" :style="{background: i==index ? '#fff' : '#999'}" @mousemove="handleHover(i)" @mouseout="time"></li>
        </ul>
      </div>
    </div>
  </div>
</transition>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  computed,
  onMounted,
  ref
} from '@/utils'

export default defineComponent({
  name: 'HomeViewr',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    number: {
      type: Number,
      default: 0
    },
    style: {
      type: Object,
      default: () => {
        return {
          width: '250px',
          height: '400px'
        }
      }
    },
    mask: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    const store = useStore();
    let timer: any = ref("") //时间变量
    let index: any = ref(0) //播放指针
    let banner: any = ref(null)

    function init() {
      banner = banner.value
      let imgul = banner.children
      imgul[0].style.width = `${props.data.length * parseInt(props.style.width)}px`
      debugger
      time() //自动播放
    }

    function time() {
      let imgli = banner.children[0].children
      timer = setInterval(function () {
        if (index.value == imgli.length - 1) {
          index.value = 0
        } else {
          index.value++
        }
        imgscroll(index.value)
      }, 3000)
    }

    //滑动
    function imgscroll(index: any) {
      const imgul: any = banner.children[0]
      const imgli: any = banner.children[0].children[index]
      var imgwidth = parseInt(imgli.style.width)
      const container: any = banner.parentNode
      let _height = container.clientHeight
      if (_height - imgli.children[0].clientHeight > 0) {
        if (_height - imgli.children[0].clientHeight > 50) {
          let padding = `${(_height - imgli.children[0].clientHeight)/2}px`
          imgli.style.paddingTop = padding
          imgli.style.paddingBottom = padding
        } else {
          imgli.children[0].style.height = `${_height}px`
        }
      } else {
        if (imgli.children[0].clientWidth > props.style.width) {
          imgli.children[0].style.height = `${_height}px`
        } else {
          imgli.children[0].style.width = `${props.style.width}px`
          imgli.children[0].style.height = `auto`
          let margin = `-${(imgli.children[0].clientHeight-_height)/2}px`
          imgli.style.paddingTop = margin
        }
      }

      imgul.style.left = `${-imgwidth * index}px`
    }

    function handleHover(param: any) {
      clearInterval(timer)
      index.value = param
      imgscroll(param)
    }
    onMounted(init)

    return {
      banner,
      index,
      handleHover,
      time
    }
  },
})
</script>

<style scoped>
.number {
  background: rgba(0, 0, 0, 0.25);
  top: 10px;
  right: 10px;
  border-radius: 50px;
  padding: 5px;
  width: 50px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  line-height: normal;
}
</style>
