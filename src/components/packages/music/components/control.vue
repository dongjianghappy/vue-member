<template>
<div class="control">
  <div class="progress_bar relative" style="margin-bottom: 35px;" id="music_progress_bar" @click="handlebar($event, data)">
    <div class="time_bar" id="music_time_bar"></div>
    <span class="absolute" style="top: 3px; left: 0; height: 20px; line-height: 20px;">
      {{second || '00:00'}}
    </span>
    <span class="absolute" style="top: 3px; right: 0; height: 20px; line-height: 20px;">
      {{data.time}}
    </span>
  </div>
  <div class="button-group pl20">
    <div class="plr35 align_center" style="flex: 1">
      <div class="col-md-4 deg180"><i class="iconfont icon-next" @click="handlePrevNextPlay(-1)"></i></div>
      <div class="col-md-4"><i class="iconfont" :class="`icon-${data.isplay ? 'stop' : 'play'}`" @click="handlePlay(data)"></i></div>
      <div class="col-md-4"><i class="iconfont icon-next" @click="handlePrevNextPlay(1)"></i></div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  durationTrans,
  onMounted,
  ref
} from '@/utils'
import VueEvent from '@/utils/event'
export default defineComponent({
  name: 'v-Control',
  props: {
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup(props, context) {
    const second: any = ref("00:00")
    const time: any = ref('00/00')
    VueEvent.on("play_music", (param: any) => {
      let audio: any = document.getElementById('listen_music')
      settime(audio, props.data)
    })

    function handlePlay(param: any) {
      let audio: any = document.getElementById('listen_music')
      param.isplay = !param.isplay
      if (param.isplay) {
        audio.play()
        settime(audio, param)
      } else {
        audio.pause()
      }
    }

    function handlePrevNextPlay(i: any) {
      let index = props.dataList.findIndex((list: any) => list.id === props.data.id)
      if (index == 0 && i == -1) {
        VueEvent.emit("musicPley", props.dataList[props.dataList.length - 1]);
      } else if (index === props.dataList.length - 1 && i == 1) {
        VueEvent.emit("musicPley", props.dataList[0]);
      } else {
        let number = index + i
        VueEvent.emit("musicPley", props.dataList[number]);
        VueEvent.emit("play_music", props.dataList[number]);
      }
    }

    function handlebar(e: any, param: any) {
      let progress_bar: any = document.getElementById("music_progress_bar");
      let time_bar: any = document.getElementById("music_time_bar");
      let audio: any = document.getElementById('listen_music');
      let aaa: any = audio.duration * e.offsetX / progress_bar.clientWidth
      audio.currentTime = aaa
      settime(audio, param)

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
      const timer = setInterval(() => {
        const numbers = audio.currentTime / audio.duration
        let perNumber: any = (numbers * 100).toFixed(2)
        if (perNumber >= 100) {
          clearInterval(timer)
        }
        //秒数转换
        let time = audio.currentTime.toFixed(1)
        let minutes: any = Math.floor((time / 60) % 60)
        let seconds: any = Math.floor(time % 60)

        if (seconds < 10) {
          seconds = '0' + seconds
        }
        if (props.data.time == undefined &&  durationTrans(audio.duration) != 'NaN:NaN') {
          debugger
          props.data.time = durationTrans(audio.duration)
        }
        second.value = durationTrans(audio.currentTime)
        let progress_bar: any = document.getElementById("music_progress_bar");
        let time_bar: any = document.getElementById("music_time_bar");
        if (progress_bar === null) {
          clearInterval(timer)
          return
        }
        let aaa: any = progress_bar.clientWidth * audio.currentTime / audio.duration
        time_bar.style.width = aaa + 'px';
      }, 30)

      audio.addEventListener('ended', function () {
        clearInterval(timer)
      })
    }

    onMounted(() => {
      let audio: any = document.getElementById('listen_music')
      settime(audio, props.data)
    })
    return {
      second,
      time,
      handlePlay,
      handlePrevNextPlay,
      handlebar
    }
  }
})
</script>
