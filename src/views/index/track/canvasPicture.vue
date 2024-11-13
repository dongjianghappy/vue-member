<template>
<div class="container trackmap-wrap fixed flex">
  <div class="trackmap">
    <div :class="{'screen1': isSetting, 'screen2': !isSetting}">
      <div class="relative" style="z-index: 100000">
        <div class="flex">
          <div class="p15 font24" style="flex: 1">
            {{detail.name}}示意图
          </div>
          <div class="p15 pt25 w100">
            <v-back />
          </div>
          <div class="p15" style="width: 400px">
            <Tool :data="detail.list" :render="init" :position="position" />
          </div>
        </div>
      </div>
      <div class="trackmap-canvas">
        <canvas id="canvasPictrue" width="5000" height="550"></canvas>
      </div>
    </div>
    <div class="layer-info absolute" :class="{'screen-right': isSetting, 'screen-left': !isSetting}" style=" background: #222; top: 0; width: 450px">
      <Setting :data="detail" @setting="setting" :render="init" v-if="loginuser.account && loginuser.account === detail.uid" />
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
import { domIsShow } from '@/utils/fn'
import Tool from './components/tool.vue';
import Setting from './components/setting/index.vue';
import VueEvent from '@/utils/event'

const store = useStore()
const route = useRoute()
const router = useRouter()
const coding: any = codings.track
const loginuser = computed(() => store.getters['user/loginuser']);
const userInfo = computed(() => store.getters['user/userInfo']);
const userSetting = computed(() => store.getters['user/userSetting']);
let chooseNode: any = ref(null);
const nodeClickArray: any = ref([]);
const urlClickArray: any = ref([]);
const isMoved: any = ref(false)
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
const scrollLeft: any = ref(0)

// 监听路由
watch(route, (newValues, prevValues) => {
    let arr = ['/life']
  if (arr.indexOf(route.path) === -1) {
    domIsShow.showDom(userSetting.value)
  }
})

// 监听路由
watch(detail, (newValues, prevValues) => {
  if (!isMoved.value) {
    inits()
  }
  isMoved.value = false
}, {
  deep: true
})

function setting() {
  isSetting.value = !isSetting.value
}

