<template>
<div>
  <div class="con-list" v-for="(item, index) in sourceData" :key="index">
    <div class="con-wrap">
      <div class="photos">
        <v-photo :data="item" :style="{width: '50px', height: '50px', borderRadius: '50%'}" v-if="loginuser.account === item.uid" />
        <v-photos :sourceData="item" v-else />
      </div>
      <div class="user_info pb5"><span class="username">{{item.nickname}}</span>
      </div>
      <div class="user_from pb5">{{item.times}}</div>
      <div class="user_text markdown" style="min-height: 150px;">
        <div class="relative" style="min-height: 30px" v-if="item.content">
          <span v-html="item.content.replace(/\n/g, '<br/>')"></span>
          <v-audio :data="item" :hasMusic="true" v-if="item.background_music" />
          {{item.music_name}}
        </div>
        <div>
          <Images :data="item" />
        </div>
      </div>
    </div>
    <TalkItembar :data="item" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  useStore,
  useRouter,
  getUid
} from '@/utils'
import Images from './components/image.vue'
import TalkItembar from './TalkItembar.vue'

export default defineComponent({
  name: 'TalkItemView',
  components: {
    Images,
    TalkItembar,
  },
  props: {
    sourceData: {
      type: Array,
      default: () => {
        return []
      }
    },
    deleteTalk: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const loginuser = computed(() => store.getters['user/loginuser']);
    const showFlag = ref(false)
    const currentData = ref()
    const currentImg = ref()

    function handleClick(uid: any) {
      if (getUid() !== uid) {
        const path = window.location.pathname.split("/")
        window.location.href = `${path[1] === "app" ? "/app": ""}/u/${uid}/home`;
      } else {
        router.push(`${proxy.const.u}${uid}/home`)
      }
    }

    return {
      showFlag,
      currentData,
      currentImg,
      loginuser,
      handleClick
    }
  }
})
</script>
