<template>
<div class="container trackmap-wrap fixed flex">
  <div class="trackmap" >
    <div :class="{'screen1': isSetting, 'screen2': !isSetting}">
    <div class="flex">
      <div class="p15 font24" style="flex: 1">
        {{detail.name}}示意图 {{detail.font_size}}
      </div>
      <div class="p15 pt25 w100">
        <v-back />
      </div>
      <div class="p15" style="width: 450px">
        <Tool :data="detail.list" @setting="setting" />
      </div>
    </div>

    <div class="trackmap-canvas">
      <canvas id="canvasPictrue" width="5000" height="550"></canvas>
    </div>
  </div>
  <div class="layer-info absolute" :class="{'screen-right': isSetting, 'screen-left': !isSetting}" style=" background: #222; top: 0; width: 360px">
      <Setting :data="detail" :render="inits" />
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
  watch,
  ref,
  onMounted,
  useRouter,
  codings
} from '@/utils'
import Tool from './components/tool.vue';
import Setting from './components/setting/index.vue';

const store = useStore()
const route = useRoute()
const router = useRouter()
const coding: any = codings.track.art
let chooseNode: any = ref(null);
const nodeClickArray: any = ref([]);
const urlClickArray: any = ref([]);
const options: any = {
  lineWidth: 10,
  color: ['red', '#24b99a'],
  startX: 300,
  startY: 250,
  spaceX: 300,
  spaceY: 150
}
const spaceing: any = 150
const detail: any = ref({})
const animationFrame: any = ref(null)
const isHovered: any = ref(false)
const isSetting: any = ref(false)

// 监听路由
watch(() => detail.value.font_size, (newValues, prevValues) => {
  inits()
})

function setting(){
  isSetting.value = !isSetting.value
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
function node(ctx: any, x: any, y: any ,type: any = 'circle') {

  if(type === 'circle'){
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2, true);
    ctx.fillStyle = "rgba(108,212,148,1)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2, true);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2, true);
    ctx.fillStyle = "rgba(108,212,148,1)";
    ctx.fill();
  }else if(type === 'rect'){
    // ctx.strokeRect(x, y, 20, 20)
    // ctx.beginPath();
    // ctx.moveTo(x + 5, y + 7);
    // ctx.lineTo(x + 15, y + 17);
    // ctx.moveTo(x + 5, y + 17);
    // ctx.lineTo(x + 15, y + 7);   
    // ctx.stroke() 
    ctx.beginPath();
    ctx.rect(x-10, y-10, 20, 20)
    ctx.fillStyle = '#009CE0'
    ctx.fill();
    ctx.beginPath();
    ctx.rect(x-7, y-7, 14, 14)
    ctx.fillStyle = '#fff'
    ctx.fill();
    ctx.beginPath();
    ctx.rect(x-4, y-4, 8, 8)
    ctx.fillStyle = '#009CE0'
    ctx.fill();
  }

  // 绑定节点点击事件
  const pointInfo = {
    x: x,
    y: y,
    date: "111",
    content: "222",
    value: "333"
  };
  nodeClickArray.value.push(pointInfo);

  if(isHovered.value){
    

    ctx.shadowBlur = 20
    ctx.shadowColor = "red"
    // 如果鼠标经过，并且正在动画过程中
    // 使用渐变色高亮节点

    // const gradient = ctx.createRadialGradient(100, 100, 25, 100, 100, 50)
    // gradient.addColorStop(0, 'yellow')
    // gradient.addColorStop(1, 'red')
    // ctx.fillStyle = gradient;
    // ctx.fill();
  }
}

// 绘制文字
function text(ctx: any, x: any, y: any, text: any, size: any = '12', color: any = '#ccc') {
  ctx.fillStyle = color;
  debugger
  ctx.font = size + "px ''";
  ctx.textAlign = "center";
  ctx.fillText(text, x, y + 40);
}

