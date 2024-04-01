<template>
<div :id="`barrage_${data.id}`" class="barrage-container" style="z-index: 10"></div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Button',
  emits: ['update:show', 'onClick'],
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const store = useStore()
    const barrageSetting: any = computed(() => store.getters['talk/barrageSetting']);
    const trip = Array({content: "弹幕已开启，赶紧来一发弹幕吧"})

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
    return {
      sendBarrage
    }
  }
})
</script>

<style lang="less" scoped>

</style>
