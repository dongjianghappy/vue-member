<template>
<!-- 登录框 -->
<v-login :displayButton="false" />
<!-- 聊天窗口 -->
<!-- <v-chat /> -->
<v-messageboard v-if="module.personal_center && module.personal_center.message_board" />
<v-time v-if="module.personal_center && module.personal_center.time" />
<v-letter />
<!-- 主题 -->
<Thme v-if="loginuser.currentUser && module.personal_center && module.personal_center.theme" />
<v-layer v-model:isShow="showFlag" :data="currentData.data" :currentImg="currentData.img" v-if="showFlag" type="image" :hasInfo="currentData.hasInfo || true" :hasComment="false" />
<v-layer1 v-model:isShow="displayScreen" :dataList="[{...currentData.data}]" v-if="displayScreen" />
<Graph v-model:show="displayGraph" :data="currentData" v-if="displayGraph" />
<v-gotop />
<BirthdayPrompt v-if="loginuser.birthday && module.prompt && module.prompt.birthday" />
<MessagePrompt v-else-if="module.prompt && module.prompt.message_prompt" />
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  useStore
} from '@/utils'
import VueEvent from '@/utils/event'
import Thme from '@/views/thme/index.vue'
import Graph from '@/views/graph/index.vue'
import BirthdayPrompt from './BirthdayPrompt.vue'
import MessagePrompt from './MessagePrompt.vue'
export default defineComponent({
  name: 'v-Button',
  components: {
    Thme,
    Graph,
    BirthdayPrompt,
    MessagePrompt
  },
  props: {
    loginuser: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const showFlag = ref(false)
    const displayScreen = ref(false)
    const displayGraph = ref(false)
    const currentData = ref()
    const module: any = computed(() => store.getters['user/config_talk']);

    onMounted(() => {
      // 大图查看
      VueEvent.on("layout", (data: any) => {
        currentData.value = data
        showFlag.value = !showFlag.value
      })
      // 播放查看
      VueEvent.on("screen", (data: any) => {
        currentData.value = data
        displayScreen.value = !displayScreen.value
      })
      // 图表结构
      VueEvent.on("graph", (data: any) => {
        currentData.value = data
        displayGraph.value = !displayGraph.value
      })

    })

    return {
      showFlag,
      displayScreen,
      displayGraph,
      currentData,
      module
    }

  }
})
</script>