// 绘制圆角矩形
function drawRect(ctx: any, x: any, y: any, width: any, height: any, radius: any, color_back: any, data: any) {
  ctx.beginPath();
  ctx.fillStyle = color_back || '#333'
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

// 绘制圆形
function drawCircle(ctx: any, x: any, y: any, data: any) {
  let color = data.des_trip_background || "rgba(108,212,148,1)";
  ctx.beginPath();
  ctx.arc(x, y - data.trip_radius - 25, data.trip_radius, 0, Math.PI * 2, true);
  ctx.fillStyle = color
  ctx.fill();
}

// 绘制图片
function drawImg(ctx: any, x: any, y: any, data: any) {
  // 创建一个新的Image对象
  let img = new Image();

  // 设置图标图片的源地址
  // icon.src = 'http://img14.360buyimg.com/cms/jfs/t595/323/625407732/3275/e86993e8/5476ba25Ne75aa640.png';
  img.src = '/svg/book.svg';

  // 确保图像加载完毕后再绘制到Canvas上
  img.onload = function () {
    ctx.beginPath();
    ctx.arc(x, y, data.trip_radius - 3, 0, 2 * Math.PI); // 创建圆形

    ctx.drawImage(img, x - 40, y - 40, data.trip_radius * 2, data.trip_radius * 2); // 10, 10是图标的起始位置
  };
}

// 绘制三角形箭头小图标
function drawArrow(ctx: any, x: any, y: any, color: any) {
  ctx.beginPath();
  ctx.moveTo(x, y + 10); // 起点
  ctx.lineTo(x + 10, y + 20); // 顶点
  ctx.lineTo(x + 20, y + 10); // 终点
  ctx.fillStyle = color;
  ctx.fill();
}

// 绘制文字
function text(ctx: any, x: any, y: any, text: any, size: any = '12', color: any = '#ccc', data: any) {
  let _size = data.privacy_font_size_status === true ? data.privacy_font_size : size
  let _color = data.privacy_font_color_status === true ? data.privacy_font_color : color


  if (data.Highlight) {
    _color = 'red'
    _size = 24
    // highlight(ctx, 'text')
  }

  ctx.fillStyle = _color;
  ctx.font = _size + "px ''";
  ctx.textAlign = "center";
  ctx.fillText(text, x, y + 40);

  ctx.shadowColor = 'transparent';
}

// 绘制线条
function line(ctx: any, x0: any, y0: any, x1: any, y1: any, width: any = options.lineWidth, color: any = options.color, data: any = {}) {
  ctx.beginPath();

  let _color = color
  if (data.Highlight) {
    _color = 'red'
    highlight(ctx, 'line')
  }

  ctx.strokeStyle = _color;
  ctx.lineWidth = width || options.lineWidth;
  ctx.moveTo(x0, y0); //贝塞尔曲线起始点
  ctx.lineTo(x1, y1);
  ctx.stroke();

  ctx.shadowColor = 'transparent';

  // ctx.beginPath();
  // ctx.fillStyle = 'rgba(0,0,255,1.0)';
  // ctx.arc(-10000, -10000, 50, 0, Math.PI * 2);
  // ctx.fill();

  // ctx.shadowColor = 'rgba(255,0,0,1)';
  // ctx.shadowBlur = 20;
  // ctx.shadowOffsetX = 0;
  // ctx.shadowOffsetY = 0;

  // ctx.beginPath();
  // ctx.fillStyle = 'rgba(0,0,255,1.0)';
  // ctx.arc(-10000, -10000, 30, 0, Math.PI * 2);
  // ctx.fill();  
}

// 绘制节点
function node(ctx: any, x: any, y: any, shape: any = 'circle', data: any) {

  let _color = data.node_color || "#009CE0"
  let size = parseInt(data.node_size) || 3
  let rect_size = 20

  if (data.Highlight) {
    _color = 'red'
    // highlight(ctx, 'node')
    scrollLeft.value = x
    size = 4
    rect_size = 25
  }

  
  if (shape === 'circle') {
    ctx.beginPath();

// if (data.Highlight) {
//         var gradient = ctx.createRadialGradient(x, y, 0, x, y, 4 * size+2);
//         gradient.addColorStop(0, '#fa4c2b');
//         gradient.addColorStop(0.5, '#0bfcff');
//         gradient.addColorStop(1, 'rgba(250,76,43,0)');
//         _color = gradient
// }

    ctx.arc(x, y, 4 * size, 0, Math.PI * 2, true);
    ctx.fillStyle = _color;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, 4 * (size - 1), 0, Math.PI * 2, true);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, 4 * (size - 2), 0, Math.PI * 2, true);
    ctx.fillStyle = _color;
    ctx.fill();
  } else if (shape === 'rect') {
    ctx.beginPath();
    ctx.rect(x - 10, y - 10, rect_size, rect_size)
    ctx.fillStyle = _color
    ctx.fill();
    ctx.beginPath();
    ctx.rect(x - 7, y - 7, rect_size - 6 * 1, rect_size - 6 * 1)
    ctx.fillStyle = '#fff'
    ctx.fill();
    ctx.beginPath();
    ctx.rect(x - 4, y - 4, rect_size - 6 * 2, rect_size - 6 *2)
    ctx.fillStyle = _color
    ctx.fill();
  }

  ctx.shadowColor = 'transparent';
  // 绑定节点点击事件
  const pointInfo = {
    x: x,
    y: y,
    date: "111",
    content: "222",
    value: "333"
  };
  nodeClickArray.value.push(pointInfo);

  if (isHovered.value) {

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

function highlight(ctx: any, type: any) {
  ctx.shadowColor = 'rgba(255, 255, 0, 1)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

// 图像绘制
function draw(ctx: any, data: any, aaa: any = 'main', sub: any = 0) {
  let {
    line_width,
    line_color,
    space_x,
    space_y
  } = data
  data.list && data.list.forEach((item: any, index: any) => {
    const {
      config
    }: any = item

    let _arrow = index % 2 == 0 ? 1 : -1 // 根据数据奇数偶数设置显示位置，奇数在上面，偶数在下面
    let x = config.x // 基本 x 坐标位置
    let y = config.y // 基本 y 坐标位置
    let x2 = data.list[index + 1] ? data.list[index + 1].config.x : 0
    let y2 = data.list[index + 1] ? data.list[index + 1].config.y : 0

    if (item.list && item.list.length > 0) {
      let _color = item.list[0].config.line_color
      let _lineWidth = item.list[0].config.line_width || options.lineWidth;
      if (item.Highlight) {
        _color = 'red'
      }
      // 直线
      if (item.connect_line === '0') {
        line(ctx, x, y, item.list[0].config.x, item.list[0].config.y, _lineWidth, _color, item) // 线条绘制
      }
      // 弧线
      else {
        ctx.beginPath();
        item.Highlight && highlight(ctx, 'line')
        ctx.lineWidth = _lineWidth
        ctx.strokeStyle = _color;
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(item.list[0].config.x - 100, item.list[0].config.y, item.list[0].config.x, item.list[0].config.y);
        ctx.strokeStyle = _color;
        ctx.stroke();
      }
      draw(ctx, item, index + 1, _arrow)
    }

    if (aaa !== 'main') {
      let _color = config.line_color
      let _lineWidth = config.line_width || options.lineWidth;
      if (data.list[index + 1]) {
        line(ctx, x, y, x2, y2, _lineWidth, _color, data) // 线条绘制
      }
    } else {
      line(ctx, x, y, x + space_x, y, config.line_width, config.line_color) // 线条绘制
    }
    node(ctx, x, y, item.node_shape, item) // 节点绘制
    text(ctx, x, y, item.name, config.font_size, config.font_color, item) // 文本绘制  
    textPrewrap(ctx, item.content, x, y, parseInt(item.des_trip_width) - 20, item)
  })
}

function init(param: any = "") {
  domIsShow.hideDom()
  store.dispatch('common/Fetch', {
    api: 'footprintDetail',
    data: {
      id: route.query.id
    }
  }).then(async res => {
    detail.value = res.result
    debugger
    detail.value.coding = coding
    inits()
  })
}

function visit() {
  store.dispatch('common/Fetch', {
    api: "VisitCommunity",
    data: {
      coding: coding.art,
      id: route.query.id
    }
  })
}

function easeInOutQuad(t: any, b: any, c: any, d: any) {
  // 使用二次缓动函数
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
}

function animateScrollLeft(element: any, to: any, duration: any) {
  const start = Date.now();
  const from = element.scrollLeft;
  const change = to - from;
  const increment = 20; // 每次循环的时间间隔（毫秒）

  let currentTime = 0;
  const animate = () => {
    currentTime += increment;

    const val = easeInOutQuad(currentTime, from, change, duration);
    element.scrollLeft = val;

    if (currentTime < duration) {
      setTimeout(animate, increment);
    }
  };

  animate();
}

function position(param: any = '') {
  let myElement = document.getElementsByClassName('trackmap-canvas')[0]
  let x = scrollLeft.value
  if(param !== ''){
    x = parseInt(param)
  }
  animateScrollLeft(myElement, x - parseInt(detail.value.space_x), 500); // 滚动到500像素位置，动画时间为500毫秒
}

function inits() {
  const canvas: any = document.getElementById("canvasPictrue");
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  nodeClickArray.value = []
  ctx.width = "1500"
  ctx.save();

  // drawRect(ctx, 50, 365, 120, 50, 8, '#333');
  // text(ctx, data.start, 110, 400)
  line(ctx, 0, 300, 300, 300, detail.value.line_width, detail.value.line_color)
  draw(ctx, detail.value)
  position()
  clickUrl(canvas, ctx)
}

function animate() {

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
    let rect = canvas.getBoundingClientRect();
    let zoom = rect.width / 5000;
    let x: any = (e.clientX / zoom - rect.left / zoom).toFixed(2);
    let y: any = (e.clientY / zoom - rect.top / zoom).toFixed(2);
    let text_w = Math.floor(ctx.measureText(">>").width) + 1 // 按钮宽度

    for (var i = 0; i < urlClickArray.value.length; i++) {
      // 检查点击位置是否在链接区域内
      if (x > urlClickArray.value[i].x - text_w && x < urlClickArray.value[i].x + text_w && y > urlClickArray.value[i].y + 40 - 15 && y < urlClickArray.value[i].y + 40 + 15 && urlClickArray.value[i].url) {
        router.push(urlClickArray.value[i].url)
      }
    }
  });
}

