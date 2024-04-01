<template>
  <div class="music-wrap">
    <div class="music-left">
      <div class="music-list nowrap ptb10 plr15"
           :class="{'music-current': item.id === data.id}"
           style="line-height: 20px;"
           v-for="(item, index) in dataList"
           :key="index"
           @click="handlePlay(item)">
        <i class="iconfont icon-music m0" />
        {{item.music_name}}
      </div>
    </div>
    <div class="music-content">

      <div class="align_center ptb25"
           style="height: 365px">
        <div class="inline"
             :class="{animate: data.isplay}"
             style="border-radius: 50%;
    width: 200px;
    height: 200px;
        overflow: hidden;
}">
          <v-img src="http://yunxi10.com/source/public/images/music.png" />
        </div>
        <div>{{data.music_name}}</div>
      </div>
      <div class="music-control">
        <Control :dataList="dataList"
                 :data="data" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'
import VueEvent from '@/utils/event'
import Control from './components/control.vue'
export default defineComponent({
  name: 'v-Avatar',
  components: {
    Control
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
    }
  },
  setup(props, context) {

    function handlePlay(param: any) {
      VueEvent.emit("musicPley", param);
      VueEvent.emit("play_music", param);
    }

    return {
      handlePlay
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
        i{
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
