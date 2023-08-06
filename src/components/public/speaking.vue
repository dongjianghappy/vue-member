<template>
<div class="hide">
  <video ref="video_visit">
    <source src="@/assets/video/visit.mp3" type="audio/mp3">
  </video>
</div>
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
    data: {
      type: Object,
      default: () => {
        return {}
      }
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
    // 监听语音播报设置
    watch(userSetting, (newVal: any, oldVal: any) => {
      clearTimeout(time.value)
      jsspeak.value = false
      if (newVal == "") {
        return
      }
      debugger
      let setting = JSON.parse(newVal)
      for (let key in setting.message) {
        if (setting.message[key] == "1") {
          jsspeak.value = true
          break
        }
      }
      jsspeak.value && speaking()
    }, {
      immediate: true,
      deep: true
    });

    function speaking() {
      const speakMsg = new SpeechSynthesisUtterance()

      time.value = setInterval(() => {
        let speech = ""
        store.dispatch('common/Fetch', {
          api: "voiceBroadcast"
        }).then(res => {
          const {
            notes
          } = res.result
          if (isInit.value) {
            message.value = res.result
            isInit.value = false
            return
          }

          if (1) {
            // speech = `你好！你的好友或你关注的用户有新更新的内容，随时随地关注他的动态。`
            speech = "Hi"
            message.value.user = res.result.user
          }
          if (1) {
            video_visit.value && video_visit.value.play()
            setTimeout(() => {
              speakMsg.text = speech; //文字内容
              speakMsg.lang = "zh-CN"; //使用的语言:中文
              speakMsg.volume = 1;
              //声音音量:0-1
              speakMsg.rate = 1;
              //语速:0-10
              speakMsg.pitch = 10;
              //音高:0-1
              window.speechSynthesis.speak(speakMsg)

            }, 1000)
          }

        })
      }, 20000)
    }

    return {
      video_visit,
      userSetting
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
