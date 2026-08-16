<template>
    <!-- 登录框 -->
    <v-login :displayButton="false" />
    <!-- 欢迎消息 -->
    <v-welcome v-if="loginMessage == 'true' && prompt.login === '1'" />
    <!-- 聊天窗口 -->
    <!-- <v-chat /> -->
    <!-- 播放器 -->
    <v-music v-model:isShow="showPlay" v-if="showPlay" />
    <!-- 歌词 -->
    <v-lrc />
    <!-- <v-messageboard v-if="module.personal_center && module.personal_center.message_board" /> -->
    <!-- 时间 -->
    <v-time v-if="module.personal_center && module.personal_center.time" />
    <v-letter />
    <!-- 能量 -->
    <v-energy v-if="module.personal_center && module.personal_center.energy" />
    <!-- 主题 -->
    <!-- 常识提示 -->
    <v-commonsense v-if="prompt.message === '1' && showCommonSense.show" :data="showCommonSense.data" />
    <Thme v-if="loginuser.currentUser && module.personal_center && module.personal_center.theme" />
    <v-layer v-model:isShow="showFlag" :data="currentData.data" :currentImg="currentData.img" v-if="showFlag" type="image" :hasInfo="currentData.hasInfo || true" :hasComment="false" />
    <v-layer1 v-model:isShow="displayScreen" :dataList="[{...currentData.data}]" v-if="displayScreen" />
    <Graph v-model:show="displayGraph" :data="currentData" v-if="displayGraph" />
    <v-gotop />
    <BirthdayPrompt v-if="loginuser.birthday && prompt.birthday" />
    <MessagePrompt v-else-if="prompt.message_prompt" />
    <v-theme />
    <v-quicknavigation v-if="module.personal_center && module.personal_center.quick_navigation" />
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  computed,
  useStore
} from '@/utils'
import VueEvent from '@/utils/event'
import Thme from '@/views/thme/index.vue'
import Graph from '@/views/graph/index.vue'
import BirthdayPrompt from './prompt/BirthdayPrompt.vue'
import MessagePrompt from './prompt/MessagePrompt.vue'

const store = useStore();
const showFlag = ref(false)
const showPlay = ref(false)
const showCommonSense: any = ref({
  show: false,
  data: {}
})
const displayScreen = ref(false)
const displayGraph = ref(false)
const currentData = ref()
const loginuser = computed(() => store.getters['user/loginuser']);
const module: any = computed(() => store.getters['user/config_talk']);
const prompt: any = computed(() => store.getters['user/config_talk'].prompt || {});
const loginMessage: any = sessionStorage.getItem('loginMessage');

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
  // 大图查看
  VueEvent.on("musicPlay", (data: any) => {
    // currentData.value = data
    showPlay.value = true
  })
  // 常识消息
  VueEvent.on("commonSense", (data: any) => {
    console.log("fffffffffffff");
    
    showCommonSense.value.show = true
    showCommonSense.value.data = data
  })  
})
</script>
