<template>
<div class="music-wrap">
  <div class="music-left">
    <div class="music-list nowrap ptb10 plr15" :class="{'music-current': item.id === data.id}" style="line-height: 20px;" v-for="(item, index) in dataList" :key="index" @click="handlePlay(item)">
      <i class="iconfont icon-music m0" />
      {{item.music_name}}
    </div>
  </div>
  <div class="music-content">

    <div class="align_center" style="height: 365px">
      <div class="inline" :class="{animate: data.isplay}" style="border-radius: 50%;
    width: 200px;
    height: 200px;
        overflow: hidden;
}">
        <v-img src="http://localhost/source/public/images/music.png" />
      </div>
      <div class="relative" style="height: 145px;">
        <div class="absolute" style="width: 100%; bottom:0; z-index: -1;">
          <Musicsss ref="qqqqqq" />
        </div>

        <div style="height: 145px; overflow: hidden;">
          <div id="lrc-wrap" style="transition: all 0.3s; z-index: 100">
            <div v-for="(item, index) in lrc.list" :key="index" style="line-height: 30px;">
              <span :class="{'bold font16 cl-red': currentIndex === index}" @click="handleClick(index)">{{item}}</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="music-control">
      <Control :dataList="dataList" :data="data" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  timeToSeconds
} from '@/utils'
import VueEvent from '@/utils/event'
import Control from './components/control.vue'
import Musicsss from './components/musicsss.vue'
export default defineComponent({
  name: 'v-Avatar',
  components: {
    Control,
    Musicsss
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
    lrc: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup(props, context) {
    const currentIndex: any = ref(0)
    const qqqqqq: any = ref(null)

    function handlePlay(param: any) {
      VueEvent.emit("musicPley", param);
      VueEvent.emit("play_music", param);
    }

    function handleClick(index: any) {
      let lrc: any = document.getElementById("lrc-wrap")
      lrc.style.transform = `translateY(-${30*index}px)`
      currentIndex.value = index

      let audio: any = document.getElementById('listen_music');
      audio.currentTime = timeToSeconds(props.lrc.time[index])

      audio.play()
    }

    onMounted(() => {
      // VueEvent.on("sliding", (index: any) => {
      //   let lrc: any = document.getElementById("lrc-wrap")
      //   lrc.style.transform = `translateY(-${30*index}px)`
      //   currentIndex.value = index
      // })
    })

    return {
      handlePlay,
      handleClick,
      currentIndex,
      qqqqqq
    }
  }
})
</script>

<style lang="less" scoped>
.music-wrap {
  background: var(--card-background);
  display: flex;
  width: 600px;
  height: 500px;

  .music-left {
    background: var(--module-background);
    width: 150px;
    height: 500px;

    .music-list {
      cursor: pointer;

      &.music-current {
        background: var(--card-background);
        color: #f00;

        i {
          color: #f00;
        }
      }

      &:hover {
        background: var(--card-background);
      }
    }
  }

  .music-content {
    flex: 1;
    height: 325px;
    padding: 50px 15px;

    .music-control {
      .control {
        background: none;
      }

      height: 75px;
    }
  }
}
</style><style scoped>
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
</style>
