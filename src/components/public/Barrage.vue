<template>
<div :id="`barrage_${data.id}`" class="barrage-container z-index10"></div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineExpose,
  computed,
  useStore
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
defineExpose({
  sendBarrage
})

const store = useStore()
const barrageSetting: any = computed(() => store.getters['talk/barrageSetting']);
const trip = Array({
  content: "弹幕已开启，赶紧来一发弹幕吧"
})

function sendBarrage(param: any) {
  if (barrageSetting.value.item.barrage == '0') {
    const aaa: any = document.getElementsByClassName("barrage-container")
    for (let i = 0; i < aaa.length; i++) {
      aaa[i].innerHTML = '';
    }
    return
  }
  const barrageContainer: any = document.getElementById(`barrage_${props.data.id}`)
  barrageContainer.innerHTML = '';
  (props.data.barrageList && props.data.barrageList || trip).map((item: any) => {
    const barrageText = item.content
    if (barrageText) {
      const barrage = document.createElement('div')
      barrage.classList.add('barrage')
      barrage.innerHTML = barrageText
      barrage.style.bottom = `${Math.random() * 80}%` // 随机弹幕位置
      barrage.style.animationDuration = `${Math.random() * 5 + 5}s` // 随机弹幕速度
      barrageContainer.appendChild(barrage)
    }
  })

  // 获取所有的弹幕元素  
  const barrages: any = document.querySelectorAll('.barrage');
  // 为每个弹幕元素添加鼠标经过事件监听器  
  barrages.forEach((barrage: any) => {
    barrage.addEventListener('mouseover', () => {
      // 暂停动画  
      barrage.style.animationPlayState = 'paused';
    });

    barrage.addEventListener('mouseout', () => {
      // 恢复动画  
      barrage.style.animationPlayState = 'running';
    });
  });
}
</script>
