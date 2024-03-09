<template>
<div class="control">
  <div class="progress_bar relative" :id="`progress_bar_${data.id}`" @click="handlebar($event, data)">
    <div class="time_bar" :id="`time_bar_${data.id}`"></div>
  </div>
  <div class="button-group pl20">
    <div>
      <i class="iconfont" :class="`icon-${data.isplay ? 'stop' : 'play'}`" @click="handlePlay(data)"></i>
    </div>
    <div class="duration">
      {{data.secondssss || '00:00'}}/{{data.time}}
    </div>
    <div style="flex: 1"></div>
    <!-- <div style="width: 80px">
      <v-space>
        <v-fullscreen2 /><v-fullscreen />
      </v-space>
    </div> -->
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  durationTrans
} from '@/utils'
import VueEvent from '@/utils/event'
export default defineComponent({
  name: 'v-Button',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup(props, context) {
    VueEvent.on("plays", (param: any) => {
      let audio: any = document.getElementsByClassName('video_' + param.id)
      if (param.isplay) {
        settime(audio[0], param)
      }
    })

    function handlePlay(param: any) {
      let audio: any = document.getElementsByClassName('video_' + param.id)
      param.isplay = !param.isplay
      if (param.isplay) {
        audio[0].play()
        settime(audio[0], param)
      } else {
        audio[0].pause()
      }
    }

    function handlebar(e: any, param: any) {
      let progress_bar: any = document.getElementById(`progress_bar_${param.id}`);
      let time_bar: any = document.getElementById(`time_bar_${param.id}`);
      let audio: any = document.getElementsByClassName(`video_${param.id}`);
      let aaa: any = audio[0].duration * e.offsetX / progress_bar.clientWidth
      audio[0].currentTime = aaa

      settime(audio[0], param)

      if (e.offsetX >= e.currentTarget.clientWidth) {
        time_bar.style.width = `${e.currentTarget.clientWidth}px`;
      } else if (e.offsetX < 20) {
        time_bar.style.width = '0px';
      } else {
        time_bar.style.width = e.offsetX + 'px';
      }

      param.isplay = true
      audio[0].play()
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
        param.secondssss = durationTrans(audio.currentTime)

        let progress_bar: any = document.getElementById(`progress_bar_${param.id}`);
        let time_bar: any = document.getElementById(`time_bar_${param.id}`);

        let aaa: any = progress_bar.clientWidth * audio.currentTime / audio.duration
        time_bar.style.width = aaa + 'px';
      }, 30)

      audio.addEventListener('ended', function () {
        setTimeout(function () {
          let time_bar: any = document.getElementById(`time_bar_${param.id}`);
          time_bar.style.width = '0px'
          param.secondssss = "00:00"
          param.isplay = false
        }, 31)
      })

    }
    return {
      handlePlay,
      handlebar
    }
  }
})
</script>
