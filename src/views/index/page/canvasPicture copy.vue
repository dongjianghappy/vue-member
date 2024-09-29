<template>
<div class="container fixed flex" style="background: var(--module-background); top: 60px; bottom: 0px; left: 0; right: 0">
  <div class="flex" style="background: var(--card-background); position: absolute;
    top: 25px;
    bottom: 25px;
    left: 25px;
    right: 25px; border-radius: 8px; overflow-x: auto;">
    <canvas id="canvas" width="10000" height="800"></canvas>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  useStore,
  useRoute,
  computed,
  ref,
  onMounted
} from '@/utils'

let chooseNode: any = ref(null);
const nodeClickArray: any = ref([]);
const spaceing: any = 150
const data: any = {
  start: '起点',
  list: [{
      time: '2000年',
      list: [{
        time: '111'
      },
      {
        time: '222'
      },
      {
        time: '333'
      }
      ]
    },
    {
      time: '2001年',
      list: [{
        time: '444'
      },
      {
        time: '555'
      },
      {
        time: '666'
      }]
    },
    {
      time: '2002年',
      list: [{
        time: '777'
      },
      {
        time: '888'
      },
      {
        time: '999'
      }]
    },
    {
      time: '2003年',
      list: [{
        time: '101010'
      },
      {
        time: '111111'
      },
      {
        time: '121212'
      }]
    },
    {
      time: '2004年'
    },
    {
      time: '2005年'
    }
  ]
}

// 绘制圆角矩形
function radiusButton(ctx: any, x: any, y: any, width: any, height: any, radius: any, color_back: any) {
  ctx.beginPath();
  ctx.fillStyle = color_back
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
  ctx.lineTo(x + width - radius, y + height);
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  ctx.lineTo(x + width, y + radius);
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
  ctx.lineTo(x + radius, y);
  ctx.quadraticCurveTo(x, y, x, y + radius);
  ctx.fill()
}

// 绘制节点
function node(ctx: any, index: any, sub: any = 0) {
  let x0 = 300
  let y1 = 390 + sub * spaceing
  console.log(x0 + x0 * index);

  ctx.beginPath();
  ctx.arc(x0 + x0 * index, y1, 15, 0, Math.PI * 2, true);
  ctx.fillStyle = "rgba(108,212,148,1)";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x0 + x0 * index, y1, 9, 0, Math.PI * 2, true);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fill();

  // 绑定节点点击事件
  const pointInfo={
  x: x0 + x0 * index,
  y: y1,
  date: "111",
  content: "222",
  value: "333"
  };
  nodeClickArray.value.push(pointInfo);  
}

// 贝塞尔曲线
function line(ctx: any, x0: any, y0: any, x1: any, y1: any) {

  ctx.beginPath();
  ctx.strokeStyle = "#24b99a";
  ctx.lineWidth = 10;
  ctx.moveTo(x0, y0); //贝塞尔曲线起始点
  // ctx.lineTo(50, 150); //贝塞尔曲线中间竖线
  // ctx.quadraticCurveTo(x0, 432,x0, 543);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function draw(ctx: any, data: any, aaa: any = 0, sub: any = 0){

  let bbb = aaa
  data.forEach((item: any, index: any) => {
    // 根据数据奇数偶数设置显示位置，奇数在上面，偶数在下面
    let arrow = index%2 == 0 ? 1 : -1
    node(ctx, index+bbb, sub)
    text(ctx, item.time, 300 * (1 + index+bbb) + 10, 430, sub)
    line(ctx, 300 * (1 + index+bbb) + 10, 390 + sub * spaceing, 300 * (1 + index+bbb + 1), 390 + sub * spaceing)

    if(item.list && item.list.length > 0){
      // 节点第一条分叉线
      line(ctx, 300 * (1 + index), 390 + (arrow == 1 ? 10 : -10), 300 * (1 + index), 390 + arrow * spaceing)
      draw(ctx, item.list, index, arrow)
    }
  })
}

// 绘制文字

function text(ctx: any, text: any, x0: any, y0: any, sub: any = 0){
  ctx.fillStyle = "#fff";
  ctx.font = "18px ''";
  ctx.textAlign = "center";
  ctx.fillText(text, x0, y0 + sub * spaceing);
}

function init() {
  const canvas: any = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  nodeClickArray.value = []
  ctx.width = "1500"
  ctx.save();

  radiusButton(ctx, 50, 365, 120, 50, 8, '#333');
  text(ctx, data.start, 110, 400)
  line(ctx, 170, 390, 290, 390)
  draw(ctx, data.list)

  clickNode(canvas, ctx)
}

function clickNode(canvas: any, ctx: any){
  canvas.addEventListener("click", (event: any)=>{
    debugger
  //清除之前的弹窗
  if(chooseNode.value != null){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      init()
      //  drawYLabel(canvas_options,ctx); //绘制y轴坐标
      //  drawStartButton(ctx,canvas_options);
      //  drawData(ctx,datalist.showDataInfo,canvas_options);
      chooseNode.value = null
      return
  }
  //判断点击节点
  let rect = canvas.getBoundingClientRect();
  let zoom = rect.width/10000;
  let x = (event.clientX/zoom - rect.left/zoom).toFixed(2);
  let y = (event.clientY/zoom - rect.top/zoom).toFixed(2);

  for(var t=0;t<nodeClickArray.value.length;t++){
      ctx.beginPath();
      ctx.arc(nodeClickArray.value[t].x,nodeClickArray.value[t].y,15,0,Math.PI*2,true);
      
      if(ctx.isPointInPath(x, y)){
          drawDialog(ctx, 200, 80, nodeClickArray.value[t].x, nodeClickArray.value[t].y-110)
          ctx.restore();
          chooseNode.value = t
          break;
      }else{
          chooseNode.value = null
      }
  }
});
}

function drawDialog(ctx: any, width: any, height: any, x: any, y: any){
  ctx.beginPath();
  ctx.fillStyle="rgba(255, 255, 255, 0.8)";
  ctx.fillRect(x,y,width,height);
  ctx.font="22px ''";
  ctx.fillStyle="#fff";
  ctx.textAlign = 'left';
  ctx.textBaseline="top";
}

onMounted(() => {
  init()
})
</script>
