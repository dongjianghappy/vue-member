<template>
<div v-if="isShow" class="container w500 p25 font24 no-event fixed" style="left: 10px; right: 10px; bottom: 10px; height: 100px;">
  <div class="lrc align_left" style="height: 40px; line-height: 40px; color: var(--color-primary);">{{LRC[0]}}</div>
  <div class="lrc align_right" style="height: 40px; line-height: 40px; color: var(--color-primary);">{{LRC[1]}}</div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from '@/utils'
import VueEvent from '@/utils/event'
export default defineComponent({
  name: 'v-Button',
  props: {
    disabled: {
      type: Boolean,
      default: true
    },
    buttonType: {
      type: String,
      default: "text"
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:show', 'onClick'],
  setup(props, context) {
    const isShow = ref(false)
    const LRC: any = ref("")

    VueEvent.on("lrc", (data: any) => {
      isShow.value = !isShow.value
    })

    VueEvent.on("showLrc", (data: any) => {
      LRC.value = data
    })

    return {
      isShow,
      LRC
    }
  }
})
</script>

<style lang="less" scoped>
.lrc {
  // text-shadow: 0 1px 0 rgba(255, 255, 255, 0.15), 5px 2px rgba(0, 0, 0, 0.075);
  // text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px var(--color-primary-5), 0 0 35px var(--color-primary-5), 0 0 40px var(--color-primary-5), 0 0 50px var(--color-primary-5), 0 0 75px var(--color-primary-5);
  text-shadow: 0 0 5px var(--color-primary-5), 0 0 10px var(--color-primary-5);
}
</style>
