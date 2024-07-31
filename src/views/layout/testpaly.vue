<template>
<div class="p50" style="background: #000; z-index: 1000000">
  <div style="display: flex">
    <div style="width: 25px">
      <i class="iconfont icon-play" @click="handlePlay"></i>
    </div>
    <div style="width: 80px">{{duration}}/{{secondssss}}</div>
    <div id="progress_bar" class="progress_bar relative" @click="handlebar">
      <div id="time_bar" class="time_bar"></div>
      <div class="absolute pointer box" id="slider" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup"></div>
    </div>
    <div style="width: 25px">
      <i class="iconfont icon-sound" @click="handleSound"></i>
    </div>
    <div style="width: 120px">
      <div id="sound_bar" class="sound_bar relative" @click="handleSoundBar">
        <div id="sound_innbar" class="sound_innbar"></div>
        <div class="absolute pointer sound_box" id="sound-slider" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup"></div>
      </div>
    </div>
  </div>

  <audio id="audio" src="http://www.07sucai.com/uploadfile/music/a739d236bda6a83977d9ad03f5d4dac8.mp3" style="display: none"></audio>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch
} from '@/utils'
export default defineComponent({
  name: 'TextView',
  setup() {

    const isplay: any = ref(false)
    const drag: any = ref(false)
    const duration: any = ref('0:00')
    const secondssss: any = ref('0:00')
    const vol: any = ref("0.1")
    let audio: any = document.getElementById('audio');

    // 监听弹窗变量
    watch(audio, (newValues, prevValues) => {
      settime()
    })

    function handlebar(e: any) {
      let progress_bar: any = document.getElementById('progress_bar');
      let slider: any = document.getElementById('slider');
      let time_bar: any = document.getElementById('time_bar');
      let audio: any = document.getElementById('audio');
      let aaa: any = duration.value * 60 * e.offsetX / progress_bar.clientWidth
      let time: any = audio.currentTime = aaa
      settime()

      if (e.target === slider) {
        //点击滑块自身不做任何事情                
      } else {
        if (e.offsetX >= e.clientWidth) {
          slider.style.left = `${e.clientWidth}px`;
          time_bar.style.width = `${e.clientWidth}px`;
        } else if (e.offsetX < 20) {
          slider.style.left = '0px';
          time_bar.style.width = '0px';
        } else {
          slider.style.left = e.offsetX - 10 + 'px';
          time_bar.style.width = e.offsetX - 10 + 'px';
        }
      }
      audio.play()
    }

    //修改drag的状态        
    function mousedown() {
      drag.value = true;
    }
    //释放按钮绑定在document上,保证在整个页面容器里面任何地方松开按钮都能修改drag的状态        
    function mouseup() {
      drag.value = false;
    }
    // 使滑块和填充块跟随移动,这里使用的pageX,需要计算和视窗左侧的距离而不是和滑动块左侧的距离       
    function mousemove(e: any) {
      //       let progress_bar: any = document.getElementById('progress_bar');
      //       let slider: any = document.getElementById('slider');
      //       let time_bar: any = document.getElementById('time_bar');
      // debugger
      //       if (drag.value == true) {
      //         if (e.pageX > progress_bar.clientWidth) {
      //           slider.style.left = `${e.clientWidth}px`;
      //           time_bar.style.width = `${e.clientWidth}px`;
      //         } else if (e.pageX < 29) {
      //           slider.style.left = '0px';
      //           time_bar.style.width = '0px';
      //         } else {
      //           slider.style.left = e.pageX - 19 + 'px';
      //           time_bar.style.width = e.pageX - 19 + 'px';
      //         }
      //       }
    }

    function handlePlay() {
      isplay.value = !isplay.value
      let audio: any = document.getElementById('audio');
      if (isplay.value) {
        audio.play()
        settime()
      } else {
        audio.pause()
      }
    }

    // 音量控制
    function handleSound() {
      let sound_bar: any = document.getElementById('sound_bar');
      let sound_slider: any = document.getElementById('sound-slider');
      let sound_innbar: any = document.getElementById('sound_innbar');
      let audio: any = document.getElementById('audio');
      if (audio.muted) {
        audio.muted = false
        sound_slider.style.left = `${sound_bar.clientWidth}px`;
        sound_innbar.style.width = `${sound_bar.clientWidth}px`;
      } else {
        audio.muted = true
        sound_slider.style.left = '0px';
        sound_innbar.style.width = '0px';
      }
    }

    function handleSoundBar(e: any) {
      let sound_bar: any = document.getElementById('sound_bar');
      let sound_slider: any = document.getElementById('sound-slider');
      let sound_innbar: any = document.getElementById('sound_innbar');
      let audio: any = document.getElementById('audio');
      
        if (e.offsetX >= e.clientWidth) {
          sound_slider.style.left = `${e.clientWidth}px`;
          sound_innbar.style.width = `${e.clientWidth}px`;
        }else {
          sound_slider.style.left = e.offsetX+'px';
          sound_innbar.style.width = e.offsetX+'px';
        }
        audio.volume = e.offsetX/sound_bar.clientWidth
      
    }

    function settime() {
      let audio: any = document.getElementById('audio');

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

        secondssss.value = minutes + seconds
        duration.value = (audio.duration / 60).toFixed(2) // 获取时长

        let progress_bar: any = document.getElementById('progress_bar');
        let slider: any = document.getElementById('slider');
        let time_bar: any = document.getElementById('time_bar');

        let aaa: any = progress_bar.clientWidth * audio.currentTime / audio.duration
        slider.style.left = `${aaa}px`;
        time_bar.style.width = `${aaa}px`;
      }, 30)

    }

    onMounted(() => {

    })

    return {
      handlePlay,
      handleSound,
      duration,
      secondssss,
      handlebar,
      mousedown,
      mousemove,
      mouseup,
      handleSoundBar
    }
  },
})
</script>
