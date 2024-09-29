<template>
<div class="container trackmap-wrap fixed flex">
  <div class="trackmap">
    <div class="relative p15 font24 align_center">
      <span class="absolute" style="left: 250px; top: 15px; z-index: 100">
        <v-back />
      </span>
      {{detail.name}}示意图
    </div>
    <div class="trackmap-canvas">
      <canvas id="canvas" width="10000" height="550"></canvas>
    </div>
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

const store = useStore()
const route = useRoute()
let chooseNode: any = ref(null);
const nodeClickArray: any = ref([]);
const options: any = {
  lineWidth: 10,
  color: ['red', '#24b99a'],
  startX: 300,
  startY: 300,
  spaceX: 300,
  spaceY: 150
}
const spaceing: any = 150
const detail: any = ref({})

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
function node(ctx: any, x: any, y: any) {

  ctx.beginPath();
  ctx.arc(x, y, 15, 0, Math.PI * 2, true);
  ctx.fillStyle = "rgba(108,212,148,1)";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y, 9, 0, Math.PI * 2, true);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fill();

  // 绑定节点点击事件
  const pointInfo = {
    x: x,
    y: y,
    date: "111",
    content: "222",
    value: "333"
  };
  nodeClickArray.value.push(pointInfo);
}

// 绘制文字
function text(ctx: any, x: any, y: any, text: any) {
  ctx.fillStyle = "#fff";
  ctx.font = "18px ''";
  ctx.textAlign = "center";
  ctx.fillText(text, x, y + 40);
}

// 贝塞尔曲线
function line(ctx: any, x0: any, y0: any, x1: any, y1: any, width: any = options.lineWidth, color: any = options.color) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.moveTo(x0, y0); //贝塞尔曲线起始点
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function basicXY(){

}

// 图像绘制
function draw(ctx: any, data: any, aaa: any = 'main', sub: any = 0) {
  let { line_width, line_color } = data
  data.list && data.list.forEach((item: any, index: any) => {

    basicXY()
    let arrow = index % 2 == 0 ? 1 : -1 // 根据数据奇数偶数设置显示位置，奇数在上面，偶数在下面
    let x = options.startX + (index + (aaa != 'main' ? aaa : 0)) * options.spaceX // 基本 x 坐标位置
    let y = options.startY + sub * options.spaceY // 基本 y 坐标位置

    if (item.list && item.list.length > 0) {

      // 直线
      if (detail.value.display_type === '2') {
        line(ctx, x, y, x + options.spaceX, y + arrow * options.spaceY, line_width, line_color) // 线条绘制
      }
      // 弧线
      else {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + options.spaceX - 250, y + arrow * options.spaceY, x + options.spaceX, y + arrow * options.spaceY);
        ctx.strokeStyle = item.line_color;
        ctx.stroke();
      }

      draw(ctx, item, index + 1, arrow)
    }

    if (detail.value.display_type === '2' && aaa !== 'main') {
      line(ctx, x + options.spaceX, y, x + options.spaceX, y + arrow * options.spaceY, line_width, line_color) // 线条绘制
      node(ctx, x, y) // 节点绘制
      text(ctx, x, y, item.name) // 文本绘制   
    } else {
      line(ctx, x, y, x + options.spaceX, y, line_width, line_color) // 线条绘制
      node(ctx, x, y) // 节点绘制
      text(ctx, x, y, item.name) // 文本绘制   
    }

  })
}

function init(param: any = "") {

  store.dispatch('common/Fetch', {
    api: 'footprintDetail',
    data: {
      id: route.query.id
    }
  }).then(async res => {
    detail.value = res.result
    inits()
  })
}

function inits() {
  const canvas: any = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  nodeClickArray.value = []
  ctx.width = "1500"
  ctx.save();

  // radiusButton(ctx, 50, 365, 120, 50, 8, '#333');
  // text(ctx, data.start, 110, 400)
  line(ctx, 170, options.startY, options.startX, options.startY, detail.value.line_width, detail.value.line_color)
  draw(ctx, detail.value)

  clickNode(canvas, ctx)
}

function clickNode(canvas: any, ctx: any) {
  canvas.addEventListener("click", (event: any) => {
    debugger
    //清除之前的弹窗
    if (chooseNode.value != null) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      init()
      chooseNode.value = null
      return
    }
    //判断点击节点
    let rect = canvas.getBoundingClientRect();
    let zoom = rect.width / 10000;
    let x = (event.clientX / zoom - rect.left / zoom).toFixed(2);
    let y = (event.clientY / zoom - rect.top / zoom).toFixed(2);

    for (var t = 0; t < nodeClickArray.value.length; t++) {
      ctx.beginPath();
      ctx.arc(nodeClickArray.value[t].x, nodeClickArray.value[t].y, 15, 0, Math.PI * 2, true);

      if (ctx.isPointInPath(x, y)) {
        drawDialog(ctx, 200, 80, nodeClickArray.value[t].x, nodeClickArray.value[t].y - 110)
        ctx.restore();
        chooseNode.value = t
        break;
      } else {
        chooseNode.value = null
      }
    }
  });
}

function drawDialog(ctx: any, width: any, height: any, x: any, y: any) {
  ctx.beginPath();
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.fillRect(x, y, width, height);
  ctx.font = "22px ''";
  ctx.fillStyle = "#fff";
  ctx.textAlign = 'left';
  ctx.textBaseline = "top";
}

onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>
.trackmap-wrap {
  background: var(--module-background);
  top: 60px;
  bottom: 0px;
  left: 0;
  right: 0;

  .trackmap {
    background: var(--card-background);
    position: absolute;
    top: 25px;
    bottom: 25px;
    left: 25px;
    right: 25px;
    border-radius: 8px;
    overflow: hidden;

    .trackmap-canvas {
      overflow-x: auto;
    }
  }
}
</style>
