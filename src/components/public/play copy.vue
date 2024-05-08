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
  <div class="music-name absolute cl-999 plr15" :style="{top: style.top, width: (collapse ? '450px' : '300px')}" style="right: 0; z-index: 100; box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2); height: auto">
    <div class="music-header ptb10 clearfix">
      <div class="left">音乐盒</div>
      <div class="right">
        <v-space>
          <span @click="handleSetting">
            设置
          </span>
          <span @click="handleLrc">
            歌词
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
    <div class="p10" v-if="collapse">
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
  useStore,
  watch,
  durationTrans
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

    const lrc: any = ref("")
    // `[00:00]侃侃 - 滴答，作词：高地，作曲：高地
    // [00:27]嘀嗒嘀嗒嘀嗒嘀嗒
    // [00:32]时针它不停在转动
    // [00:38]嘀嗒嘀嗒嘀嗒嘀嗒
    // [00:44]小雨它拍打着水花
    // [00:50]嘀嗒嘀嗒嘀嗒嘀嗒
    // [00:56]是不是还会牵挂他
    // [01:02]嘀嗒嘀嗒嘀嗒嘀嗒
    // [01:07]有几滴眼泪已落下
    // [01:16]嘀嗒嘀嗒嘀嗒嘀嗒
    // [01:22]寂寞的夜和谁说话
    // [01:28]嘀嗒嘀嗒嘀嗒嘀嗒
    // [01:34]伤心的泪儿谁来擦
    // [01:40]嘀嗒嘀嗒嘀嗒嘀嗒
    // [01:45]整理好心情再出发
    // [01:51]嘀嗒嘀嗒嘀嗒嘀嗒
    // [01:57]还会有人把你牵挂
    // [02:29]嘀嗒嘀嗒嘀嗒嘀嗒
    // [02:35]寂寞的夜和谁说话
    // [02:41]嘀嗒嘀嗒嘀嗒嘀嗒
    // [02:47]伤心的泪儿谁来擦
    // [02:53]嘀嗒嘀嗒嘀嗒嘀嗒
    // [02:59]整理好心情再出发
    // [03:04]嘀嗒嘀嗒嘀嗒嘀嗒
    // [03:10]还会有人把你牵挂
    // `

    // const LRC: any = `[00:00]老狼 - 同桌的你
    // [00:06]词：高晓松
    // [00:12]曲：高晓松
    // [00:19]编曲：高晓松
    // [00:25]制作人：黄小茂
    // [00:31]明天你是否会想起
    // [00:35]昨天你写的日记
    // [00:38]明天你是否还惦记
    // [00:42]曾经最爱哭的你
    // [00:46]老师们都已想不起
    // [00:49]猜不出问题的你
    // [00:53]我也是偶然翻相片
    // [00:57]才想起同桌的你
    // [01:00]谁娶了多愁善感的你
    // [01:04]谁看了你的日记
    // [01:08]谁把你的长发盘起
    // [01:11]谁给你做的嫁衣
    // [01:30]你从前总是很小心
    // [01:33]问我借半块橡皮
    // [01:37]你也曾无意中说起
    // [01:40]喜欢和我在一起
    // [01:44]那时候天总是很蓝
    // [01:48]日子总过得太慢
    // [01:52]你总说毕业遥遥无期
    // [01:55]转眼就各奔东西
    // [01:59]谁遇到多愁善感的你
    // [02:03]谁安慰爱哭的你
    // [02:06]谁看了我给你写的信
    // [02:10]谁把它丢在风里
    // [02:28]从前的日子都远去
    // [02:32]我也将有我的妻
    // [02:36]我也会给她看相片
    // [02:39]给她讲同桌的你
    // [02:43]谁娶了多愁善感的你
    // [02:46]谁安慰爱哭的你
    // [02:50]谁把你的长发盘起
    // [02:54]谁给你做的嫁衣
    // [02:57]Lalalalalala
    // [03:05]Lalalalalala
    // [03:08]Lalalalalala
    // [03:12]Lalalalalala
    // [03:16]Lalalalalala
    // [03:19]Lalalalalala
    // [03:23]Lalalalalala`

    const lrcObj: any = ref({})

    //this regex mathes the time [00.12.78]
    var pattern = /\[\d{2}:\d{2}\]/g,
      time_array: any = ref([]);

    // alert(lines)

    function handlePlay(e: any, index: any, status: any) {
      if (!status) {
        VueEvent.emit("navbarSetting", index);
      }
      isplay.value = !isplay.value
      if (isplay.value) {
        audio.value.play()
        settime()
      } else {
        audio.value.pause()
      }
    }

    function handleSetting() {
      collapse.value = !collapse.value
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
        console.log(audios.currentTime);

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
        playBackgroundMusic.value = false
        music.value = data
        audio.value.src = data.file
        isplay.value = true
        audio.value.load()
        audio.value.play()
        lrcInit(data.music_lrc)
        settime()
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
      handleLrc,
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
