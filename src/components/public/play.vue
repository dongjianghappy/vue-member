<template>
<div class="relative sssss" style="display: flex;">
  <i class="iconfont listen font20" :class="`icon-${music.isplay ? 'stop' : 'play'} ${style.color}`" @click="handlePlay($event)"></i>
  <div :class="{box: music.isplay, 'stop-box': !music.isplay}">
    <ul>
      <p :class="style.background"></p>
      <p :class="style.background"></p>
      <p :class="style.background"></p>
      <p :class="style.background"></p>
    </ul>
  </div>
  <div class="music-name absolute cl-999" :style="{top: style.top, width: (collapse ? '600px' : '300px')}" style="right: 0; z-index: 100; box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2); height: auto">
    <div class="music-header p15 h50 clearfix">
      <div class="left">音乐盒</div>
      <div class="right">
        <v-space>
          <span @click="handleMusicList">
            播放列表
          </span>
          <span @click="handleLrc">
            歌词
          </span>
          <span @click="handleSetting" v-if="userInfo.account">
            设置
          </span>
          <span @click="handleRouter" v-if="hasMusicList">
            音乐管理
          </span>
        </v-space>
      </div>
    </div>
    <template v-if="collapse">
      <div class="plr15" v-if="isSetting">
        <Setting :userInfo="userInfo" />
      </div>
      <div v-else>
        <MusicList :dataList="musicList" :data="music" />
      </div>
    </template>
    <div class="plr15 align_left" v-if="!collapse || collapse && isSetting">
      <i class="iconfont icon-music"></i>
      {{(music.music_name) || '暂无歌曲'}}
    </div>
  </div>
  <audio id='listen_music' ref="audio" :src="userInfo.music_url" loop style="display: none"></audio>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  useStore,
  durationTrans
} from '@/utils'
import VueEvent from '@/utils/event'
import Setting from '../packages/music/setting.vue'
import MusicList from '../packages/music/index.vue'
export default defineComponent({
  name: 'v-Play',
  components: {
    Setting,
    MusicList
  },
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
    const store = useStore();
    const isplay: any = ref(false)
    const audio: any = ref(null)
    const musicList: any = ref([])
    const music: any = ref({})
    const collapse: any = ref(false)
    const playBackgroundMusic: any = ref(true)
    const lrc: any = ref("")
    const lrcObj: any = ref({})
    const isSetting = ref(true)
    var time_array: any = ref([]);

    function handlePlay(e: any) {
      music.value.isplay = !music.value.isplay
      if (music.value.isplay) {
        audio.value.play()
        settime()
      } else {
        audio.value.pause()
      }
      VueEvent.emit("play_music", music);
    }

    function handleSetting() {
      collapse.value = !collapse.value
      isSetting.value = true
    }

    function handleMusicList() {
      collapse.value = !collapse.value
      isSetting.value = false
    }

    // 初始化歌词
    function lrcInit(param: any) {
      lrc.value = ""
      lrcObj.value = []
      time_array.value = []
      LrcArr.value[0] = ""
      LrcArr.value[1] = ""
      store.dispatch('common/Fetch', {
        api: 'Lrc',
        data: {
          lrc: param
        }
      }).then(res => {
        if(!res.result){
          return
        }
        lrc.value = res.result.content
        var lines = lrc.value.split('\n')
        lines.forEach((data: any) => {
          let aaa = data.split("]")
          let str = aaa[0].slice(1);
          lrcObj.value[str] = aaa[1]
          time_array.value.push(str)
        });
        LrcArr.value[0] = lrcObj.value[time_array.value[0]]
        LrcArr.value[1] = lrcObj.value[time_array.value[1]]
        VueEvent.emit("showLrc", LrcArr.value);
      })
    }

    function handleLrc() {
      VueEvent.emit("lrc", );
    }
    let LrcArr: any = ref([])

    function settime() {
      let audios: any = document.getElementById('listen_music');
      const timer = setInterval(() => {
        let time = durationTrans(audios.currentTime)
        if (lrcObj.value[time] !== undefined && lrcObj.value[time] !== "") {

          let index = time_array.value.indexOf(time)
          if (index % 2 == 0) {
            LrcArr.value[0] = lrcObj.value[time]
            LrcArr.value[1] = lrcObj.value[time_array.value[index + 1]]
          } else {
            LrcArr.value[0] = lrcObj.value[time_array.value[index + 1]]
            LrcArr.value[1] = lrcObj.value[time]
          }
          VueEvent.emit("showLrc", LrcArr.value);
        }
      }, 1000)
    }

    function handleRouter() {
      props.router('music/list', 'music')
    }

    function currentMusic(param: any) {
      playBackgroundMusic.value = false
      music.value = param
      audio.value.src = param.file
      music.value.isplay = true
      audio.value.load()
      audio.value.play()
      lrcInit(param.music_lrc)
      settime()
    }

    onMounted(() => {
      let ddddd = props.userInfo.music || []
      ddddd.map(((item: any) => {
        let index = musicList.value.findIndex((list: any) => list.id === item.id)
        if (index === -1) {
          musicList.value.push({
            id: item.id,
            music_name: item.title,
            file: item.music_file,
            music_lrc: item.lrc_id,
            time: item.time
          })
        }
      }))
      currentMusic(musicList.value[0])
      // 点击歌曲播放，并加入到歌曲列表中
      VueEvent.on("musicPley", (data: any) => {
        debugger
        let m = {
          id: data.music_id || data.id,
          music_name: data.music_name,
          file: data.file,
          music_lrc: data.music_lrc,
          time: data.music_time || data.time
        }
        let index = musicList.value.findIndex((item: any) => item.id === data.music_id || item.id === data.id)
        if (index === -1) {
          musicList.value.push(m)
        }
        currentMusic(m)
      })
      VueEvent.on("musicStop", () => {
        music.value.isplay = false
        audio.value.pause()
      })

      // audio.value.addEventListener('ended', function () {
      //   alert("hhhh")
      // })

    })
    return {
      audio,
      isplay,
      handlePlay,
      musicList,
      music,
      collapse,
      handleSetting,
      handleLrc,
      playBackgroundMusic,
      handleRouter,
      handleMusicList,
      isSetting
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

    .music-header {
      border-bottom: 1px solid var(--default-border);
      height: 40px;
      line-height: normal;
    }
  }

  &:hover {
    .music-name {
      background: var(--active-background);
      display: block;
    }

  }
}
</style>
