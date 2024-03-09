<template>
<div>
  <div class="con-list" v-for="(item, index) in sourceData" :key="index">
    <template v-if="item.talkType === 'user'">
      <div class="con-wrap">
        <div class="photos">
          <v-photo :data="item" :style="{width: '50px', height: '50px', borderRadius: '50%'}" v-if="loginuser.account === item.uid" />
          <v-photos :sourceData="item" v-else />
        </div>
        <div class="user_info pb5"><span class="username">{{item.nickname}}</span>
          <span class="right span-icon">
            <v-popover content="<i class='iconfont icon-down font18 icon-btn'></i>" arrow="tb" offset="right" :move="-50" :keys="`popover-${item.id}`">
              <div class="p15 align_center" style="width: 80px; height: 50px">
                <ul class="font14" style="display: block">
                  <li style="height: 32px" @click="deleteTalk(item.id)">删除</li>
                </ul>
              </div>
            </v-popover>
          </span>
        </div>
        <div class="user_from pb5">{{item.times}}</div>
        <div class="user_text markdown">
          <div class="relative" style="min-height: 30px" v-if="item.summary">
            <span v-html="item.summary.replace(/\n/g, '<br/>')"></span>
            <v-audio :data="item" :hasMusic="true" v-if="item.background_music" />
            {{item.music_name}}
          </div>
          <!--转载渲染-->
          <template v-if="item.list">
            <div v-for="(list, i) in item.list" :key="i">
              <div v-if="list.video || list.image" style="background:#eee; margin-top: 5px; margin-left: -80px; margin-right: -15px; margin-bottom: -15px; padding-top: 10px; padding-left: 80px; padding-right:15px;    padding-bottom: 15px;">
                <span @click="handleClick(list.account || list.uid)" class="showuserinfo" style="color: #eb7350;">@{{list.nickname}}</span>

                <span v-html="list.summary.replace(/\n/g, '<br/>')"></span>
                <!-- 视频预览 -->
                <video v-if="list.video" src="{$sm_talklist[l].video}" class="playmp4" style="width: 450px; height: auto;">
                  您的浏览器不支持HTML5
                </video>

                <!-- 图片预览 -->
                <ul v-else-if="list.image.length > 0" class="img-grid smallimg-wrap clearfix">
                  <li v-for="(img, k) in list.image" :key="k">
                    <!-- <v-img :src="img" @click="showImg(item, img)" /> -->
                    <!-- <img :src="img" @click="showImg(item, img)" class="_onalbumimg showimg" data-id="{$sm_talklist[l].list[u].id}" data-coding="{$sm_talklist[l].list[u].coding}" data-codinglist="collect={$sm_talklist[l].coding5}&comment={$sm_talklist[l].list[u].coding3}&praise={$sm_talklist[l].list[u].coding4}" data-img="{$sm_talklist[l].list[u].imglist[i]}" /> -->
                  </li>
                </ul>
              </div>
              <div v-else>
                <!-- 这部分显示最后转载用户吧 -->
                <span @click="handleClick(list.account || list.uid)" class="showuserinfo" style="color: #eb7350;">@{{list.nickname}}</span>
                <span v-html="list.summary.replace(/\n/g, '<br/>')"></span>
              </div>
            </div>
          </template>
          <!--原文渲染-->
          <div v-else>
            <div class="bg-black relative" style="height: 350px; z-index: 1; border-radius: 8px;
    overflow: hidden;" v-if="item.type == 'video'">
              <div class="background-mask" style="position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%; z-index: -1;">
                <img :src="item.cover" style="width: 100%;
    height: 100%;
    -webkit-filter: blur(60px);
    filter: blur(60px);">
              </div>
              <div class="relative">
                <i class="iconfont icon-play font32 cl-white absolute" style="top: 50%;
    left: 50%; margin-left: -16px;
    margin-top: -16px;" v-if="!item.isplay" />
                <video :src="item.video" class="playmp4" :class="`video_${item.id}`" @click="handlePlay(item)" style="width: 100%; height: 350px;">
                  您的浏览器不支持HTML5
                </video>
              </div>
            </div>
            <template v-else>
              <div v-if="item.image.length === 1">
                <div style="margin-top: 25px; margin-right: 25px;" v-if="item.type === 'sign'">
                  <img :src="item.image[0]" onerror="this.src='http://yunxi10.com/source/public/images/noimage.png'" class="showimg" @click="showImg(item, item.image[0])" style=" width: 100%; height: auto; cursor: zoom-in;" />
                </div>
                <img :src="item.image[0]" onerror="this.src='http://yunxi10.com/source/public/images/noimage.png'" class="showimg" @click="showImg(item, item.image[0])" style="border-radius: 8px;width: 250px; height: auto; cursor: zoom-in;" v-else />
              </div>
              <ul v-else class="img-grid smallimg-wrap clearfix">
                <li v-for="(img, k) in item.image" :key="k" style="border-radius: 8px; overflow:hidden;">
                  <v-img :src="img" @click="showImg(item, img)" onerror="this.src='http://yunxi10.com/source/public/images/noimage.png'" />
                  <!-- <img :src="img" class="showimg" @click="showImg(item, img)" style="border-radius: 8px;cursor: zoom-in;" /> -->
                </li>
              </ul>
            </template>
          </div>
        </div>
      </div>
      <TalkItembar :data="item" />
    </template>
    <template v-else>
      <div class="con-wrap">
        <div class="photos">
          <!-- <v-photo :data="item" :style="{width: '50px', height: '50px', borderRadius: '50%'}" v-if="loginuser.account === item.uid" /> -->
          <v-photos :sourceData="item" />
        </div>
        <div class="user_info pb5"><span class="username">{{item.nickname}}</span>
          <span class="right span-icon">

          </span>
        </div>
        <div class="user_from pb5">{{item.times}}</div>
        <div class="user_text markdown" v-if="item.summary">
          <div v-html="item.summary.replace(/\n/g, '<br/>')" style="min-height: 30px"></div>
        </div>
      </div>
    </template>
  </div>
  <v-layer v-model:isShow="showFlag" :data="currentData" :img="currentImg" v-if="showFlag" type="image" :hasComment="true" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  useStore,
  useRouter,
  getUid
} from '@/utils'
import TalkItembar from './TalkItembar.vue'

