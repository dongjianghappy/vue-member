<template>
<span @click="handleClick">
  <i class="iconfont icon-soundsize pointer font20 pointer" style="color: #fff" />
</span>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  useStore,
  onMounted
} from '@/utils'
export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    speech: {
      type: String,
      default: ""
    },
  },
  setup(props, context) {
    const store = useStore();
    const {
      proxy
    }: any = getCurrentInstance();

    function handleClick() {
      const speakMsg = new SpeechSynthesisUtterance()
      speakMsg.text = props.speech; //文字内容
      speakMsg.lang = "zh-CN"; //使用的语言:中文
      speakMsg.volume = 1;
      //声音音量:0-1
      speakMsg.rate = 1.5;
      //语速:0-10
      speakMsg.pitch = 10;
      //音高:0-1
      window.speechSynthesis.speak(speakMsg)
    }

    return {
      handleClick
    }
  }
})
</script>
