<template>
<div class="relative sssss" style="display: flex;">
  <i class="iconfont listen font20" :class="`icon-${isplay ? 'stop' : 'play'} ${style.color}`" @click="handlePlay($event ,data.index, isplay)"></i>
  <div :class="{box: isplay, 'stop-box': !isplay}">
    <ul>
      <p :class="style.background"></p>
      <p :class="style.background"></p>
      <p :class="style.background"></p>
      <p :class="style.background"></p>
    </ul>
  </div>
  <div class="music-name bg-white absolute cl-999 plr15" :style="{top: style.top, width: (collapse ? '450px' : '300px')}" style="right: 0; z-index: 100; box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2); height: auto">
    <div class="ptb10 clearfix" style="border-bottom: 1px solid #eee; line-height: normal;">
      <div class="left">音乐盒</div>
      <div class="right">
        <v-space>
          <span @click="handleSetting">
            设置
          </span>
          <span @click="handlePlayBackgroundMusic">
            背景音乐
          </span>
          <span @click="handleRouter" v-if="hasMusicList">
            音乐管理
          </span>
        </v-space>
      </div>
    </div>
    <div class="p10" style="background: #f9f9f9" v-if="collapse">
      <div class="form-wrap-box">
        <div class="li">
          <span class="label">自动播放</span>
          <v-radiobutton name="musical_instrument" v-model:checked="userInfo.autoplay" :enums="[{label: '开启', value: '1'}, {label: '关闭', value: '0'}]" />
        </div>
        <div class="li">
          <span class="label">背景音乐</span>
          <input type="text" v-model="userInfo.music_name" placeholder="请输入歌曲名称" class="input-sm input-full" />
          <textarea v-model="userInfo.music_url" placeholder="请输入歌曲url地址" class="w-full"></textarea>
        </div>
        <div class="li">
          <span class="label"></span>
          <span @click="handleSave">保存</span>
        </div>
      </div>
    </div>
    <div class="align_left">
      <i class="iconfont icon-music"></i>
      {{(playBackgroundMusic ? userInfo.music_name : music.music_name || music.title) || '暂无歌曲'}}
    </div>
  </div>
  <audio :id='`listen_music`' ref="audio" :src="userInfo.music_url" loop style="display: none"></audio>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  onMounted,
  useStore
} from '@/utils'
import VueEvent from '@/utils/event'
export default defineComponent({
  name: 'v-Audio',
  props: {
    style: {
      type: Object,
      default: () => {
        return {
          color: "cl-white",
          background: 'bg-white',
          top: '64px'
        }
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    hasMusicList: {
      type: Boolean,
      default: false,
    },
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    router: {
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
    const isplay: any = ref(false)
    const audio: any = ref(null)
    const music: any = ref({})
    const collapse: any = ref(false)
    const playBackgroundMusic: any = ref(true)

    function handlePlay(e: any, index: any, status: any) {
      if (!status) {
        VueEvent.emit("navbarSetting", index);
      }
      isplay.value = !isplay.value
      if (isplay.value) {
        audio.value.play()
      } else {
        audio.value.pause()
      }
    }

    function handleSetting() {
      collapse.value = !collapse.value
    }

    function handlePlayBackgroundMusic(e: any, index: any, status: any) {
      VueEvent.emit("musicPley", {
        file: props.userInfo.music_url
      });
      playBackgroundMusic.value = true
    }

    function handleSave() {
      const {
        account,
        music_name,
        music_url,
        autoplay
      } = props.userInfo
      store.dispatch('common/Fetch', {
        api: "editUserInfo",
        data: {
          uid: account,
          music_name,
          music_url,
          autoplay
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "保存成功"
        })
      })
    }

    function handleRouter() {
      props.router('music/list', 'music')
    }

    onMounted(() => {
      VueEvent.on("musicPley", (data: any) => {
        debugger
        playBackgroundMusic.value = false
        music.value = data
        audio.value.src = data.file
        isplay.value = true
        audio.value.load()
        audio.value.play()
      })
      VueEvent.on("musicStop", () => {
        isplay.value = false
        audio.value.pause()
      })
    })
    return {
      audio,
      isplay,
      handlePlay,
      music,
      collapse,
      handleSetting,
      handleSave,
      playBackgroundMusic,
      handleRouter,
      handlePlayBackgroundMusic
    }
  }
})
</script>

<style lang="less">
.playTheme {
  background: #1b1b1b !important;
  color: #fff !important;
}

.icon-audio {
  font-size: 20px;
  color: #03a9f4;
}

.box {
  width: 24px;
  display: flex;
  align-items: center;
}

.box ul {
  width: 20px;
  height: 12px;
  display: flex;
  transform: rotateX(180deg);
  justify-content: space-between;
}

.box p {
  width: 3px;
  height: 12px;
  background: #fff;
  border-radius: 2px;
}

.box p:first-child {
  animation: Mymove1 2s ease infinite;
  animation-delay: .1s;
  /* transform: rotateX(180deg) */
}

.box p:nth-of-type(2) {
  animation: Mymove2 2s ease infinite;
  animation-delay: .3s;
}

.box p:nth-of-type(3) {
  animation: Mymove2 2s ease infinite;
  animation-delay: .5s;
}

.box p:nth-of-type(4) {
  animation: Mymove1 2s ease infinite;
  animation-delay: .7s;
}

@keyframes Mymove1 {
  0% {
    height: 2px;
  }

  50% {
    height: 12px;
  }

  100% {
    height: 6px;
  }
}

@keyframes Mymove2 {
  0% {
    height: 6px;
  }

  50% {
    height: 12px;
  }

  100% {
    height: 2px;
  }
}

.stop-box {
  width: 24px;
  display: flex;
  align-items: center;

  ul {
    width: 20px;
    height: 12px;
    display: flex;
    transform: rotateX(180deg);
    justify-content: space-between;

    p {
      width: 3px;
      height: 12px;
      background: #fff;
      border-radius: 2px;

      &:nth-child(1) {
        height: 6px;
      }

      &:nth-child(2) {
        height: 2px;
      }

      &:nth-child(3) {
        height: 6px;
      }

    }
  }
}

.sssss {
  display: block;
  height: 100%;

  i {
    margin-right: 10px;
    padding-top: 50%;
    margin-top: -15px;
  }

  .music-name {
    display: none;
  }

  &:hover {
    .music-name {
      display: block;
    }

  }
}
</style>
