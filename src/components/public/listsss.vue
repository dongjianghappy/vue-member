<template>
<div>
  <div v-show="!img" class="align_center upload-background" style="padding-top: 170px;" :style="`height:${mask.h+mask.tb}px;`">
    <div class="upfile upphotos" @click="handleChoose">选择图片</div>
  </div>
  <div class="relative" v-show="img">
    <div class="pic" :style="`height:${mask.h+mask.tb}px`">
      <!-- 上 -->
      <div class="mask-box mask-top" :style="`height:${mask.tb}px`"></div>
      <!-- 右 -->
      <div class="mask-box mask-right" :style="`top:${mask.tb}px; bottom:${mask.tb}px; width: ${mask.lr}px`"></div>
      <!-- 下 -->
      <div class="mask-box mask-bottom" :style="`height:${mask.tb}px`"></div>
      <!-- 左 -->
      <div class="mask-box mask-left" :style="`top:${mask.tb}px; bottom:${mask.tb}px; width: ${mask.lr}px`"></div>
      <div class="canvas-box" :style="`top:${mask.tb}px; right:${mask.lr}px; bottom:${mask.tb}px; left:${mask.lr}px;`">
        <canvas ref="cover" style="pointer-events: none;"></canvas>
      </div>
      <img class="img" ref="pic" style="display: block" id="pic" :src="img" @mousedown="onmousedown" />
    </div>
    <div style="position: absolute; left: 0; bottom: -30px">
      <span><i class="iconfont icon-huanyuan" @click="handleChoose" /></span>
      <span><i class="iconfont icon-fangda" @click="handleScale(2)" /></span>
      <span><i class="iconfont icon-suoxiao" @click="handleScale(0.5)" /></span>
    </div>
  </div>
  <input type="file" id="filElem" accept=".jpg, .jpeg, .bmp, .gif, .png, .heif, .heic" multiple="multiple" class="FileUpload_file_27ilM" style="display: none" @change="getFile">
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  defineExpose,
  ref,
} from '@/utils'
import List from '@/views/index/album/components/list.vue'

const props: any = defineProps({
  kind: {
    type: String,
    default: 'head_background'
  },
  mask: {
    type: Object,
    default: {
      w: 400,
      h: 400,
      tb: 0,
      lr: 0
    }
  },
  size: {
    type: Object,
    default: () => {
      return {
        width: 500,
        height: 300
      }
    }
  },
  style: {
    type: Object,
    default: () => {
      return {
        width: 670,
        height: 540
      }
    }
  },
  image: {
    type: Object,
    default: () => {
      return {
        width: 800
      }
    }
  }
})
const emit: any = defineEmits(['value'])
defineExpose({cutPicture})
const filElem = ref("filElem")
const isShow = ref(false)
const proportion: any = ref('1')
let img: any = ref("")
const cover: any = ref(null)
const pic: any = ref(null)
let offX: any = 0 // 图片默认x坐标
let offY: any = 0 // 图片默认y坐标

function getFile() {
  let _obj: any = document.getElementById(filElem.value);
  let file = _obj.files[0]

  let reader = new FileReader()
  reader.onload = function () {
    img.value = reader.result
    pic.value.width = props.image.width * proportion.value
    cover.value.width = props.size.width
    cover.value.height = props.size.height
  }
  reader.readAsDataURL(file)
}

// 拖拽图片
function onmousedown(ev: any) {
  ev.preventDefault()
  let oevent = ev || event
  let distanceX = oevent.clientX //鼠标点击位置
  let distanceY = oevent.clientY //鼠标点击位置
  //dX和dY是鼠标在pic内的相对位置
  //在移动后，设置图片的外边距，利用负外边距移动图片
  document.onmousemove = function (ev) {
    const {
      mask
    } = props
    let oevent = ev || event,
      x1 = oevent.clientX - distanceX,
      y1 = oevent.clientY - distanceY
    distanceX = oevent.clientX
    distanceY = oevent.clientY
    let left_p = pic.value.getBoundingClientRect().left
    let top_p = pic.value.getBoundingClientRect().top

    let left_b = cover.value.getBoundingClientRect().left
    let top_b = cover.value.getBoundingClientRect().top

    //左右移动
    if (left_p <= left_b || x1 < 0) {
      let aaa = x1 + offX
      if (aaa >= mask.lr) {
        aaa = mask.lr
      } else if (aaa <= -(pic.value.width - mask.w)) {
        aaa = -(pic.value.width - mask.w)
      }
      console.log(mask.lr);

      pic.value.style.marginLeft = aaa + 'px'
      offX = x1 + offX
    }

    // 上下移动
    if (top_p <= top_b || y1 < 0) {
      let aaa = y1 + offY
      if (aaa >= mask.tb) {
        aaa = mask.tb
      } else if (aaa <= -(pic.value.height - mask.h)) {
        aaa = -(pic.value.height - mask.h)
      }
      pic.value.style.marginTop = aaa + 'px'
      offY = y1 + offY
    }
  }

  document.onmouseup = function () {
    document.onmousemove = null
    cutPicture()
  }
}

// 选择图片
function handleChoose() {
  let _obj: any = document.getElementById(filElem.value);
  _obj.dispatchEvent(new MouseEvent('click'))
}

function cutPicture() {

  let big_canvas = cover.value.getContext('2d')
  let x = props.mask.lr - parseInt(pic.value.style.marginLeft || 0)
  let y = props.mask.tb - parseInt(pic.value.style.marginTop || 0)

  var im = document.createElement('img')
  im.src = pic.value.src
  var real_width = im.width
  var real_height = im.height
  big_canvas.drawImage(
    pic.value,
    (real_width / pic.value.width) * x,
    (real_height / pic.value.height) * y,
    (real_width / pic.value.width) * props.size.width,
    (real_height / pic.value.height) * props.size.height,
    0,
    0,
    props.size.width,
    props.size.height
  )
  var image = new Image();
  image.src = cover.value.toDataURL("image/png");
  emit('value', image.src)
  big_canvas.clearRect(0, 0, props.size.width, props.size.height)
  return image.src

}

function handleScale(scale: any) {
  if (pic.value.width == props.image.width && scale == "0.5") {
    pic.value.width = props.image.width * 0.75
  } else if (pic.value.width < props.image.width && scale == "2") {
    pic.value.width = props.image.width
  } else {
    if (pic.value.width * scale < props.image.width) {
      return
    }
    pic.value.width = pic.value.width * scale
  }
}
</script>

<style lang="less" scoped>
.upload-background {
  background: var(--card-background);
}

.pic {
  position: relative;
  overflow: hidden;
  margin: 0 auto;

  .mask-box {
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    pointer-events: none;
  }

  .mask-top {
    top: 0;
    width: 100%;
  }

  .mask-right {
    right: 0;
    bottom: 50px;
    width: 50px;
  }

  .mask-bottom {
    bottom: 0;
    width: 100%;
  }

  .mask-left {
    left: 0;
    bottom: 50px;
    width: 50px;
  }

  .canvas-box {
    position: absolute;
    top: 0px;
    left: 0px;
    pointer-events: none;
  }
}
</style>
