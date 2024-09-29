<template>
<div id="quicknavigation" class="menu no-event" style="position: fixed; right: 0; bottom: 0; z-index: 1000000000000000;">
  <div id="chat" ref="chat" class="toggle" title="快捷导航" @click="handleClick">
    <i class="iconfont icon-app font24"></i>
  </div>

  <ul>
    <li v-for="(item, index) in module" :key="index" style="--color: #1877f2" :style="`--i: ${index}`">
      <a @click="handleItem(item.value)">
        <i class="iconfont font24" :class="`icon-${item.icon}`" :title="item.name"></i>
      </a>
    </li>
  </ul>
</div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  ref,
  useStore,
  useRouter
} from '@/utils'
import VueEvent from '@/utils/event'

const store = useStore();
const router = useRouter()
const module = computed(() => store.getters['user/config_talk'].quick_navigation);
const chat: any = ref(null)
let isDrag: any = ref(false)

// 按钮消息发送两种方式: 1、点击事件监听，2、点击响应式切换
function handleClick() {
  let menu: any = document.querySelector('.menu')
  menu.classList.toggle('active')
}

function handleItem(param: any) {
  if(param === 'chat'){
    VueEvent.emit("openChat");
  }else{
    router.push(param)
  }
}

onMounted(() => {
  let el: any = document.getElementById('chat')
  let quicknavigation: any = document.getElementById('quicknavigation')
  el.addEventListener('mousedown', (ev: any) => {
    debugger
    isDrag.value = true
    ev.preventDefault()
    let oevent = ev || event
    let distanceX = oevent.clientX //鼠标点击位置
    let distanceY = oevent.clientY //鼠标点击位置

    document.onmousemove = function (e: any) {

      if (!isDrag.value) {
        return
      }

      quicknavigation.style.top = e.clientY - ev.layerY - 110 + "px"
      quicknavigation.style.left = e.clientX - ev.layerX - 110 + "px"
    }
  })

  el.addEventListener('mouseup', (ev: any) => {
    isDrag.value = false

  })
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #9ad751, #2196f3);
}

.menu {
  width: 280px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu .toggle {
  position: relative;
  width: 60px;
  height: 60px;
  background: var(--navigation_background);
  color: #333;
  border-radius: 50%;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 2rem;
  transition: 1.25s;
  z-index: 1000;
  pointer-events: all;
}

.menu.active .toggle {
  transform: rotate(360deg);
  box-shadow: 0 0px 8px var(--color-primary),
    0 0 0 2px var(--color-primary),
    0 0 0 8px var(--navigation_background);
}

.menu ul {
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: all;
}

.menu ul li {
  position: absolute;
  left: 0;
  list-style: none;
  transform: rotate(calc(360deg/8 * var(--i)));
  transform-origin: 140px;
  scale: 0;
  transition: 0.5s;
  transition-delay: calc(0.1s * var(--i));
}

.menu.active ul li {
  scale: 1;
}

.menu ul li a {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(calc(360deg/-8 * var(--i)));
  width: 60px;
  height: 60px;
  background: var(--navigation_background);
  color: var(--color);
  border-radius: 50%;
  font-size: 1.75rem;
  transition: 0.5s;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.25);
}

.menu ul li:hover a {
  font-size: 2.25rem;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15),
    0 0 0 2px var(--color),
    0 0 0 8px var(--navigation_background);
}
</style>
