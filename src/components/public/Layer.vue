<template>
<div class="mask-wrap">
  <template v-if="type==='image'">
    <div style="flex: 1; display: flex; flex-flow: column;">
      <div class="relative" style="flex: 1; text-align: center; padding: 0 86px;">
        <!-- <img :src="currentImg" style=" width: 450px; height: 100%; display: inline;" @click.stop /> -->
        <div>
        <v-img id="img" :src="currentImg" :length="data.image.length" @click.stop :all="true" />
        </div>
        <div class="layer-button close absolute" style="line-height: 60px;" @click="handleclick"><i class="iconfont icon-close font20 pointer" /></div>
        <div class="layer-button prev absolute deg180" @click.stop @click="toggle(-1)" v-if="index !== 0">
          <i class="iconfont icon-arrow pointer" style="font-size: 32px !important; line-height: 60px;" />
        </div>
        <div class="layer-button next absolute" @click.stop @click="toggle(1)" v-if="index !== data.image.length-1">
          <i class="iconfont icon-arrow pointer" style="font-size: 32px !important; line-height: 60px;" />
        </div>
      </div>
      <audio :src="data.file" loop autoplay style="display: none"></audio>
      <div style="background: #000; height: 90px" v-if="data.image.length > 1" @click.stop>
        <ul class="p5" style="display: flex; justify-content: center; height: 90px; align-items: center;">
          <li class="picture-viewer mlr5 " :class="{'picture-viewer-current': index === i}" v-for="(img, i) in data.image" :key="i" style="border-radius: 4px; overflow:hidden; width: 60px; height: 60px;" @click="showImg(img, i)">
            <v-img :src="img" />
          </li>
        </ul>
      </div>
    </div>
  </template>
  <div class="relative" style="flex:1; text-align: center; height: 100%;" v-else>
    <video ref="show_video" controlslist="nodownload" controls="" autoplay="" loop name="media" style="width: inherit; height: inherit;">
      <source :src="`http://localhost//uploadfile/music/original/${currentVideo}`" type="video/mp4">
    </video>
    <div class="layer-button close absolute" style="line-height: 60px;" @click="handleclick"><i class="iconfont icon-close font20 pointer" /></div>
  </div>
  <div class="layer-info relative" @click.stop v-if="hasInfo">
    <div class="relative">
      <div class="con-list">
        <div class="con-wrap">
          <div class="photos">
            <a href="/{$sm_talklist[l].uid}/home" target="_blank">
              <img :src="data.photos" width="30" height="30" class="showuserinfo" data-uid="{$sm_talklist[l].account}" data-placement="automatic" data-toggle="tooltip{$sm_talklist[l].id}" data-left="150" />
            </a>
          </div>
          <div class="user_info pb5"><span class="username">{{data.nickname}}</span></div>
          <div class="user_from pb5">{{data.times}}</div>
          <div class="user_text">
            <div class="bold mb10" v-html="data.title"></div>
            <p class="mb10">分类: {{data.parent}}</p>
            <div class="mb10"> 标签: {{data.tag}}</div>
            <div>摘要: {{data.summary}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute align_center p10" style="background: #f8f8fa; display: flex; bottom: 0; left: 0; right: 0; height: 90px;">
      <div class="btn btn-default m5" style="flex: 1; line-height: 45px;" @click="prevOrNext('prev')">上一条</div>
      <div class="btn btn-default m5" style="flex: 1; line-height: 45px;" @click="prevOrNext('next')">下一条</div>
    </div>
  </div>
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
export default defineComponent({
  name: 'v-Layer',
  props: {
    data: {
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
    const currentImg: any = ref(props.data.image[0])
    const currentVideo: any = ref(props.data.video)
    const show_video: any = ref(null)
    const index: any = ref(0)
    const keyStatus: any = ref(false)
    document.getElementsByTagName("html")[0].style.overflow = "hidden"

    // 监听
    watch([() => props.data], async (newValues: any, prevValues) => {
      if (props.type === 'image') {
        index.value = 0
        currentImg.value = newValues[0].image[0]
      } else {
        currentVideo.value = newValues[0].video
        show_video.value.load().play()
      }
    })

    function handleclick() {
      document.getElementsByTagName("html")[0].style.overflow = ""
      keyStatus.value = false
      context.emit('update:isShow', false)
    }

    // 图片选择
    function showImg(img: any, i: any) {
      index.value = i
      currentImg.value = img
    }

    // 图片预览
    function toggle(num: any) {
      let img: any = document.getElementById('img')
      let length: any = props.data.image.length - 1
      if ((index.value == "0" && num === -1) || (index.value == length && num === 1)) {
        return
      }
      let i = props.data.image.findIndex((item: any) => item === currentImg.value)
      index.value = i + num
      img.style.paddingTop = ""
      currentImg.value = props.data.image[index.value]
    }

    // 上下切换按钮
    function prevOrNext(param: any) {
      props.getNeighbor(param)
      // let length: any = props.dataList.length - 1
      // if ((props.index == "0" && param === 'prev') || (props.index == length && param === 'next')) {
      //   return
      // }
    }

    onMounted(() => {
      // 监听播放结束
      // show_video.value.addEventListener("ended", prevOrNext("next"));
      keyStatus.value = true
      document.onkeydown = (e: any) => {
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
      }

      if(props.data.file){
        VueEvent.emit("musicStop");
      }
    })

    return {
      handleclick,
      currentImg,
      currentVideo,
      showImg,
      show_video,
      index,
      toggle,
      prevOrNext
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
