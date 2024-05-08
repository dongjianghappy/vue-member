<template>
<div class="control">
  <div class="progress_bar relative" id="progress_bar_cover" style="height: 5px" @click="handlebar($event, data)">
    <div class="time_bar" id="time_bar_cover" style="height: 5px"></div>
    <div class="absolute pointer slider box" id="slider_cover" @mousedown="mousedown"></div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from '@/utils'
export default defineComponent({
  name: 'v-Button',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  emits: ['jietu'],
  setup(props, context) {
    const drag: any = ref(false)

    function handlebar(e: any, param: any) {
      let progress_bar: any = document.getElementById(`progress_bar_cover`);
      let time_bar: any = document.getElementById(`time_bar_cover`);
      let slider: any = document.getElementById('slider_cover');
      let audio: any = document.getElementById('show_video');
      let aaa: any = audio.duration * e.offsetX / progress_bar.clientWidth
      audio.currentTime = aaa

      if (e.offsetX >= e.currentTarget.clientWidth) {
        time_bar.style.width = `${e.currentTarget.clientWidth}px`;
      } else if (e.offsetX < 20) {
        time_bar.style.width = '0px';
        slider.style.left = `0px`;
      } else {
        time_bar.style.width = e.offsetX + 'px';
        slider.style.left = `${e.offsetX}px`;
      }

      param.isplay = true
      context.emit('jietu', "")
    }

    return {
      handlebar,
      drag
    }
  }
})
</script>