export default defineComponent({
  name: 'TalkItemView',
  components: {
    TalkItembar,
  },
  props: {
    sourceData: {
      type: Array,
      default: () => {
        return []
      }
    },
    deleteTalk: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const loginuser = computed(() => store.getters['user/loginuser']);
    const showFlag = ref(false)
    const currentData = ref()
    const currentImg = ref()
    const currentIndex = ref(null)

    function showImg(data: any, img: any) {
      currentData.value = data
      currentImg.value = img
      showFlag.value = !showFlag.value
    }

    function handleClick(uid: any) {
      if (getUid() !== uid) {
        const path = window.location.pathname.split("/")
        window.location.href = `${path[1] === "app" ? "/app": ""}/u/${uid}/home`;
      } else {
        router.push(`${proxy.const.u}${uid}/home`)
      }
    }

    function handlePlay(param: any) {
      debugger
      let audio: any = document.getElementsByClassName('video_' + param.id)

      props.sourceData.map((item: any) => {
        if (param.id !== item.id && item.type == "video") {
          let audio1: any = document.getElementsByClassName('video_' + item.id)
          item.isplay = false
          audio1[0].pause()
        }
      })

      param.isplay = !param.isplay
      if (param.isplay) {
        audio[0].play()
      } else {
        audio[0].pause()
      }
    }

    return {
      showFlag,
      currentData,
      currentImg,
      loginuser,
      showImg,
      handleClick,
      handlePlay
    }
  }
})
</script>
