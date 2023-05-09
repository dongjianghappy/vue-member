<template>
<div :class="{modal: type !== 'modal'}">
  <perfect-scrollbar>

    <div class="module-wrap nobg">
      <div class="module-content p0" style="overflow: hidden;">
        <div class="col-md-2 p10" v-for="(item, index) in dataList" :key="index">
          <div class=" space-wrap relative align_center" @click="handleClick('open', item.file, item.name)" v-if="item.type === '文件夹'">
            <div :class="`space-file`">
              <div><img :src="item.path" width="40"></div>
              <div class="nowrap">{{item.name}}</div>
            </div>
          </div>
          <div class=" space-wrap relative align_center" :class="{current : currentImg.file === item.file}" @click="handleSelect(item)" v-else>
            <div class="space-picture">
              <div><img :src="item.img_url" width="40"></div>
            </div>
            <div class="space-operating" v-if="type !== 'modal'"><span><i class="iconfont icon-copy"></i></span><span><i class="iconfont icon-url"></i></span><span><span><i class="iconfont icon-recycle"></i></span></span></div>
          </div>
        </div>
        <v-nodata :data="dataList || []" />
      </div>

    </div>
  </perfect-scrollbar>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore,
  codings
} from '@/utils'
export default defineComponent({
  name: 'HomeViewdd',
  props: {
    aaa: {
      type: String,
      default: true
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: ''
    }
  },
  emits: ['update:data'],
  setup(props, context) {
    const store = useStore();
    const dataList: any = ref([]);
    const prev: any = ref("")
    const dirs: any = ref("../upload/")
    const files: any = ref("")
    const currentDir: any = ref("")
    const currentImg: any = ref("")

    function init() {
      store.dispatch('common/Fetch', {
        api: "space"
      }).then(res => {
        debugger
        dataList.value = res.result.fileList
      })
    }

    function handleClick(type: any, data: any, filesss: any) {

      let file: any = ''
      let dir: any = ''

      switch (type) {
        // 返回
        case 'return':
          dir = dirs.value.split('/')
          file = data ? `${data}` : ''
          dir.splice(dir.length - 2, 2)
          dirs.value = `${dir.join('/')}/`
          break

          // 打开目录
        case 'open':
          debugger
          file = data ? `&${data}` : ''
          dir = `${dirs.value}${filesss}/`
          dirs.value = dir
          files.value = filesss
          break
          // 初始化
        default:
          file = data || ''
      }
      currentDir.value = file

      store.dispatch('common/Fetch', {
        api: "space",
        data: {
          file,
        },
      }).then(res => {
        dataList.value = res.result.fileList
        prev.value = res.result.prev_dir
      })

    }

    // 选择图片
    function handleSelect(param: any){
      currentImg.value = param
      context.emit('update:data', currentImg.value)
    }

    onMounted(init)

    return {
      dataList,
      dirs,
      prev,
      currentDir,
      init,
      handleClick,
      currentImg,
      handleSelect
    }
  }
})
</script>

<style scoped>
.modal {
  overflow: auto;
}
.current {
  background: url(@/assets/image/is_select.png) no-repeat bottom right;
  border: 1px solid #F00;
}
.ps {
  height: 400px;
}
</style>
