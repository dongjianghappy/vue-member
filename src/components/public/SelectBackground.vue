<template>
<v-button v-model:show="isShow">
  <div class="zhejiao"><i class="iconfont icon-zhejiao" /></div>
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :style="style" :data="data" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content>
    <v-tabs :tabs="[{name: '本地上传',value: 'photos'},{name: '相册',value: 'background'}]" :isEmit="true">
      <template v-slot:content1>
        <v-listsss ref="aaaaaaaaa" :kind="kind" :image="img" :size="size" :mask="mask" />
      </template>
      <template v-slot:content2>
        <List :kind="kind" />
      </template>
    </v-tabs>

  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  useStore,
  ref,
} from '@/utils'
import List from '@/views/index/album/components/list.vue'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  kind: {
    type: String,
    default: 'head_background'
  },
  mask: {
    type: Object,
    default: {
      w: 1050,
      h: 350,
      tb: 50,
      lr: 50
    }
  },
  size: {
    type: Object,
    default: () => {
      return {
        width: 500,
        height: 300
      }
    }
  },
  style: {
    type: Object,
    default: () => {
      return {
        width: 670,
        height: 570
      }
    }
  },
  img: {
    type: Object,
    default: () => {
      return {
        width: 800
      }
    }
  }
})
const store = useStore();
const aaaaaaaaa: any = ref(null)
const isShow = ref(false)
const cover: any = ref(null)
const pic: any = ref(null)
let offX: any = 0 // 图片默认x坐标
let offY: any = 0 // 图片默认y坐标

function submit() {
  let src = aaaaaaaaa.value.cutPicture()
  store.dispatch('common/Fetch', {
    api: "UploadPhotos",
    data: {
      uploadType: props.kind,
      type: 0,
      root: 1,
      img: src,
      ...props.data
    }
  }).then(res => {
    isShow.value = false
    store.dispatch('user/Detect')
  })
}
</script>

<style lang="less" scoped>
.pic {
  position: relative;
  height: 400px;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;

  .mask-box {
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    pointer-events: none;
  }

  .mask-top {
    top: 0;
    width: 100%;
    height: 50px;

    &.banner {
      height: 170px;
    }
  }

  .mask-right {
    top: 50px;
    right: 0;
    bottom: 50px;
    width: 50px;
    height: 300px;

    &.banner {
      top: 170px;
      height: 260px;
    }
  }

  .mask-bottom {
    bottom: 0;
    width: 100%;
    height: 50px;

    &.banner {
      height: 170px;
    }
  }

  .mask-left {
    top: 50px;
    left: 0;
    bottom: 50px;
    width: 50px;
    height: 300px;

    &.banner {
      top: 170px;
      height: 260px;
    }
  }

  .canvas-box {
    position: absolute;
    top: 50px;
    left: 50px;
    width: 300px;
    height: 300px;
    pointer-events: none;

    &.banner {
      top: 170px;
      width: 1000px;
      height: 260px;
    }
  }
}
</style>
