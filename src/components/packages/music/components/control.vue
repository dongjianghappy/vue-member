<template>
<div class="control" style="height: auto">
  <div class="flex align_center">
    <div style="width: 60px; height: 20px; line-height: 20px;">
      {{second || '00:00'}}
    </div>
    <div class="progress_bar" style="margin-bottom: 35px; flex: 1" id="music_progress_bar" @click="handlebar($event, data)">

      <div class="time_bar" id="music_time_bar"></div>

    </div>
    <div style="width: 60px; height: 20px; line-height: 20px;">
      {{data.currentMusic.time}}
    </div>
  </div>
  <div class="button-group plr10 pb10 flex">
    <div class="flex" style="width: 150px; align-items: center;">
      <div class="mr15 animate animate-paused" :class="{'animate-running': data.currentMusic.isplay}">
        <img src="/images/music.png" style="width: 45px; height: 45px; border-radius: 50%">
      </div>
      <div class="font12" style="flex: 1">
        <div class="mb5">音乐盒</div>
        <div>
          <marquee>{{data.currentMusic.music_name}}</marquee>
        </div>
      </div>
    </div>
    <div class="align_center flex" style="flex: 1; align-items: center">
      <div class="col-md-3 deg180"><i class="iconfont icon-next" title="上一曲" @click="handlePrevNext(-1)"></i></div>
      <div class="col-md-3"><i class="iconfont" :title="data.isplay ? '暂停' : '播放'" :class="`icon-${data.currentMusic.isplay ? 'stop' : 'play'}`" @click="handlePlay(data.currentMusic)"></i></div>
      <div class="col-md-3"><i class="iconfont icon-next" title="下一曲" @click="handlePrevNext(1)"></i></div>
    </div>
    <div class="flex align_right" style="width: 200px; align-items: center;">
      <div style="flex: 1"><i class="iconfont" :class="`icon-${data.setting.isloop == '1' ? 'loop-1' : 'unloop'}`" :title="data.setting.isloop == '1' ? '循环播放' : '单曲循环'" @click="handleLoop"></i></div>
      <!-- <div style="flex: 1"><i class="iconfont icon-list" @click="handOperate('aside')"></i></div> -->
      <!-- <div style="flex: 1"><i class="iconfont icon-sound"></i></div> -->
      <div style="flex: 1"><i class="iconfont icon-shezhi" title="设置" @click="handOperate('setting')"></i></div>
      <div style="flex: 1">
        <v-popover content="<i class='iconfont icon-more'></i>" arrow="tb" offset="top" :move="-50" keys="popover-audio">
          <div style="width: 100px">
            <ul class="font14">
              <li @click="handleLrc" :class="{'cl-333': data.setting.lrc_display === '0'}">桌面歌词</li>
            </ul>
          </div>
        </v-popover>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineProps,
  durationTrans,
  onMounted,
  ref,
  computed,
  watch,
  useStore
} from '@/utils'
import VueEvent from '@/utils/event'
import {
  currentMusic,
  playMusic,
  playPrevNext,
  playLoop,
  musicLrc
} from '../../music/fn'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  update: {
    type: Function,
    default: () => {
      return
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();
const emit: any = defineEmits(['operate'])
const store = useStore()
const second: any = ref("00:00")
const time: any = ref('00/00')
const timer: any = ref("")
const barStatus: any = ref(false)

// 监听路由
watch([() => props.data.currentMusic.id, props.data.currentMusic.isplay, barStatus.value], (newValues, prevValues) => {
  clearInterval(timer.value)
  let audio: any = document.getElementById('listen_music')
  settime(audio, props.data.currentMusic)
})

function handlePlay(param: any) {
  debugger
  if (!props.data.currentMusic.file) {
    proxy.$hlj.message({
      type: 'info',
      msg: "请选择播放歌曲"
    })
    return
  }
  playMusic(param, store)
}

function handlePrevNext(index: any) {
  playPrevNext(props.data.list, props.data.setting, props.data.currentMusic, index, store)
}

function handleLrc() {
  musicLrc(props.data.setting, store, props)
  props.update({
    lrc_display: props.data.setting.lrc_display
  })
}

function handleLoop() {
  playLoop(props.data.setting)
  store.commit('user/setPlaySetting', {
    name: 'isloop',
    value: props.data.setting.isloop
  })
  props.update({
    isloop: props.data.setting.isloop
  })
}

function handOperate(param: any) {
  emit('operate', param)
}

function handlebar(e: any, param: any) {
  let progress_bar: any = document.getElementById("music_progress_bar");
  let time_bar: any = document.getElementById("music_time_bar");
  let audio: any = document.getElementById('listen_music');
  let aaa: any = audio.duration * e.offsetX / progress_bar.clientWidth

  if (!props.data.currentMusic.file) {
    proxy.$hlj.message({
      type: 'info',
      msg: "请选择播放歌曲"
    })
    return
  }

  audio.currentTime = aaa
  barStatus.value = !barStatus.value
  props.data.currentMusic.isplay = true
  store.commit('user/setCurrentMusic', props.data.currentMusic)
  VueEvent.emit("isPlay");

  if (e.offsetX >= e.currentTarget.clientWidth) {
    time_bar.style.width = `${e.currentTarget.clientWidth}px`;
  } else if (e.offsetX < 20) {
    time_bar.style.width = '0px';
  } else {
    time_bar.style.width = e.offsetX + 'px';
  }
  VueEvent.emit("duration", audio.currentTime);
  param.isplay = true
  audio.play()
}

function settime(audio: any, param: any) {
  timer.value = setInterval(() => {
    const numbers = audio.currentTime / audio.duration
    let perNumber: any = (numbers * 100).toFixed(2)
    if (perNumber >= 100) {
      clearInterval(timer.value)
    }
    //秒数转换
    let time = audio.currentTime.toFixed(1)
    let minutes: any = Math.floor((time / 60) % 60)
    let seconds: any = Math.floor(time % 60)

    if (seconds < 10) {
      seconds = '0' + seconds
    }
    if (props.data.time == undefined && durationTrans(audio.duration) != 'NaN:NaN') {
      props.data.time = durationTrans(audio.duration)
    }
    second.value = durationTrans(audio.currentTime)
    let progress_bar: any = document.getElementById("music_progress_bar");
    let time_bar: any = document.getElementById("music_time_bar");
    if (progress_bar === null) {
      clearInterval(timer.value)
      return
    }
    let aaa: any = progress_bar.clientWidth * audio.currentTime / audio.duration
    time_bar.style.width = aaa + 'px';
  }, 100)

  audio.addEventListener('ended', function () {
    console.log("1");

    clearInterval(timer.value)
    if (props.data.setting.isloop === '1') {
      handlePrevNext(1)
    }
  })
}

onMounted(() => {
  let audio: any = document.getElementById('listen_music')
  settime(audio, props.data)
  VueEvent.emit("isPlay");
})
</script>

<style lang="less" scoped>
.huhuweiwei {
  background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: left center;
  background-clip: padding-box;
  box-sizing: border-box;
}
</style>
