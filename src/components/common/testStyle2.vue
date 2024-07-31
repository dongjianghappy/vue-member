<template>
<div>
  <template v-for="(item, index) in 20" :key="index">
    <span :style="a(index)"></span>
  </template>
</div>
</template>

<script setup lang="ts">
import {
  computed
} from 'vue'
const a = computed(() => (val: any) => {
  const a = Math.random()
  const x2 = Math.floor(Math.random() * 2) > 0 ? '' : '-'
  const y2 = Math.floor(Math.random() * 2) > 0 ? '' : '-'
  const m = x2 + Math.random() * 150 + 100
  const m2 = y2 + Math.random() * 150 + 100

  const color = [
    'rgb(255, 0, 221)',
    'rgb(255,128,0)',
    'rgb(255,255,0)',
    'rgb(0,255,0)',
    'rgb(0,255,255)',
    'rgb(0,0,255)',
    'rgb(128,0,255)',
    'var(--a-link)'
  ]

  function bbb(start: any, end: any) {
    var x = end.x - start.x
    var y = end.y - start.y
    return 360 * Math.atan(x / y) / (2 * Math.PI)
  }
  const obj = {
    x: 0,
    y: 0
  }
  const obj2 = {
    x: m2,
    y: m
  }
  const style = {
    '--x': Math.random() * 100,
    '--y': Math.random() * 100,
    '--o': Math.random(),
    '--a': a > 0.09 ? a : 0.09,
    '--d': Math.random(),
    '--s': Math.random(),
    '--w': Math.random() * 20 + 8 + 'px',
    '--h': Math.random() * 20 + 8 + 'px',
    '--shadow': Math.floor(Math.random() * 5) + 10 + 'px',
    '--x2': m + 'px',
    '--y2': m2 + 'px',
    '--deg': bbb(obj, obj2) + 'deg',
    '--background': 'var(--a-link)',
  }
  return style
})
</script>

<style scoped>
span {
  width: var(--w);
  height: 5px;
  border-radius: 50%;
  animation-delay: 1s;
  animation-duration: calc(var(--a)* 3s);
  animation-iteration-count: infinite;
  animation-name: drop;
  animation-timing-function: linear;

  position: absolute;
  left: 50%;
  top: 120px;
  box-shadow: 0px 0px var(--shadow) var(--color-primary), 0px 0px 20px var(--color-primary);
  background: var(--color-primary);
  transform: rotate(var(--deg));
  transition: 0.3s ease;
}

@keyframes drop {
  0% {
    opacity: 1;
    transform: rotate(var(--deg));
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translate(var(--x2), var(--y2)) rotate(var(--deg));
  }
}
</style>
