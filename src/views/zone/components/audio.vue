<template>
<div class="music-wrap p15" style="margin: 6px; background: var(--card-background); border-radius: 8px;">
  <div class="sound-content">
    <div class="sound-thumbnail">
      <div class="round-1">
        <div class="round-2">
          <div class="round-3">
            <div class="round-4" :class="{play: data.isplay}"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="sound-info">
      <div class="sound-title flex" style="line-height: 35px;" @click="handleRoute(data)">
        <p class="nowrap"  style="flex: 1" >{{data.title}}</p>
        <i class="iconfont icon-arrow" style="width: 5px" />
      </div>
      <div class="sound-tag cl-999">标签: {{data.tag || '无'}}</div>
      <!-- <div class="sound-btn">
                    <span class="sound-down"> 播放 {{item.play}} </span>
                    <span class="sound-collect">下载 {{item.download}}</span>
                  </div> -->
    </div>
  </div>
  <div class="name">
    <div class="audio-box">
      <div style="display: flex">
        <div style="width: 25px">
          <i class="iconfont pointer play-btn" :class="`icon-${data.isplay ? 'audio' : 'listen'}`" @click="handlePlay(data)"></i>
        </div>
        <div class="duration" style="width: 120px; padding-top: 3px">
          {{data.secondssss || '00:00'}}/{{data.time}}
        </div>
        <div class="progress_bar relative" :id="`progress_bar_${data.id}`" style="width: 100%;" @click="handlebar($event, data)">
          <div class="time_bar" :id="`time_bar_${data.id}`"></div>
          <div class="absolute pointer slider box" :id="`slider_${data.id}`" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup"></div>
        </div>
      </div>
      <audio :class="`audio_${data.id}`" :src="data.file" style="display: none" class="audio"></audio>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  useStore,
  useRoute,
  ref,
  codings,
  durationTrans
} from '@/utils'

export default defineComponent({
  name: 'HomeView',
  components: {

  },
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
    }
  },
  setup(props, context) {
    const coding: any = codings.sound
    const store = useStore();
    const route = useRoute();
    const drag: any = ref(false)
    const duration: any = ref('0:00')
    const secondssss: any = ref('0:00')
    let query: any = computed(() => route.query || "");

    function handlePlay(param: any) {
      let audio: any = document.getElementsByClassName('audio_' + param.id)

      props.dataList.map((item: any) => {
        if (param.id !== item.id) {
          let audio1: any = document.getElementsByClassName('audio_' + item.id)
          item.isplay = false
          audio1[0].pause()
        }
      })

      param.isplay = !param.isplay
      if (param.isplay) {
        console.log("1111");

        audio[0].play()
        settime(audio[0], param)
      } else {
        console.log("2222");

        audio[0].pause()
      }
    }

    function handlebar(e: any, param: any) {
      let progress_bar: any = document.getElementById(`progress_bar_${param.id}`);
      let slider: any = document.getElementById(`slider_${param.id}`);
      let time_bar: any = document.getElementById(`time_bar_${param.id}`);
      let audio: any = document.getElementsByClassName(`audio_${param.id}`);
      let aaa: any = audio[0].duration * e.offsetX / progress_bar.clientWidth
      audio[0].currentTime = aaa

      props.dataList.map((item: any) => {
        let audio1: any = document.getElementsByClassName('audio_' + item.id)
        item.isplay = false
        audio1[0].pause()
      })

      settime(audio[0], param)

      if (e.target === slider) {
        //点击滑块自身不做任何事情                
      } else {
        if (e.offsetX >= e.currentTarget.clientWidth) {
          slider.style.left = `${e.currentTarget.clientWidth}px`;
          time_bar.style.width = `${e.currentTarget.clientWidth}px`;
        } else if (e.offsetX < 20) {
          slider.style.left = '0px';
          time_bar.style.width = '0px';
        } else {
          slider.style.left = e.offsetX + 'px';
          time_bar.style.width = e.offsetX + 'px';
        }
      }
      param.isplay = true
      audio[0].play()
    }

    function settime(audio: any, param: any) {
      const timer = setInterval(() => {
        const numbers = audio.currentTime / audio.duration
        let perNumber: any = (numbers * 100).toFixed(2)
        if (perNumber >= 100) {
          drag.value = false;
          clearInterval(timer)
        }
        //秒数转换
        let time = audio.currentTime.toFixed(1)
        let minutes: any = Math.floor((time / 60) % 60)
        let seconds: any = Math.floor(time % 60)

        if (seconds < 10) {
          seconds = '0' + seconds
        }

        param.secondssss = durationTrans(audio.currentTime) //minutes + seconds
        duration.value = (audio.duration / 60).toFixed(2) // 获取时长

        let progress_bar: any = document.getElementById(`progress_bar_${param.id}`);
        let slider: any = document.getElementById(`slider_${param.id}`);
        let time_bar: any = document.getElementById(`time_bar_${param.id}`);

        let aaa: any = progress_bar.clientWidth * audio.currentTime / audio.duration
        slider.style.left = aaa + 'px';
        time_bar.style.width = aaa + 'px';
      }, 30)

      audio.addEventListener('ended', function () {
        setTimeout(function () {
          let slider: any = document.getElementById(`slider_${param.id}`);
          let time_bar: any = document.getElementById(`time_bar_${param.id}`);
          slider.style.left = '0px'
          time_bar.style.width = '0px'
          param.secondssss = "00:00"
          param.isplay = false
        }, 31)
      })

    }

    function handleRoute(param: any) {
      window.open(`http://www.yunxi10.com/sound/${param.id}.html`)
    }

    return {
      coding,
      query,
      handlePlay,
      handlebar,
      handleRoute
    }
  }
})
</script>

<style lang="less" scoped>
.music-wrap {
  background: #fff;
  box-shadow: 0 1px 3px rgba(27, 95, 160, 0.1);
  border-radius: 4px;
  margin: 10px;
  padding: 20px 15px 10px;
  transition: all .2s;

  .sound-content {
    display: flex;

    .sound-thumbnail {

      width: 100px;
      height: 100px;

      .round-1 {
        background: #000;
        border-radius: 50%;
        padding: 30px;
        width: 100px;
        height: 100px;
        text-align: center;

        &.play {
          background: linear-gradient(to top,
              #666,
              #000);
        }

        .round-2 {
          background: #fff;
          display: inline-block;
          border-radius: 50%;
          padding: 5px;
          width: 40px;
          height: 40px;

          .round-3 {
            background: #000;
            display: inline-block;
            border-radius: 50%;
            padding: 5px;
            width: 30px;
            height: 30px;

            .round-4 {
              background: #fff;
              display: inline-block;
              border-radius: 50%;
              width: 20px;
              height: 20px;

              &.play {
                background: #f00;
              }
            }
          }
        }
      }

      img {
        display: inline;
        width: 100px;
        height: 100px;
        border-radius: 50%;

        &.play {
          background: linear-gradient(to top,
              rgba(255, 255, 255, 0.15),
              #039be5);
        }
      }
    }

    .sound-info {
      padding-left: 20px;
      width: 100%;

      .sound-tag {
        margin-top: 12px;

        a {
          color: #999;
        }
      }

      .sound-btn {
        display: flex;
        margin-top: 12px;
        height: 30px;
        font-size: 14px;
        color: #999;

        .sound-down,
        .sound-collect {
          flex: 1;
          cursor: pointer;
        }
      }
    }
  }

  .name {
    padding: 10px 0;
    height: 40px;
    font-size: 14px;
  }

  &:hover {
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }

}
</style>
