<template>
<div class="comment-wrap nobg" style="border-top: none;">
  <div class="absolute" style="top: 15px; right: 0; bottom: 15px; left: 0; overflow-y: auto;">
    <TalkItem :data="data" />
    <div class="plr30">
      弹幕开关:
      <v-switch :data="barrageSetting" :storage="true" @toggle="getValue" className="right" :auth="true" />
    </div>
    <Form :data="data" :render="render" page="res" />
    <div class="content comment-content" v-if="data.barrageList && data.barrageList.length > 0">
      <div class="comment-list" style="padding-left: 90px;" v-for="(item, index) in data.barrageList || []" :key="index">
        <div class="photos" style="left: 30px;">
          <v-photos :sourceData="item" />
        </div>
        <p class="m0">{{item.nickname}}</p>
        <p>{{item.times}}
        </p>
        <p v-html="item.content"></p>
      </div>
    </div>
    <v-nodata v-else trip="暂时还没有人发弹幕" />
  </div>
  <div class="half-circle" @click="expand"><i class="iconfont icon-arrow" style="margin: 0 !important" /></div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  useStore
} from '@/utils'
import TalkItem from './talkInfo.vue'
import Form from './formsss2.vue'
export default defineComponent({
  name: 'HomeViewe',
  components: {
    TalkItem,
    Form
  },
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
    expand: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  emits: ['switch'],
  setup(props, context) {
    const store = useStore()
    const barrageSetting: any = computed(() => store.getters['talk/barrageSetting']);

    function getValue(param: any) {
      store.commit('talk/setBarrageSetting', param)
      context.emit("switch", param);
    }
    onMounted(() => {
      store.commit('talk/setBarrageSetting', localStorage.getItem("barrage") || '0')
    })
    return {
      barrageSetting,
      getValue
    }
  }
})
</script>
