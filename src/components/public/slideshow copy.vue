<template>
<div class="banner" :style="{width: `${slideshow.attr.width}px`}">
  <div class="_container" :style="{
        width: `620px`,
        height: `80px`,
        left: '50%',
        marginLeft: `${-620 / 2}px`
      }">
    <div ref="banner" class="imgcon">
      <ul style="transition: top 0.3s ease;">
        <li v-for="(item, index) in slideshow.value" :key="index" :style="`width:${slideshow.attr.width}px; height:${slideshow.attr.height}px`">
          <img :src="item.image" alt="">
        </li>
      </ul>
    </div>
  </div>
  <!-- 焦点 -->
  <div class="ctr" :style="{right: `${slideshow.attr.focus_right}px`, bottom: `${slideshow.attr.focus_bottom}px`}">
    <ul class="iconlist">
      <li v-for="(item, i) in slideshow.value" :key="i" :style="{background: i==index ? '#f00' : '#eee'}" @mousemove="handleHover(i)" @mouseout="time"></li>
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
  setup(props, context) {
    const store = useStore();
    let timer: any = ref("") //时间变量
    let index: any = ref(0) //播放指针
    let banner: any = ref(null)

    const slideshow = computed(() => {
      let slides: any = store.getters['common/slideshow']
      let arr: any = []
      for (let key in slides) {
        if (key === 'slideshow_11') {
          arr = slides[key]
        }
      }
      return arr
    });

    function init() {
      banner = banner.value
      let data: any = slideshow.value.attr

      let imgul = banner.children
      let imgli = banner.children[0].children
      slideshow.value

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
      let data: any = slideshow.value.attr
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
      slideshow,
      handleHover,
      time
    }
  },
})
</script>
