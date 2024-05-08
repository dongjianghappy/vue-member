<template>
<span @click="handlePlay">
  <i class="iconfont icon-sound m0" />播报
</span>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  computed,
  useStore,
} from '@/utils'
export default defineComponent({
  name: 'v-Avatar',
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const userSetting: any = computed(() => store.getters['user/userSetting']);
    const video_visit: any = ref(null)
    const time: any = ref("")
    const jsspeak = ref(false)
    const isInit: any = ref(true)
    const message: any = ref({
      notes: 0
    })

    function handlePlay() {
      const speakMsg = new SpeechSynthesisUtterance()
      let speech: any = props.content
      speakMsg.text = speech; //文字内容
      speakMsg.lang = "zh-CN"; //使用的语言:中文
      speakMsg.volume = 1;
      //声音音量:0-1
      speakMsg.rate = 1;
      //语速:0-10
      speakMsg.pitch = 10;
      //音高:0-1
      window.speechSynthesis.speak(speakMsg)
    }

    return {
      handlePlay
    }
  }
})
</script>

<style scoped>
img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  float: left
}
</style>
