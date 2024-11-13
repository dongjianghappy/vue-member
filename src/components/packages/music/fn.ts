import { setting } from '@/assets/const'
import VueEvent from '@/utils/event'

// 歌曲列表添加处理
export const musicPush = async (param: any, musicList: any) => {
  param.map(((item: any) => {
    const index = musicList.findIndex((list: any) => list.id === item.music_id)
    if (item.music_file && index === -1) {
      musicList.push({
        id: item.music_id,
        music_name: item.music_name,
        file: item.music_file,
        music_lrc: item.music_lrc,
        time: item.music_time
      })
    }
  }))
}

// 播放当前歌曲
export const currentMusic = async (param: any, setting: any, store: any, isInit: any = false) => {

  if(!param){
    return
  }

  const music: any = {}
  const audio_el = document.getElementById('listen_music')
  audio_el && audio_el.remove()
debugger
  const _audio = document.createElement('audio')
  _audio.id = "listen_music"
  _audio.loop = setting.isloop === '0' ? true : false 
  _audio.autoplay = true
  _audio.src = param.file

  const audio_wrap = document.getElementById('audio_wrap')
  audio_wrap && audio_wrap.appendChild(_audio)

  music.id = param.id
  music.file = param.file
  music.music_name = param.music_name
  music.music_lrc = param.music_lrc
  music.time = param.time
  music.isplay = true
  music.lrc = ""

  store.commit('user/setCurrentMusic', music)

  if(isInit){
    return
  }

  await canvas(music)

  const el: any = document.getElementById("canvas");
  if(el){
    animationFrame(music,'canvas')
  }
}

// 播放音乐
export const playMusic = (param: any, store: any) => {
  const audio: any = document.getElementById('listen_music')
  param.isplay = !param.isplay
  if (param.isplay) {
    audio.play()
    VueEvent.emit("isPlay");
  } else {
    audio.pause()
  }
  store.commit('user/setCurrentMusic', param)
}

// 播放暂停
export const playStop = (param: any) => {
  const audio: any = document.getElementById('listen_music')
  param.isplay = !param.isplay
  if (param.isplay) {
    audio.play()
    // settime(audio, param)
  } else {
    audio.pause()
  }
}

// 上下曲
export const playPrevNext = (param: any, setting: any, data: any, number: any, store: any) => {
  const index = param.findIndex((list: any) => list.id === data.id)
  let music = ""
  debugger
  if (index == 0 && number == -1) {
    music = param[param.length - 1]
  } else if (index === param.length - 1 && number == 1) {
    music = param[0]
  } else {
    const key = index + number
    music = param[key]
  }
  currentMusic(music, setting, store)
}

// 循环播放
export const playLoop = (param: any) => {
  const audio: any = document.getElementById('listen_music')
  param.isloop = param.isloop === '0' ? '1' : '0'
  audio.loop = param.isloop === '1' ? false : true
}

// 歌词展示设置
export const musicLrc = (param: any, store: any, props: any) => {
  param.lrc_display = param.lrc_display === '0' ? '1' : '0'
  VueEvent.emit("lrc", );
  store.commit('user/setPlaySetting', {
    name: 'lrc_display',
    value: param.lrc_display
  })
}


// 音乐盒主题样式
export const canvas = (param: any) => {
  const audio: any = document.getElementById('listen_music')
  const context = new AudioContext();
  const src = context.createMediaElementSource(audio);
  const analyser = context.createAnalyser();

  const win: any = window
  win.analyser = analyser
  src.connect(analyser);
  analyser.connect(context.destination);

  analyser.fftSize = 256;
}

// 动画帧
export const animationFrame = (param: any, el: any) => {
  
  let animationId: any = ""
  const canvas: any = document.getElementById(el);
  
  canvas.width = window.innerWidth;
  canvas.height = 300;
  const ctx = canvas.getContext("2d");
  
  const win: any = window
  const analyser = win.analyser

  const bufferLength = analyser.frequencyBinCount;

  const dataArray = new Uint8Array(bufferLength);

  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  const barWidth = (WIDTH / bufferLength) * 1.8;
  let barHeight;
  let x = 0;

  function renderFrame() {
    if(param.isplay){
      animationId = requestAnimationFrame(renderFrame);
    }else{
      cancelAnimationFrame(animationId)
    }
    x = 0;

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      const r = barHeight + (25 * (i / bufferLength));
      const g = 250 * (i / bufferLength);
      const b = 50;

      const root: any = document.querySelector(":root")
      let color: any = getComputedStyle(root).getPropertyValue('--color-primary')
      color = color.split('(')[1]
      color = color.split(')')[0]
      color = color.split(',')

      // ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ", 0.25)";
      ctx.fillStyle = "rgba(" + color[0] + "," + color[1] + "," + color[2] + ", 0.1)";
      ctx.fillRect(x, HEIGHT - barHeight  + 60, barWidth, barHeight);

      x += barWidth + 1;
    }
    
  }
  renderFrame();
  VueEvent.on("isPlay", () => {
    renderFrame();
  })
}