//lineMaxWidth：每行文本的最大宽度
function textPrewrap(ctx: any, content: any, x: any, y: any, lineMaxWidth: any, data: any) {
  var drawTxt = ''; //当前绘制的内容
  var drawLine = 0; //第几行开始绘制
  var drawIndex = 0; //当前绘制内容的索引

  if (data.trip_shape === 'circle') {
    drawCircle(ctx, x, y, data);
    // drawArrow(ctx, x - 10, y - 40, data.des_trip_background)
    // drawImg(ctx, x, y - data.trip_radius - 25, data)
    return
  }

  if (!data.des_display) {
    return
  }

  let _width = parseInt(data.des_trip_width) || 200
  let _height = parseInt(data.des_trip_height) || 85
  drawRect(ctx, x - parseInt(data.trip_offset), y - 120, _width, _height, parseInt(data.des_trip_style), data.des_trip_background, data);
  // drawArrow(ctx, x - 10, y - 130 + _height, data.des_trip_background)
  ctx.beginPath();
  ctx.font = data.des_font_size + "px ''";
  ctx.fillStyle = data.des_font_color || '#333';
  ctx.textAlign = 'left';
  ctx.textBaseline = "top";

  //判断内容是够可以一行绘制完毕
  if (ctx.measureText(content).width <= lineMaxWidth) {
    ctx.fillText(data.content, x - parseInt(data.trip_offset) + 10, y - 110 + 10)
  } else {
    for (var i = 0; i < content.length; i++) {
      drawTxt += content[i];
      if (ctx.measureText(drawTxt).width >= lineMaxWidth) {
        ctx.fillText(content.substring(drawIndex, i + 1), x - parseInt(data.trip_offset) + 10, y - 110 + 10 + drawLine * 18);
        drawIndex = i + 1;
        drawLine += 1;
        //drawY+=lineHeight;
        drawTxt = '';
      } else {
        //内容绘制完毕，但是剩下的内容宽度不到lineMaxWidth
        if (i === content.length - 1) {
          ctx.fillText(content.substring(drawIndex, i + 1), x - parseInt(data.trip_offset) + 10, y - 110 + 10 + drawLine * 18)
        }
      }
    }
  }
  // text(ctx, x + 200 - 20, y + 50 - 20, '>>') // 文本绘制 // 暂时注释
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
  VueEvent.on("isMove", () => {
    isMoved.value = true
  })
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
    width: calc(100% - 450px);
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
      right: -450px;
    }

    &.screen-right {
      transition: .5s, ;
      right: 0;
    }
  }
}
</style>