// 贝塞尔曲线
function line(ctx: any, x0: any, y0: any, x1: any, y1: any, width: any = options.lineWidth, color: any = options.color, style: any = '0') {
  ctx.beginPath();
  if (style == '1') {
    // ctx.setLineDash([5, 15])
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.moveTo(x0, y0); //贝塞尔曲线起始点
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

// 图像绘制
function draw(ctx: any, data: any, aaa: any = 'main', sub: any = 0) {
  let {
    line_width,
    line_color
  } = data
  data.list && data.list.forEach((item: any, index: any) => {

    let arrow = index % 2 == 0 ? 1 : -1 // 根据数据奇数偶数设置显示位置，奇数在上面，偶数在下面
    let x = item.x // 基本 x 坐标位置
    let y = item.y // 基本 y 坐标位置
    let x2 = data.list[index + 1] ? data.list[index + 1].x : 0
    let y2 = data.list[index + 1] ? data.list[index + 1].y : 0

    if (item.list && item.list.length > 0) {

      // 直线
      if (item.connect_line === '0') {
        line(ctx, x, y, item.list[0].x, item.list[0].y, line_width, line_color, item.line_style) // 线条绘制
      }
      // 弧线
      else {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(item.list[0].x - 100, item.list[0].y, item.list[0].x, item.list[0].y);
        // ctx.setLineDash([5, 15])
        ctx.strokeStyle = item.line_color;
        ctx.stroke();
      }

      draw(ctx, item, index + 1, arrow)
    }

    if (detail.value.display_type === '2' && aaa !== 'main' && data.list[index + 1]) {
      line(ctx, x, y, x2, y2, line_width, line_color, item.line_style) // 线条绘制
    } else {
      line(ctx, x, y, x + options.spaceX, y, line_width, line_color) // 线条绘制
    }
    node(ctx, x, y, item.node_type) // 节点绘制
    
    text(ctx, x, y, item.name, item.font_size, item.font_color) // 文本绘制  
    if (item.des_display == '1') {
      textPrewrap(ctx, item.content, x - 30, y - 110, 180, item)
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

function visit() {
  store.dispatch('common/Fetch', {
    api: "VisitCommunity",
    data: {
      coding: coding,
      id: route.query.id
    }
  })
}

function inits() {
  const canvas: any = document.getElementById("canvasPictrue");
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  nodeClickArray.value = []
  ctx.width = "1500"
  ctx.save();

  // radiusButton(ctx, 50, 365, 120, 50, 8, '#333');
  // text(ctx, data.start, 110, 400)
  line(ctx, 0, 300, detail.value.space_x, 300, detail.value.line_width, detail.value.line_color)
  debugger
  draw(ctx, detail.value)
  clickUrl(canvas, ctx)
}

function animate(){


  // if(isHovered.value){
  //   ctx.shadowBlur ++ 
  //   if(ctx.shadowBlur > 20)
  //   {
  //     ctx.shadowBlur = 0
  //   }
  // }
  animationFrame.value = requestAnimationFrame(animate)
}

// 路由点击跳转
function clickUrl(canvas: any, ctx: any) {
  canvas.addEventListener("click", (e: any) => {
    // let rect: any = canvas.getBoundingClientRect()
    // let x: any = e.clientX - rect.left
    // let y: any = e.clientY - rect.top

    let rect = canvas.getBoundingClientRect();
    let zoom = rect.width / 5000;
    let x: any = (e.clientX / zoom - rect.left / zoom).toFixed(2);
    let y: any = (e.clientY / zoom - rect.top / zoom).toFixed(2);
    let text_w = Math.floor(ctx.measureText(">>").width) + 1 // 按钮宽度

    for (var i = 0; i < urlClickArray.value.length; i++) {
      // ctx.beginPath();
      // // ctx.arc(urlClickArray.value[i].x, urlClickArray.value[i].y, 15,0,Math.PI*2,true);
      // // text(ctx, urlClickArray.value[i].x, urlClickArray.value[i].y, '详情') // 文本绘制  
      // if(ctx.isPointInPath(x, y)){
      //     window.location.href = "http://localhost:8081/u/110506372"
      //     break;
      // }

      // text(ctx, x, y, '22') // 文本绘制 

      // ctx.roundRect(x, y, 27, 15, 1)
      // ctx.stroke()
      // 检查点击位置是否在链接区域内
      if (x > urlClickArray.value[i].x - text_w && x < urlClickArray.value[i].x + text_w && y > urlClickArray.value[i].y + 40 - 15 && y < urlClickArray.value[i].y + 40 + 15 && urlClickArray.value[i].url) {
        router.push(urlClickArray.value[i].url)
      }
    }
  });

  //   canvas.addEventListener("mouseenter", (event: any) => {
  //     isHovered.value = true
          
  //     animate()
  // })

  // canvas.addEventListener("mouseleave", (event: any) => {
  //   cancelAnimationFrame(animationFrame.value)
  //   isHovered.value = false
  //   const canvas: any = document.getElementById("canvasPictrue");
  //   const ctx = canvas.getContext('2d');
  // // 清除Canvas
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   inits() // 重新绘制
  // })  
}

function drawDialog(ctx: any, width: any, height: any, x: any, y: any, data: any = {}, text: any, bg_color: any = 'rgba(255, 255, 255, 0.8)') {
  ctx.beginPath();
  ctx.fillStyle = data.des_trip_background;
  radiusButton(ctx, x, y, width, height, 4, bg_color);
  ctx.font = data.des_font_size + "px ''";
  ctx.fillStyle = "#fff";
  ctx.textAlign = 'left';
  ctx.textBaseline = "top";
}

//content：需要绘制的文本内容; drawX：绘制文本的x坐标; drawY：绘制文本的y坐标;
//lineMaxWidth：每行文本的最大宽度
function textPrewrap(ctx: any, content: any, x: any, y: any, lineMaxWidth: any, data: any) {
  var drawTxt = ''; //当前绘制的内容
  var drawLine = 0; //第几行开始绘制
  var drawIndex = 0; //当前绘制内容的索引
  drawDialog(ctx, 200, 85, x, y, data, data.content, data.des_trip_background)
  //判断内容是够可以一行绘制完毕
  if (ctx.measureText(content).width <= lineMaxWidth) {
    ctx.fillText(data.content, x + 10, y + 10)
  } else {
    for (var i = 0; i < content.length; i++) {
      drawTxt += content[i];
      if (ctx.measureText(drawTxt).width >= lineMaxWidth) {
        ctx.fillText(content.substring(drawIndex, i + 1), x + 10, y + 10 + drawLine * 18);
        drawIndex = i + 1;
        drawLine += 1;
        //drawY+=lineHeight;
        drawTxt = '';
      } else {
        //内容绘制完毕，但是剩下的内容宽度不到lineMaxWidth
        if (i === content.length - 1) {
          ctx.fillText(content.substring(drawIndex, i + 1) + "...", x + 10, y + 10 + drawLine * 18)
        }
      }
    }
  }
  text(ctx, x + 200 - 20, y + 50 - 20, '>>') // 文本绘制 
  // 绑定节点点击事件
  const pointInfo = {
    x: x + 200 - 20,
    y: y + 50 - 20,
    url: data.url
  };
  urlClickArray.value.push(pointInfo);
}

onMounted(() => {
  init()
  visit()
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
  .screen1 {
    transition: .5s, ;
    width: calc(100% - 360px);
  }

  .screen2 {
    transition: .5s, ;
    width: 100%;
  }

  .layer-info {
    background: #fff;
    width: 350px;
    height: 100%;

    &.screen-left {
      transition: .5s, ;
      right: -360px;
    }

    &.screen-right {
      transition: .5s, ;
      right: 0;
    }
  }
}
</style>
