<template>
<div class="talk-home w1100" style="margin-top: -20px;" :style="userInfo.home_background ? `background: linear-gradient(to right, ${userInfo.theme && userInfo.theme.color}, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), ${userInfo.theme && userInfo.theme.color}), url(${userInfo.home_background}) no-repeat; background-size: cover` : ''">
  <div class="user-home-photos">
    <img id="uploadphotos" :src="userInfo.photos" width="120" height="120" style="border-radius:50%; cursor:pointer; display: inline-block;" class="userphotos">
    <div class="mb10 bold cl-white">
      {{userInfo.nickname}}
      <span style="color: #f67f00;">LV.{{userInfo.level}}</span>
    </div>
    <ul class="mt5">
      <li @click="handleConcern('concernmy')" class="pointer">
        <span><strong>{{userInfo.concernmy}}</strong><span>粉丝</span></span>
      </li>
      <li @click="handleConcern('myconcern')" class="pointer">
        <span><strong>{{userInfo.myconcern}}</strong><span>关注</span></span>
      </li>
      <li @click="handleConcern('praise')" class="pointer">
        <a><strong>{{userInfo.talk}}</strong><span>获赞</span></a>
      </li>
    </ul>
  </div>
  <div class="home-info relative" style="bottom:20px;">
    <div class="absolute" style="left: -45px;">

      <p class="ptb10 font12" style="color: #8bc34a;">
        <v-selectbackground kind="home_background" :style="{width: 1170, height: 570}" :img="{width: 1440}" :size="{width: 1000, height: 300}" />
        <span @click="handleMood">
          <span v-if="userInfo.mood">{{userInfo.mood}}: {{userInfo.mood_description}}</span>
          <span v-else>暂无心情</span>
        </span>
        <Mood v-if="currentUser" />
      </p>
      <p class="ptb10 font12">{{userInfo.introduction}}</p>
      <p class="font12">
        <i class="iconfont icon-position ml0"></i>
        {{userInfo.province}} {{userInfo.city}}</p>
    </div>
  </div>

  <div class="user-info">
    <ul class="align_right">
      <li class="inline font14  current ml10 plr15" v-for="(item, index) in home_nav" :key="index" @click="handleclick(item.value)">{{item.name}}</li>
    </ul>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  useRouter,
  useStore,
  ref,
  getUid
} from '@/utils'
import Mood from '../../index/components/mood.vue'
import MoodList from '../../index/components/mood.vue'

export default defineComponent({
  name: 'v-Search',
  components: {
    Mood,
    MoodList
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const userInfo: any = computed(() => store.getters['user/userInfo']);
    const currentUser = computed(() => store.getters['user/currentUser']);
    const home_nav = computed(() => store.getters['user/config_talk'].home_nav);
    const menu: any = ref([{
        name: "留言板",
        path: "/application?mod=feedback"
      },
      {
        name: "日志",
        path: "/journal"
      },
      {
        name: "相册",
        path: "/album"
      },
      {
        name: "关于我",
        path: "/about"
      }
    ])

    function handleclick(param: any) {
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: param
      }))
      context.emit('onClick')
    }

    function handleMood() {
      router.push(`/u/${userInfo.value.account}/mood`)
    }

    function handleConcern(param: any) {
      if (param === 'praise') {
        router.push(proxy.const.setUrl({
          uid: getUid(),
          query: `?mod=${param}`
        }))
      } else {
        router.push(proxy.const.setUrl({
          uid: getUid(),
          query: `/concern?mod=${param}`
        }))
      }
    }

    return {
      handleclick,
      handleConcern,
      userInfo,
      currentUser,
      menu,
      handleMood,
      home_nav
    }
  }
})
</script>
