<template>
<div class="banner" v-if="isSHow" style="border-radius: 4px; overflow: hidden;" :style="{width: `${detail.attr.width}px`}">
  <div class="_container" :style="{
        width: `${detail.attr.width}px`,
        height: `${detail.attr.height}px`,
        left: '50%',
        marginLeft: `${-620 / 2}px`
      }">
    <div ref="banner" class="imgcon">
      <ul style="transition: top 0.3s ease;">
        <li v-for="(item, index) in detail.value" :key="index" :style="`width:${detail.attr.width}px; height:${dadetailta.attr.height}px`">
          <img :src="item.image" alt="">
        </li>
      </ul>
    </div>
  </div>
  <!-- 焦点 -->
  <div class="ctr" :style="{right: `${detail.attr.focus_right}px`, bottom: `${detail.attr.focus_bottom}px`}" v-if="detail.value.length > 1">
    <ul class="iconlist">
      <li v-for="(item, i) in detail.value" :key="i" :style="{background: i==index ? 'var(--color-primary)' : '#eee'}" @mousemove="handleHover(i)" @mouseout="time"></li>
    </ul>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  useStore,
  onMounted,
  ref
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const store = useStore();
let timer: any = ref("") //时间变量
let index: any = ref(0) //播放指针
let banner: any = ref(null)
const detail: any = ref({})
const isSHow: any = ref(false)

function init() {
  banner = banner.value
  let data: any = detail.value.attr

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
  let data: any = detail.value.attr
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
onMounted(() => {
    store.dispatch('common/Fetch', {
      api: "slideBanner",
      state: 'slideshow',
      data: {
        channel: 1000
      }
    }).then((res: any) => {
      
  for (let key in res.result) {
    if (key === 'slideshow_11') {
      detail.value = res.result[key]
      isSHow.value = true
    }
  }

      init()
    })
  
})
</script>
