<template>
<div class="banner" style="border-radius: 4px; overflow: hidden;" :style="{width: `${data.attr.width}px`}">
  <div class="_container" :style="{
        width: `${data.attr.width}px`,
        height: `${data.attr.height}px`,
        left: '50%',
        marginLeft: `${-620 / 2}px`
      }">
    <div ref="banner" class="imgcon">
      <ul style="transition: top 0.3s ease;">
        <li v-for="(item, index) in data.value" :key="index" :style="`width:${data.attr.width}px; height:${data.attr.height}px`">
          <img :src="item.image" alt="">
        </li>
      </ul>
    </div>
  </div>
  <!-- 焦点 -->
  <div class="ctr" :style="{right: `${data.attr.focus_right}px`, bottom: `${data.attr.focus_bottom}px`}" v-if="data.value.length > 1">
    <ul class="iconlist">
      <li v-for="(item, i) in data.value" :key="i" :style="{background: i==index ? 'var(--color-primary)' : '#eee'}" @mousemove="handleHover(i)" @mouseout="time"></li>
    </ul>
  </div>
</div>
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
    }
  },
  setup(props, context) {
    const store = useStore();
    let timer: any = ref("") //时间变量
    let index: any = ref(0) //播放指针
    let banner: any = ref(null)

    function init() {
      banner = banner.value
      let data: any = props.data.attr

      let imgul = banner.children
      let imgli = banner.children[0].children

      imgul[0].style.width = `${(data.slidetype == 'rl') || (data.slidetype == 'lr') ? data.width * 4 : data.width}px`
      imgul[0].style.height = `${data.slidetype == 0 ? data.height : data.height * 4}px`
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
      const imgli: any = banner.children[0].children[0]
      let data: any = props.data.attr
      var imgwidth = parseInt(imgli.style.width)
      var imgheight = parseInt(imgli.style.height)
      switch (data.slidetype) {
        case 'rl' || 'lr':
          imgul.style.left = `${-imgwidth * index}px`
          break
        case 'bt' || 'tb':
          imgul.style.top = `${-imgheight * index}px`
          break
      }
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
