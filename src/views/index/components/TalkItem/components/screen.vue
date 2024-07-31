<template>
<div ref="swiper" class="video-wrap" :style="{height: `${height}px`}" @wheel.prevent="handleScroll">
  <div :style="{height: `${height}px`}">
    <div class="relative" :class="{'screen1': commentStatus || barrageStatus, 'screen2': !commentStatus && !barrageStatus}" :style="{height: `${height}px`}">
      <div class="background-mask">
        <img :src="data.cover || data.image && data.image[0]" />
      </div>
      <div class="absolute align_center" style="top: 15%; right: 10px; width: 50px; z-index: 1000000000;">
        <div class="sidebar-ground">
          <div class="sidebar-item arrow-btn p0">
            <div class="deg270 inline p5" :class="{'no-event': number == '0'}" @click.stop @click="toggle(-1, number)" v-if="index !== 0">
              <i class="iconfont icon-arrow pointer block" />
            </div>
          </div>
          <div class="sidebar-item arrow-btn p0">
            <div class="deg90 inline p5" @click.stop @click="toggle(1, number)" v-if="index !== data.image.length-1">
              <i class="iconfont icon-arrow pointer block" />
            </div>
          </div>
          <div class="sidebar-item mb20">
            <div class="photos">
              <v-photo :data="data" sub="concern" />
            </div>
          </div>
          <div class="sidebar-item" @click="handlePraise(data)">
            <div class="icon-button"><i class="iconfont icon-love-1" /></div>
            <div class="text">{{data.praise}}</div>
          </div>
          <div class="sidebar-item" @click="handleClick" v-if="module.talk_comment">
            <div class="icon-button"><i class="iconfont icon-comment-1" /></div>
            <div class="text">{{data.comment}}</div>
          </div>
          <div class="sidebar-item" @click="handleCollect(data)">
            <div class="icon-button"><i class="iconfont icon-star-1" /></div>
            <div class="text">{{data.collect}}</div>
          </div>
          <div class="sidebar-item">
            <div class="icon-button"><i class="iconfont icon-share-1" /></div>
            <div class="text">{{data.forwarding}}</div>
          </div>
          <div class="sidebar-item" @click="handleBarrage" v-if="module.talk_barrage">
            <div class="icon-button"><i class="iconfont" :class="`icon-barrage-${barrageSetting.item.barrage == '0' ? '2' : '1'}`" /></div>
          </div>
        </div>

      </div>
      <div class="userInfo" :style="{bottom: data.type == 'video' ? '50px' : '25px'}">
        <div class="user-name">@{{data.nickname}} <span class="font12 cl-white">{{data.times}}</span>

          <span class="ml10 font12 cl-white pointer" @click="showImg(data, data.image[0])" v-if="data.type == 'img'">
            <i class="iconfont icon-img font12 cl-white m0" />
            查看大图</span>
          <span v-if="data.vote">
            <Vote :data="data" /></span>
        </div>
        <div class="user-summary" v-html="data.summary"></div>
      </div>
      <div class="control-wrap" style="z-index: 1000000001" v-if="data.type === 'video'">
        <v-control ref="control" :data="data" />
      </div>
      <v-barrage ref="barrage" :data="data" />
      <slot></slot>
    </div>
    <div @wheel.stop class="absolute ptb15" :class="{'screen-right': commentStatus, 'screen-left': !commentStatus}" style=" background: #222; top: 0; width: 360px" :style="{height: `${height}px`}">
      <Comment ref="comment" :data="{fn: fn_talk, ...data}" :render="getComment" :expand="handleClick" />
    </div>
    <div @wheel.stop class="absolute ptb15" :class="{'screen-right': barrageStatus, 'screen-left': !barrageStatus}" style=" background: #222; top: 0; width: 360px" :style="{height: `${height}px`}" v-if="module.talk_barrage">
      <Barrage ref="comment" :data="{fn: fn_talk, ...data}" :render="getBarrage" @switch="barrageSwitch" :expand="handleBarrage" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onUnmounted,
  computed,
  useStore
} from '@/utils'
import {
  debounce
} from 'lodash';
import Comment from '../comment/recommend.vue'
import Barrage from '../comment/barrage.vue'
import VueEvent from '@/utils/event'
import Vote from '../vote/index.vue'
export default defineComponent({
  name: 'v-Screen',
  components: {
    Comment,
    Barrage,
    Vote
  },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    number: {
      type: Number,
      default: 0
    },
    height: {
      type: String,
      default: 600
    }
  },
  emits: ['update:currentIndex', 'toggle'],
  setup(props, context) {
    const store = useStore()
    const loginuser = computed(() => store.getters['user/loginuser']);
    const module = computed(() => store.getters['user/config_talk'].talk_send_tool || []);
    const fn_talk: any = computed(() => store.getters['user/config_talk'].fn_talk);
    const commentStatus = computed(() => store.getters['talk/commentStatus']);
    const barrageSetting: any = computed(() => store.getters['talk/barrageSetting']);
    const barrageStatus = computed(() => store.getters['talk/barrageStatus']);
    const comment: any = ref(null)
    const barrage: any = ref(null)
    const currentTalk: any = ref([])
    const swiper: any = ref(null)
    const control: any = ref(null)
    const isSelect: any = ref(false)
    const isSelect2: any = ref(false)

    function toggle(num: any, number: any) {
      let height = swiper.value.clientHeight
      if (num == 1 && props.number == props.dataList.length - 1) {
        return
      }
      swiper.value.parentNode.style.top = `-${(num+number) * height}px`
      let talk: any = props.dataList[num + props.number]
      currentTalk.value = talk
      getComment(talk)
      getBarrage(talk)
      viewingRecords(talk)
      context.emit('update:currentIndex', num + props.number)
      context.emit('toggle')
      play(num)
    }

    const handleScroll = debounce((event: any) => {
      let height = swiper.value.clientHeight
      let num: any = 0
      num = event.deltaY > 0 ? 1 : -1
      if (num == 1 && props.number == props.dataList.length - 1) {
        return
      }
      swiper.value.parentNode.style.top = `-${(num + props.number) * height}px`
      let talk: any = props.dataList[num + props.number]
      currentTalk.value = talk
      if (props.number == 0) {
        return
      }
      getComment(talk)
      getBarrage(talk)
      viewingRecords(talk)
      context.emit('update:currentIndex', num + props.number)
      context.emit('toggle')
      play(num)
    }, 200); // 设置 200 毫秒的防抖时间  

    // 获取评论
    function getComment(param: any = {}) {
      store.dispatch('common/Fetch', {
        api: 'ArtList',
        data: {
          coding: param.coding3,
          artid: param.id
        }
      }).then(res => {
        param.commentList = res.result.list
      })
    }

    // 获取评论
    function viewingRecords(param: any = {}) {
      store.dispatch('common/Fetch', {
        api: 'viewingRecords',
        data: {
          artid: param.id,
          duration: '32000'
        }
      }).then(res => {
        // param.commentList = res.result.list
      })
    }


    // 获取弹幕
    function getBarrage(param: any = {}) {
      store.dispatch('common/Fetch', {
        api: 'barrageList',
        data: {
          artid: param.id
        }
      }).then(res => {
        param.barrageList = res.result
        barrage.value.sendBarrage()
      })
    }

    function play(num: any) {
      let index = props.dataList.findIndex((item: any) => item.id === props.data.id)
      let data: any = props.dataList[index + num]

      props.dataList.map((item: any) => {
        if (props.data.id !== item.id && item.type == "video") {
          let audio1: any = document.getElementsByClassName('video_' + item.id)
          item.isplay = false
          audio1[0].pause()
        }
      })

      // if (data.type === 'video') {
      // control.value.handlePlay(data)
      // }
    }

    function handlePraise(param: any) {
      store.dispatch('common/Fetch', {
        api: 'Praise',
        data: {
          coding: param.coding4,
          artid: param.id
        }
      }).then(res => {
        if (res.ifSuccess === 2) {
          return
        }
        props.data.collect = res.result.num
        if (res.result.state === 1) {
          props.data.hascollect = 1
        } else {
          props.data.hascollect = 0
        }

      })
    }

    function handleCollect(param: any) {
      store.dispatch('common/Fetch', {
        api: 'Collect',
        data: {
          coding: param.coding5,
          artid: param.id
        }
      }).then(res => {
        if (res.ifSuccess === 2) {
          return
        }
        props.data.collect = res.result.num
        if (res.result.state === 1) {
          props.data.hascollect = 1
        } else {
          props.data.hascollect = 0
        }

      })
    }

    function handleClick(param: any) {
      isSelect.value = !isSelect.value
      isSelect2.value = false
      store.commit('talk/setBarrageStatus', false)
      store.commit('talk/setCommentStatus', isSelect.value)
    }

    function handleBarrage(param: any) {
      isSelect.value = false
      isSelect2.value = !isSelect2.value
      store.commit('talk/setCommentStatus', false)
      store.commit('talk/setBarrageStatus', isSelect2.value)
    }

    function barrageSwitch() {
      barrage.value.sendBarrage()
    }

    function showImg(data: any, img: any) {
      VueEvent.emit("layout", {
        data,
        img
      });

      // currentData.value = data
      // currentImg.value = img
    }

    onUnmounted(() => {
      document.removeEventListener('wheel', handleScroll);
    });

    return {
      comment,
      barrage,
      loginuser,
      module,
      fn_talk,
      commentStatus,
      barrageSetting,
      barrageStatus,
      currentTalk,
      swiper,
      control,
      toggle,
      handleScroll,
      handleClick,
      handleBarrage,
      getComment,
      getBarrage,
      barrageSwitch,
      handlePraise,
      handleCollect,
      showImg
    }
  }
})
</script>

<style lang="less">
.userInfo {
  z-index: 100000;
  position: absolute;
  left: 20px;
  bottom: 55px;

  .user-name {
    margin-bottom: 5px;
    font-size: 18px;
    color: #fff;
  }

  .user-summary {
    font-size: 16px;
    color: #fff;
    a{
      color: #eb7340 !important;
    }
  }
}

.control-wrap {
  z-index: 100000;
  position: absolute;
  left: 0px;
  bottom: 0px;
  right: 0
}

.screen1 {
  transition: .5s, ;
  width: calc(100% - 360px);
}

.screen2 {
  transition: .5s, ;
  width: 100%;
}

.screen-left {
  transition: .5s, ;
  right: -360px;
}

.screen-right {
  transition: .5s, ;
  right: 0;
}
</style>
