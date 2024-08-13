<template>
<!-- <div id="canvas-wrap"></div> -->
<canvas id="canvas" style="width: 100%; height: 100%;"></canvas>
</template>

<script setup lang="ts">
import {
  defineExpose,
  nextTick,
  inject,
  watch,
  onMounted,
  ref
} from 'vue'
import VueEvent from '@/utils/event'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

let animationId: any = ref("")

defineExpose({
  canvas,
  animationId
})
function canvas() {
  // audio.load();
  // audio.play();
  console.log("11111111111111111");
  
   let canv = document.createElement('canvas')
   canv.id = "canvas"
   canv.style.width = "100%"
   canv.style.height = "100%"

  //  let canvasWrap = document.getElementById('canvas-wrap')
  //  canvasWrap?.appendChild(canv)
  
  let audio: any = document.getElementById('listen_music')
  let context = new AudioContext();
  let src = context.createMediaElementSource(audio);
  let analyser = context.createAnalyser();
  
  let canvas: any = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let ctx = canvas.getContext("2d");
  // audio.load();
  // audio.play();
  src.connect(analyser);
  analyser.connect(context.destination);

  analyser.fftSize = 256;

  let bufferLength = analyser.frequencyBinCount;

  let dataArray = new Uint8Array(bufferLength);

  let WIDTH = canvas.width;
  let HEIGHT = canvas.height;

  let barWidth = (WIDTH / bufferLength) * 1.5;
  let barHeight;
  let x = 0;

  function renderFrame() {
    if(props.data.isplay){
      animationId.value = requestAnimationFrame(renderFrame);
    }else{
      cancelAnimationFrame(animationId.value)
    }
    

    x = 0;

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      let r = barHeight + (25 * (i / bufferLength));
      let g = 250 * (i / bufferLength);
      let b = 50;

      ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ", 0.5)";
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
    
  }
  renderFrame();
  VueEvent.on("isPlay", () => {
    renderFrame();
  })
}
</script>