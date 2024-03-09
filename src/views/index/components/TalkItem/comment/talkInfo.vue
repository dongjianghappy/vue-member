<template>
<div class="con-list nobg" style="border-bottom: 1px solid #292929;">
  <div class="con-wrap" style="padding-left: 95px;">
    <div class="photos" style="left: 30px;">
      <v-photo :data="data" :style="{width: '50px', height: '50px', borderRadius: '50%'}" v-if="loginuser.account === data.uid" />
      <v-photos :sourceData="data" v-else />
    </div>
    <div class="user_info pb5">
      <span class="username">
        {{data.nickname}}
      </span>
    </div>
    <div class="user_from pb5">{{data.times}}
      <span class="ml5 cl-eb7350" v-if="data.istop === '1'">置顶</span>
    </div>
    <div class="user_text markdown mt30 font16" style="margin-left: -65px;">
      <div class="relative" style="min-height: 30px" v-if="data.summary">
        <span v-html="data.summary.replace(/\n/g, '<br/>')"></span>
        <v-audio :data="data" :hasMusic="true" v-if="data.background_music" />
        {{data.music_name}}
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'TalkItemView',
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    },
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const loginuser = computed(() => store.getters['user/loginuser']);
    const showFlag = ref(false)
    const currentData = ref()
    const currentImg = ref()
    return {
      showFlag,
      currentData,
      currentImg,
      loginuser
    }
  }
})
</script>
