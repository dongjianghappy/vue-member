<template>
  <div class="talk-home w1100 mb15">

    <div class="user-home-photos">
      <img id="uploadphotos"
           data-root="1"
           :src="userInfo.photos"
           width="120"
           height="120"
           style="border-radius:50%; cursor:pointer;"
           class="userphotos">
      <ul class="mt5">
        <li @click="handleConcern('myconcern')"
            class="pointer">
          <span><strong>{{userInfo.myconcern}}</strong><span>关注</span></span>
        </li>
        <li @click="handleConcern('concernmy')"
            class="pointer">
          <span><strong>{{userInfo.concernmy}}</strong><span>粉丝</span></span>
        </li>
        <li>
          <a><strong>{{userInfo.talk}}</strong><span>话题111</span></a>
        </li>
      </ul>
    </div>
    <div class="home-info relative"
         style="bottom:20px;">
      <div class="absolute"
           style="left: -65px;">
        <div class="mb10 font16">
          {{userInfo.nickname}}
          <span style="color: #f67f00;">LV.{{userInfo.level}}</span>
          <v-concernbutton :data="userInfo" />
        </div>
        <p>{{userInfo.introduction}}</p>
        <p class="ptb10 font12"
           style="color: #8bc34a;">
          <span v-if="userInfo.mood">{{userInfo.mood}}: {{userInfo.mood_description}}</span>
          <span v-else>暂无心情</span>
          <Mood v-if="currentUser" />

        </p>
      </div>
    </div>

    <div class="user-info">
      <ul class="align_right">
        <li class="inline font14  current ml10 plr15"
            v-for="(item, index) in menu"
            :key="index"
            @click="handleclick(item.path)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, ref } from 'vue'
import {useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import {useStore} from 'vuex'
import { getUid } from '@/utils'
import Mood from '../../views/index/components/mood.vue'

export default defineComponent({
  name: 'v-Search',
  components: {
    Mood
  },
  emits: ['onClick'],
  setup(props,context) {
    const {ctx, proxy}:any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const userInfo = computed(() => store.getters['user/userInfo']);
    const currentUser = computed(() => store.getters['user/currentUser']);
    const menu: any = ref([
      {name: "留言板", path: "/application?mod=feedback"},
      {name: "日志", path: "/journal"},
      {name: "相册", path: "/album"},
      // {name: "关于我", path: "/"},
      // {name: "留言板", path: "/application?mod=feedback"}
    ])

    function handleclick(param: any){
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: param
      }))
      context.emit('onClick')
    }

    function handleConcern(param:any){
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: `/concern?mod=${param}`
      }))
    }    
    return {
      handleclick,
      handleConcern,
      userInfo,
      currentUser,
      menu
    }
  }
})
</script>
