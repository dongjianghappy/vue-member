<template>
<canvas id="canvas" style="width: 100%; height: 200px;"></canvas>
</template>

<script setup lang="ts">
import {
  defineExpose,
  nextTick,
  inject,
  watch,
  onMounted
} from 'vue'

defineExpose({
  canvas
})

function canvas() {
  // audio.load();
  // audio.play();
  
  let audio: any = document.getElementById('listen_music')
  var context = new AudioContext();
  var src = context.createMediaElementSource(audio);
  var analyser = context.createAnalyser();
  
  var canvas: any = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");
  // audio.load();
  // audio.play();
  src.connect(analyser);
  analyser.connect(context.destination);

  analyser.fftSize = 256;

  var bufferLength = analyser.frequencyBinCount;
  console.log(bufferLength);

  var dataArray = new Uint8Array(bufferLength);

  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;

  var barWidth = (WIDTH / bufferLength) * 1.5;
  var barHeight;
  var x = 0;

  function renderFrame() {
    requestAnimationFrame(renderFrame);

    x = 0;

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      var r = barHeight + (25 * (i / bufferLength));
      var g = 250 * (i / bufferLength);
      var b = 50;

      ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ", 0.5)";
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
      console.log(x);
      
    }
  }
  renderFrame();
}
</script>
