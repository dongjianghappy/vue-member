<template>
<div class="relative sssss" style="display: flex;">
  <i class="iconfont listen font20" :class="`icon-${curentMusicss.isplay ? 'stop' : 'play'} ${style.color}`" @click="handlePlay($event)"></i>
  <div :class="{box: curentMusicss.isplay, 'stop-box': !curentMusicss.isplay}">
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
          <span @click="showPlay">
            播放列表
          </span>
          <span @click="handleLrc">
            歌词
          </span>
          <span @click="handleSetting" v-if="userInfo.account">
            背景音乐
          </span>
          <span @click="handleRouter" v-if="hasMusicList">
            音乐管理
          </span>
        </v-space>
      </div>
    </div>
    <div class="plr15" v-if="collapse">
      <Setting :userInfo="userInfo" />
    </div>
    <div class="plr15 align_left" v-if="!collapse || collapse && isSetting">
      <i class="iconfont icon-music"></i>
      {{(curentMusicss.music_name) || '暂无歌曲'}}
    </div>
  </div>
  <div id='audio_wrap' style="display: none">
    <audio id="listen_music" :src="curentMusicss.file"></audio>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  ref,
  onMounted,
  computed,
  useStore,
  durationTrans,
  timeToSeconds,
  useRouter,
  getUid,
  toBlob,
  watch
} from '@/utils'
import {
  nextTick,
  toRefs
} from 'vue'
import VueEvent from '@/utils/event'
import Setting from '../packages/music/components/setting_background.vue'
// import MusicList from './index11.vue'
import {
  musicPush,
  currentMusic,
  playMusic,
  musicLrc,
  canvas,
  animationFrame
} from '../packages/music/fn'
import {
  content
} from '@/assets/const'
const props: any = defineProps({
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
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const musicLists: any = computed(() => store.getters['user/music'].list);
const setting: any = computed(() => store.getters['user/music'].setting);
const curentMusicss: any = computed(() => store.getters['user/music'].currentMusic);
const router = useRouter()
const timer: any = ref(null)
const musicList: any = ref([])
const music: any = ref({})
const collapse: any = ref(false)
const lrc: any = ref("")
const lrcList: any = ref({
  time: [],
  list: []
})
const lrcObj: any = ref({})
const isSetting = ref(false)
var time_array: any = ref([]);
// 监听路由
watch(curentMusicss, (newValues, prevValues) => {
  lrcInit({
    lrc: curentMusicss.value.music_lrc,
    name: curentMusicss.value.music_name
  })
})

function handlePlay(e: any) {
  if (!curentMusicss.value.file) {
    if(!musicLists.value[0]){
      proxy.$hlj.message({
        type: 'info',
        msg: "请选择播放歌曲"
      })
      return
    }
    currentMusic(musicLists.value[0], setting, store)
  } else {
    playMusic(curentMusicss.value, store)
  }
}

function handleLrc(){
  musicLrc(setting, store, props)
  store.dispatch('common/Fetch', {
    api: "playSetting",
    data: {
      lrc_display: setting.lrc_display
    }
  })
}

function handleSetting() {
  collapse.value = !collapse.value
  isSetting.value = true
}

function showPlay() {
  VueEvent.emit("musicPlay");
}

// 初始化歌词
async function lrcInit(param: any) {
  lrc.value = ""
  const res: any = await store.dispatch('common/Fetch', {
    api: 'Lrc',
    data: {
      ...param
    }
  })
  if (res.result && res.result.content) {
    lrc.value = res.result.content
  }

  let _audio: any = document.getElementById('listen_music')
  nextTick(() => {
    setTimeout(() => {
      setLrc()
    }, 1000)
  })
}

let LrcArr: any = ref([])

// 歌词设置
function setLrc() {
  time_array.value = []
  lrcList.value.time = []
  lrcList.value.list = []
  clearInterval(timer.value)
  if (!lrc.value) {
    VueEvent.emit("showLrc", [])
    return
  }
  let audios: any = document.getElementById('listen_music');
  var lines = lrc.value.split('\n')
  lrcObj.value = {}
  lines.forEach((data: any) => {
    let aaa = data.split("]")
    let bbb = aaa[0].split(".")
    let str = bbb[0].slice(1);
    lrcObj.value[str] = aaa[1]
    lrcList.value.time.push(str)
    lrcList.value.list.push(aaa[1])
    time_array.value.push(str)
  });
  LrcArr.value[0] = lrcObj.value[time_array.value[0]]
  LrcArr.value[1] = lrcObj.value[time_array.value[1]]

  curentMusicss.value.lrc = lrcObj.value
  store.commit('user/setCurrentMusic', curentMusicss.value)
  VueEvent.emit("showLrc", LrcArr.value);

  timer.value = setInterval(() => {
    let time = `${durationTrans(audios.currentTime)}`

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
      VueEvent.emit("sliding", index);
    }
  }, 1000)
}

onMounted(async () => {

  // 背景音乐
  let bg_music = props.userInfo.music.list || []

  musicPush(bg_music, musicList.value)
  // 用户音乐收藏列表
  await store.dispatch('common/Fetch', {
    api: 'getMusic',
    data: {
      uid: getUid(),
      background_music: '1'
    }
  }).then(res => {
    res.result && musicPush(res.result, musicList.value)
  })
  await toBlob(musicList.value)
  nextTick(() => {
    setTimeout(() => {
      store.commit('user/setMusicList', musicList.value)
      let el: any = document.getElementById('listen_music')
      let music = curentMusicss.value
      lrcInit({
        lrc: music.music_lrc,
        name: music.music_name
      })

      setLrc()
    }, 1000)
  })
  setTimeout(() => {
    canvas(curentMusicss.value)
  }, 2000)
})
</script>

<style lang="less">
.playTheme {
  background: #1b1b1b !important;
  color: #fff !important;
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
      background: var(--module-background);
      display: block;
    }

  }
}
</style>
