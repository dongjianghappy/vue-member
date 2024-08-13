<template>
<div class="form-wrap-box">
  <div class="li">
    <span class="label">自动播放</span>
    <v-radiobutton name="musical_instrument" v-model:checked="userInfo.autoplay" :enums="[{label: '开启', value: '1'}, {label: '关闭', value: '0'}]" />
  </div>
  <div class="li">
    <span class="label">背景音乐</span>
    <input type="text" v-model="userInfo.music_name" placeholder="请输入歌曲名称" class="input-sm input-full" />
    <textarea v-model="userInfo.music_url" placeholder="请输入歌曲url地址" class="w-full"></textarea>
  </div>
  <div class="li">
    <span class="label"></span>
    <span @click="handleSave">保存</span>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useStore
} from '@/utils'
import Control from '../music/components/control.vue'
export default defineComponent({
  name: 'v-Avatar',
  components: {
    Control
  },
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore()

    function handleSave() {
      const {
        account,
        music_name,
        music_url,
        autoplay
      } = props.userInfo
      store.dispatch('common/Fetch', {
        api: "editUserInfo",
        data: {
          uid: account,
          music_name,
          music_url,
          autoplay
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "保存成功"
        })
      })
    }
    return {
      handleSave
    }
  }
})
</script>

<style lang="less" scoped>
.music-wrap {
  background: #2c2c2c;
  display: flex;
  width: 600px;
  height: 500px;

  .music-list {
    width: 150px;
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
