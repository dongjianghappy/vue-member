<template>
  <div class="margin-left-5" style="background:#eee">
    <audio id='aa' src="http://127.0.0.1/uploadfile/music/a739d236bda6a83977d9ad03f5d4dac8.mp3" autoplay="true"></audio>
    <canvas  id="myCanvas" class="margin-top-8" style="border: 1px solid red;width: 500px; height: 40px;"></canvas>

    <!-- <video id="aa" controls="" autoplay="" name="media"><source src="" type="audio/mpeg"></video> -->
    
  </div>
</template>
<script setup lang="ts">
import { nextTick, inject,watch, onMounted } from 'vue'

defineExpose({
  canvas
})

const canvasObj = inject('canvasObj')
let audio: any = document.getElementById('listen_music');

  // watch(canvasObj, (newVal: any) => {
  //       nextTick(() => {
  //           if (newVal) {
  //               if (canvasObj) {
  //                   canvas(newVal)
  //               }
  //           }
  //       })
  //   })

onMounted(()=>{
    const aaaaa = document.getElementById("aa");
  if(aaaaa){
canvas(aaaaa)
  }
})
  
  function canvas(audio:any) {
     var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas: any = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        
        var r = barHeight + (25 * (i/bufferLength));
        var g = 250 * (i/bufferLength);
        var b = 50;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    audio.play();
    renderFrame();
}

</script>
