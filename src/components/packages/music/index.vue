<template>
<v-dialog v-model:show="isShow" ref="form" title="" :close="false" :style="{width: '850', height: '550'}" :contentStyle="{padding: 0}" :hasfooter="false">
  <template v-slot:content>
    <div class="music-wrap relative">
      <i class="iconfont icon-music absolute m0 p0" style="right: 0; bottom: 0; font-size: 350px; opacity: 0.03;" />
      <div id="chats" class="music-main relative">
        <div class="absolute" style="top: 0px; bottom: 0px;" :class="{'music-slide-right': config.aside, 'music-slide-left': !config.aside}">
          <Left :data="musicLists" />
        </div>
        <div class="music-center" :class="{'music-screen1': config.aside, 'music-screen2': !config.aside}">
          <div class="p15 align_center relative">
            <Cover :data="musicLists.currentMusic" />
          </div>
          <!-- 歌词 -->
          <div class="relative" style="height: 174px;">
            <div class="absolute p15" style="width: 100%; top:0; bottom:10px; z-index: 10;">
              <canvas id="music-canvas" style="width: 100%; height: 100%;"></canvas>
              <!-- <Analyser ref="yinpin" :data="musicLists.currentMusic" /> -->
            </div>
            <Lrc :data="musicLists.currentMusic && musicLists.currentMusic.lrc" />
          </div>
          <!-- 进度条 -->
          <div>
            <Control @operate="handleOperate" :data="musicLists" :update="updateSetting" />
          </div>
        </div>
        <div class="music-right" :class="{'music-setting-right': !config.setting, 'music-setting-left': config.setting}">
          <Setting :data="setting" :update="updateSetting" />
        </div>
      </div>
    </div>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import Left from './components/left.vue'
import Cover from './components/cover.vue'
import Analyser from './components/analyser.vue'
import Lrc from './components/lrc.vue'
import Setting from './components/setting.vue'
import Control from './components/control.vue'

import {
  computed,
  defineProps,
  onMounted,
  ref,
  watch,
  useStore
} from '@/utils'
import {
  nextTick,
  toRefs
} from 'vue'
import {
  animationFrame
} from './fn'
import VueEvent from '@/utils/event'
const props: any = defineProps({
  isShow: {
    type: Boolean,
    default: false
  }
})
const store = useStore()
const musicLists = computed(() => store.getters['user/music']);
const curentMusicss: any = computed(() => store.getters['user/music'].currentMusic);
const isShow = ref(false)
const yinpin: any = ref(null)
const setting: any = ref({})
const config: any = ref({
  aside: true,
  setting: false
})
const emit: any = defineEmits(['update:isShow'])

  // 监听
  watch([isShow], async (newValues, prevValues) => {
    if (!isShow.value) {
      emit('update:isShow', false)
    }else{
        nextTick(() => {
    setTimeout(() => {
      animationFrame(curentMusicss.value, 'music-canvas')
    }, 10)
  })
    }
  })

// 监听路由
watch(curentMusicss, (newValues, prevValues) => {
  if (musicLists.value.setting.yinpin === '1') {
    setTimeout(() => {
      animationFrame(curentMusicss.value, 'music-canvas')
    }, 1000)
  }
})

function init() {
  store.dispatch('common/Fetch', {
    api: "playInfo",
  }).then(res => {
    const {
      lrc_location,
      theme,
      yinpin
    }: any = res.result
    setting.value = {
      regular: theme === '1' ? '1' : '0',
      trends: theme === '2' ? '1' : '0',
      top: lrc_location === 'top' ? '1' : '0',
      right: lrc_location === 'right' ? '1' : '0',
      bottom: lrc_location === 'bottom' ? '1' : '0',
      left: lrc_location === 'left' ? '1' : '0',
      yinpin: yinpin
    }
  })
}

function updateSetting(param: any = {}) {
  for (let k in param) {
    store.commit('user/setPlaySetting', {
      name: k,
      value: param[k]
    })
  }
  store.dispatch('common/Fetch', {
    api: "playSetting",
    data: {
      ...param
    }
  })
}

function handleOperate(param: any) {
  config.value[param] = !config.value[param]
}
onMounted(() => {
  init()
  isShow.value = props.isShow
})
</script>

<style lang="less">
.music-wrap {
  width: 100%;
  height: auto;

  .music-main {
    width: 100%;
    height: 550px;
    display: flex;

    .music-left {
      background: rgba(0, 0, 0, 0.15);
      width: 180px;
      height: 100%;
      color: #eee;

      .music-name {
        padding: 10px;
        width: 180px;
        height: 55px;
        line-height: 40px;
        font-size: 18px;
        color: #999;
      }

      .list {

        padding: 10px;
        color: #666;
        i{
          color: #666;
          // opacity: 0.25;
        }
        &.current{
          background: var(--module-background);
          color: var(--color-primary);
          i{
            color: var(--color-primary);
            opacity: 1;
          }
        }
      }
    }

    .music-center {
      width: 100%;
      .cover{
        border-radius: 50%;
        width: 250px;
        height: 250px;
        overflow: hidden;
      }
    }

    .music-right {
      border-left: 1px solid var(--default-border);
      background: var(--module-background);
      position: absolute;
      right: -200px;
      padding: 15px;
      width: 200px;
      height: 100%;
      z-index: -1;
      .music-setting-warp{
        .li{
              position: relative;
    padding: 10px 5px 10px 100px !important;
    min-height: 42px;
    line-height: 32px;
          .label{
    position: absolute;
    left: 0px !important;
    top: 50%;
    margin-top: -15px;
    font-size: 14px;
    color: #666;
    font-weight: normal;
          }
        }
      }
    }
  }
}

.animate {
  animation-name: rotate-animation;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  /* 无限次重复动画 */
  animation-timing-function: linear;
  /* 线性变化速度曲线 */
}

@keyframes rotate-animation {
  0% {
    transform: rotate(0deg);
  }

  /* 初始状态 */
  100% {
    transform: rotate(360deg);
  }

  /* 结束状态 */
}

.animate-paused {
  animation-play-state: paused;
}

.animate-running {
  animation-play-state: running;
}

.music-screen1 {
  transition: .5s, ;
  width: calc(100% - 180px) !important;
  margin-left: 180px;
}

.music-screen2 {
  transition: .5s, ;
  margin-left: 0;
  width: 100% !important;
}

.music-slide-left {
  transition: .5s, ;
  left: -180px;
}

.music-slide-right {
  transition: .5s, ;
  left: 0;
}

.music-setting-left {
  transition: .5s, ;
  right: -200px !important;
}

.music-setting-right {
  transition: .5s, ;
  right: 0 !important;
}
</style>
