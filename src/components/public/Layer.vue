<template>
<div class="mask-wrap" style="z-index: 100000000000000000000;">
  <div style="height: inherit;">
    <!-- 图片 -->

    <template v-if="type==='image'">
      <div id="wwwwwwwwwww" :class="{'screen1': commentStatus, 'screen2': !commentStatus}" style=" height: -webkit-fill-available;">
        <div class="background-mask">
          <img :src="data.cover || data.image && data.image[0]" />
        </div>
        <div class="layer-wraps" style=" width: -webkit-fill-available; height: -webkit-fill-available;">
          <div class="layer-content relative" style=" width: -webkit-fill-available; height: -webkit-fill-available;">
            <div class="layer-box" style=" width: -webkit-fill-available; height: -webkit-fill-available;">
              <img ref="pic" :src="currentImg.replace(/thumb/g, 'view')" @load="curPic($event)" @mousedown="onmousedown" @mouseenter="onmouseenter" @click.stop />
            </div>

            <div class="layer-tool">
              <!-- <div class="rotate-left tool-btn"><i class="iconfont icon-rotate-left cl-white"></i></div>
              <div class="rotate-right tool-btn"><i class="iconfont icon-rotate-right cl-white"></i></div> -->
              <div class="tool-btn" @click="handleScale(0.5)">
                <i class="iconfont icon-suoxiao cl-white"></i>
              </div>
              <div class="tool-btn" @click="handleScale(2)">
                <i class="iconfont icon-fangda cl-white"></i>
              </div>
              <div class="rotate-right tool-btn" @click="handleScreen"><i class="iconfont icon-full-screen cl-white"></i></div>
              <div class="tool-btn"><span class="mr5">原图</span><i class="iconfont icon-download font12 cl-white"></i></div>
            </div>

            <div class="layer-button close" @click="handleclick"><i class="iconfont icon-close" /></div>
            <div class="layer-button prev deg180" @click.stop @click="toggle(-1)" v-if="currentindex !== 0">
              <i class="iconfont icon-arrow" />
            </div>
            <div class="layer-button next" @click.stop @click="toggle(1)" v-if="currentindex !== data.image.length-1">
              <i class="iconfont icon-arrow" />
            </div>
          </div>
          <audio :src="data.file" loop autoplay style="display: none"></audio>
          <div class="layer-thumbnail" v-if="data.image.length > 1" @click.stop>
            <ul>
              <li :class="{'picture-viewer-current': currentindex === i}" v-for="(img, i) in data.image" :key="i" @click="showImg(img, i)">
                <v-img :src="img" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <!-- 视频 -->
    <!-- <div class="relative" style="flex:1; text-align: center; height: 100%;" v-else>
      <video ref="show_video" controlslist="nodownload" controls="" autoplay="" loop name="media" style="width: inherit; height: inherit;">
        <source :src="currentVideo" type="video/mp4">
      </video>
      <div class="layer-button close absolute" style="line-height: 60px;" @click="handleclick"><i class="iconfont icon-close font20 pointer" /></div>
    </div> -->
    <div class="layer-info absolute ptb15" :class="{'screen-right': commentStatus, 'screen-left': !commentStatus}" style=" background: #222; top: 0; width: 360px" v-if="module.talk_comment && hasInfo">
      <Comment ref="comment" :data="{fn: fn_talk, ...data, displayType: 'layer', commentStatus: commentStatus}" :render="getComment" :expand="handleExpand" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  computed,
  useStore,
} from '@/utils'
import VueEvent from '@/utils/event'
import Comment from '../../views/index/components/TalkItem/comment/recommend.vue'
export default defineComponent({
  name: 'v-Layer',
  components: {
    Comment
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    currentImg: {
      type: String,
      default: ""
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
    const store = useStore()
    const currentImg: any = ref(props.currentImg || props.data.image[0])
    const currentVideo: any = ref(props.data.video)
    const module = computed(() => store.getters['user/config_talk'].talk_send_tool || []);
    const show_video: any = ref(null)
    let index = props.data.image && props.data.image.findIndex((item: any) => item === props.currentImg)
    const currentindex: any = ref(index || 0)
    const keyStatus: any = ref(false)
    const pic: any = ref(null)
    const commentStatus: any = ref(false)
    const image: any = ref({
      width: '',
      height: ''
    })
    let offX: any = 0 // 图片默认x坐标
    let offY: any = 0 // 图片默认y坐标
    document.getElementsByTagName("html")[0].style.overflow = "hidden"

    // 监听
    watch([() => props.data], async (newValues: any, prevValues) => {
      alert(currentImg)
      if (props.type === 'image') {
        currentImg.value = newValues[0].image[0]
      } else {
        currentVideo.value = newValues[0].video
        show_video.value.load().play()
      }
    })

    function curPic(e: any) {
      if (!e.currentTarget.parentNode) {
        return
      }
      const aaaaaaa: any = document.getElementById("wwwwwwwwwww")
      const width = aaaaaaa.clientWidth
      const height = aaaaaaa.clientHeight
      // 获取图片的宽高
      const realWidth = e.currentTarget.offsetWidth;
      const realHeight = e.currentTarget.offsetHeight;

      let proportion = width / height // div比例
      let proportion1 = realWidth / realHeight // 图片比例
      if (proportion1 > proportion) {
        e.currentTarget.style.width = `${document.body.clientWidth-192}px`;
        e.currentTarget.style.height = "auto";
        if (e.currentTarget.offsetHeight < height) {
          e.currentTarget.style.paddingTop = `${(height-e.currentTarget.offsetHeight)/2}px`
        } else {
          e.currentTarget.style.paddingTop = ""
        }
      } else {
        // 若是图片height大于width，就将width彻底展现，height按比例减少
        e.currentTarget.style.width = "auto";
        e.currentTarget.style.height = `${height}px`;
      }
      e.currentTarget.style.margin = "0px"
      image.value.width = e.currentTarget.clientWidth;
      image.value.height = e.currentTarget.clientHeight;
    }

    function handleclick() {
      document.getElementsByTagName("html")[0].style.overflow = ""
      keyStatus.value = false
      context.emit('update:isShow', false)
    }

    function handleScreen() {
      const parent = pic.value.parentNode
      if (pic.value.clientWidth === image.value.width) {
        if (pic.value.clientWidth > pic.value.clientHeight) {
          pic.value.style.width = 'auto'
          pic.value.style.height = `${parent.clientHeight}px`

        } else {
          pic.value.style.width = `${parent.clientWidth}px`
          pic.value.style.height = 'auto'
        }
      } else {
        pic.value.style.width = `${image.value.width}px`
        pic.value.style.height = `${image.value.height}px`
        pic.value.style.margin = '0px'
      }

    }

    // 图片选择
    function showImg(img: any, i: any) {
      currentindex.value = i
      currentImg.value = img
    }

    // 图片预览
    function toggle(num: any) {
      let img: any = document.getElementById('img')
      let length: any = props.data.image.length - 1
      if ((currentindex.value == "0" && num === -1) || (currentindex.value == length && num === 1)) {
        return
      }
      let i = props.data.image.findIndex((item: any) => item === currentImg.value)
      currentindex.value = i + num
      currentImg.value = props.data.image[currentindex.value]
    }

    // 上下切换按钮
    function prevOrNext(param: any) {
      props.getNeighbor(param)
    }

    function onmouseenter() {
      const parent = pic.value.parentNode
      if (pic.value.clientWidth > parent.clientWidth || pic.value.clientHeight > parent.clientHeight) {
        pic.value.style.cursor = 'grab'
      } else {
        pic.value.style.cursor = ''
      }
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
        const parent = pic.value.parentNode
        const mask = {
          w: parent.clientWidth,
          h: parent.clientHeight,
          tb: 0,
          lr: 0
        }

        let oevent = ev || event,
          x1 = oevent.clientX - distanceX,
          y1 = oevent.clientY - distanceY
        distanceX = oevent.clientX
        distanceY = oevent.clientY

        let left_p = pic.value.getBoundingClientRect().left
        let top_p = pic.value.getBoundingClientRect().top

        let left_b = parent.getBoundingClientRect().left
        let top_b = parent.getBoundingClientRect().top

        //左右移动
        if (left_p <= left_b || x1 < 0) {
          if (pic.value.clientWidth <= parent.clientWidth) {
            return
          }
          let aaa = x1 + offX
          if (aaa >= mask.lr) {
            aaa = mask.lr
          } else if (aaa <= -(pic.value.clientWidth - mask.w)) {
            aaa = -(pic.value.clientWidth - mask.w)
          }
          console.log(mask.lr);

          pic.value.style.marginLeft = aaa + 'px'
          offX = x1 + offX
        }

        // 上下移动
        if (top_p <= top_b || y1 < 0) {
          if (pic.value.clientHeight <= parent.clientHeight) {
            return
          }
          let aaa = y1 + offY
          if (aaa >= mask.tb) {
            aaa = mask.tb
          } else if (aaa <= -(pic.value.clientHeight - mask.h)) {
            aaa = -(pic.value.clientHeight - mask.h)
          }
          pic.value.style.marginTop = aaa + 'px'
          offY = y1 + offY
        }
      }

      document.onmouseup = function () {
        document.onmousemove = null
      }
    }

    function handleScale(scale: any) {
      const parent = pic.value.parentNode

      if (pic.value.clientWidth == image.value.width && scale == "0.5") {
        pic.value.style.width = `${image.value.width*0.75}px`
        pic.value.style.height = `auto`
      } else if (pic.value.clientWidth < image.value.width && scale == "2") {
        pic.value.style.width = `${image.value.width}px`
        pic.value.style.height = `${image.value.height}px`
      } else {
        if (pic.value.clientWidth * scale < image.value.width) {
          return
        }
        pic.value.style.width = `${pic.value.clientWidth*scale}px`
        pic.value.style.height = `auto`
      }

      let marginTop = (parent.clientHeight - pic.value.clientHeight) / 2
      let marginLeft = (parent.clientWidth - pic.value.clientWidth) / 2
      if (pic.value.clientWidth < image.value.width) {
        pic.value.style.marginTop = marginTop + 'px'
        return
      }

      if (pic.value.clientWidth == image.value.width) {
        pic.value.style.margin = '0px'
        return
      }
      pic.value.style.margin = "0px"
      if (pic.value.clientWidth > image.value.width && pic.value.clientWidth > parent.clientWidth) {
        pic.value.style.marginLeft = marginLeft + 'px'
      }
      if (pic.value.clientWidth > image.value.width && pic.value.clientHeight > parent.clientHeight) {
        pic.value.style.marginTop = marginTop + 'px'
      }

    }

    function handleExpand() {
      commentStatus.value = !commentStatus.value
    }

    onMounted(() => {
      // 监听播放结束
      keyStatus.value = true
      document.addEventListener("keydown", (e: any) => {
        if (!keyStatus.value) {
          return
        }
        if (e.keyCode == '27') {
          handleclick()
        }
        if (e.keyCode == '37') {
          toggle(-1)
        }
        if (e.keyCode == '39') {
          toggle(1)
        }
      });

      if (props.data.file) {
        VueEvent.emit("musicStop");
      }
    })

    return {
      module,
      pic,
      curPic,
      handleclick,
      handleExpand,
      handleScreen,
      currentImg,
      currentVideo,
      showImg,
      show_video,
      currentindex,
      toggle,
      prevOrNext,
      onmousedown,
      onmouseenter,
      handleScale,
      commentStatus
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
  background: rgba(0, 2, 6, 1);
  // display: flex;
  min-height: 100vh;
  height: 100%;
  z-index: 100000;

  .background-mask {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    z-index: -1;

    img {
      width: 100%;
      height: 100%;
      -webkit-filter: blur(60px);
      filter: blur(250px);
    }
  }

  .layer-wraps {
    flex: 1;
    display: flex;
    flex-flow: column;

    .layer-content {
      flex: 1;
      text-align: center;
      padding: 0;
      overflow: hidden;

      .layer-box {
        overflow: hidden;
      }

      .layer-tool {
        background: rgba(0, 0, 0, .5);
        position: absolute;
        top: 15px;
        right: 30px;
        border-radius: 4px;
        padding: 10px;
        width: auto;
        height: 40px;
        display: none;
        justify-content: flex-end;
        font-size: 12px;
        color: #fff;

        .tool-btn {
          margin: 0 10px;
          width: auto;
          height: 16px;
          border-radius: 50%;
          text-align: center;
          line-height: 16px;
          font-size: 16px;
          cursor: pointer;

          span {
            color: #fff;
          }

          i {
            font-size: 18px;
            color: #fff !important;
          }
        }
      }

      .layer-button {
        background: rgba(0, 0, 0, .5);
        position: absolute;
        border-radius: 30px;
        width: 56px;
        height: 56px;
        line-height: 50px;
        cursor: pointer;

        i {
          font-size: 24px !important;
          color: #fff !important;
          line-height: 60px;
        }

        &.close {
          top: 15px;
          left: 30px;
          line-height: 60px;
        }

        &.prev {
          top: 50%;
          left: 30px;
          margin-top: 15px;
        }

        &.next {
          top: 50%;
          right: 30px;
          margin-top: 15px;
        }

        &:hover {
          background: rgba(0, 0, 0, .8);
        }
      }

      &:hover {
        .layer-tool {
          display: flex;
        }
      }
    }

    .layer-thumbnail {
      background: #000;
      height: 90px;

      ul {
        display: flex;
        justify-content: center;
        padding: 5px;
        height: 90px;
        align-items: center;

        li {
          margin: 0 5px;
          border-radius: 4px;
          overflow: hidden;
          width: 60px;
          height: 60px;
          opacity: 0.5;

          &.picture-viewer-current {
            opacity: 1;
          }

          img {
            border-radius: 2px;
          }
        }
      }
    }
  }

  .screen1 {
    transition: .5s, ;
    width: calc(100% - 360px);
  }

  .screen2 {
    transition: .5s, ;
    width: 100%;
  }

  .layer-info {
    background: #fff;
    width: 350px;
    height: 100%;

    &.screen-left {
      transition: .5s, ;
      right: -360px;
    }

    &.screen-right {
      transition: .5s, ;
      right: 0;
    }
  }
}
</style>
