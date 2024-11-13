<template>
<div>
  <div class="con-list relative">
    <div class="con-wrap">
      <div class="photos">
        <a href="/{$sm_talklist[l].uid}/home" target="_blank">
          <img :src="data.photos" width="30" height="30" class="showuserinfo" data-uid="{$sm_talklist[l].account}" data-placement="automatic" data-toggle="tooltip{$sm_talklist[l].id}" data-left="150" />
        </a>
      </div>

      <div class="user_info pb5"><span class="username">{{data.nickname}}</span></div>
      <div class="user_from pb5">{{data.times}}</div>
      <div class="user_text">
        <div v-html="data.summary"></div>

        <!--转载渲染-->
        <template v-if="data.list">
          <div v-for="(list, i) in data.list" :key="i">
            <div v-if="list.video || list.image" style="background:#eee; margin-top: 5px; margin-left: -80px; margin-right: -15px; margin-bottom: -15px; padding-top: 10px; padding-left: 80px; padding-right:15px;    padding-bottom: 15px;">
              <span @click="handleclick(list.account || list.uid)" class="showuserinfo" style="color: #eb7350;">@{{list.nickname}}</span>

              <span v-html="list.summary"></span>
              <!-- 视频预览 -->
              <video v-if="list.video" src="{$sm_talklist[l].video}" class="playmp4" style="width: 450px; height: auto;">
                您的浏览器不支持HTML5
              </video>
            </div>
            <div v-else>
              <!-- 这部分显示最后转载用户吧 -->
              <span @click="handleclick(list.account || list.uid)" class="showuserinfo" style="color: #eb7350;">@{{list.nickname}}</span>
              <span v-html="list.summary"></span>
            </div>
          </div>
        </template>
        <!--原文渲染-->
      </div>
    </div>
    <TalkItembar :data="data" />    
  </div>

</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useRouter,
  getUid
} from '@/utils'
import TalkItembar from './TalkItembar.vue'


export default defineComponent({
  name: 'TalkItemView',
  components: {
    TalkItembar,
    Comment
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const router = useRouter();
    const showFlag: any = ref(false)

    function showImg() {
      showFlag.value = !showFlag.value
    }

    function handleclick(uid: any) {
      if (getUid() !== uid) {
        const path = window.location.pathname.split("/")
        window.location.href = `${path[1] === "app" ? "/app": ""}/u/${uid}/home`;
      } else {
        router.push(`${proxy.const.u}${uid}/home`)
      }
    }    

    return {
      showImg,
      showFlag,
      handleclick
    }
  }
})
</script>
