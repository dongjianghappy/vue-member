<template>
<v-button v-model:show="isShow">
  从相册中选择
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" title="相册" :style="style" :data="data" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content>
    <div style="overflow-y: auto; height: 420px;">
    <div class="col-md-3" :class="className" v-for="(item, i) in dataList" :key="i">
      <div class="m5 relative">
        <img :src="item.image[0]" height="140" style="border-radius: 8px; width: 100%" @click="handleChoose(item.image[0])" />
        <i class="iconfont icon-checkbox m0 cl-red" style="right: 0px; top: 0px; padding: 2px; z-index: 1;" v-if="item.image[0] === img"></i>
      </div>
    </div>
    </div>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useStore,
  ref,
  watch
} from '@/utils'
import List from '@/views/index/album/components/list.vue'

export default defineComponent({
  name: 'HomeViewh',
  components: {
    List
  },
  props: {
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
    },
    submit: {
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
    const aaaaaaaaa: any = ref(null)
    const isShow = ref(false)
    const cover: any = ref(null)
    const pic: any = ref(null)
    const dataList: any = ref([])
    const img = ref("")

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        api: "photoList"
      }).then(res => {
        dataList.value = res.result
      })
    }

    function submit() {
      const params: any = {}
      const arr = img.value.split("/")
      params[props.data.file] = arr[arr.length-1]
      props.submit(params)
      isShow.value = false
    }

    function handleChoose(param: any){
      
      img.value = param
    }

    return {
      isShow,
      cover,
      pic,
      img,
      submit,
      aaaaaaaaa,
      onmousedown,
      dataList,
      handleChoose
    }
  }
})
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
