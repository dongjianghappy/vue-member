<template>
<div>
  <div class="ablumimg" :class="('talk' && imgList.length > 0  || file !== 'talk') ? 'p15' : 'p0'">
    <!-- 图片上传 -->
    <ul v-if="file === 'image' || (file === 'talk' && imgList.length)">
      <li v-for="(item, index) in imgList" :key="index" class="upload-album-wrap relative" :style="style" draggable="true" @dragend="handleDragEnd($event, item)" @dragstart="handleDragStart($event, item)" @dragenter="handleDragEnter($event, item)" @dragover.prevent="handleDragOver($event, item)">
        <!-- <img draggable="true" :src="item.src" v-if="item.status ==='complete'" /> -->
        <v-img draggable="true" :src="item.src" v-if="item.status ==='complete'" />
        <div class="load1" v-else>
          <div class="loader">Loading...</div>
        </div>
        <i class="iconfont icon-cover absolute font24" style="top: 0px; right: 0px; color: #999" v-if="cover && item.src.indexOf(cover) > -1"></i>
        <div class="cover" style="top: 0; display: none;" v-if="mask"><i class="iconfont icon-close removeimg" @click="remove(index)"></i></div>
        <div class="album-operating" v-else>
          <span><i class="iconfont icon-copy" title="复制" @click="handleCopy(item.src)"></i></span>
          <span><i class="iconfont icon-view" title="查看"></i></span>
          <span><i class="iconfont icon-mail" title="设置封面" @click="handleCover(item.src)"></i></span>
          <span><i class="iconfont icon-recycle" title="删除" @click="remove(index)"></i></span></div>
      </li>
      <li class="upfile" :style="style" @click="handleclick" v-if="imgList.length < maxLength"><i class="iconfont icon-add"></i></li>
    </ul>
    <!-- 音视频上传 -->
    <div class="inline" v-else-if="file === 'music' || file === 'vidoe'">
      <div class="add-button-file"><i class="iconfont icon-upload-file font32" /></div>
      <div>拖拽{{file === 'music' ? '音频' : '视频'}}到此处或点击上传</div>
      <button class="btn btn-default w-full" @click="handleclick">上传{{file === 'music' ? '音频' : '视频'}}</button>
    </div>
  </div>
  <input type="file" ref="FileUpload" :accept="format" multiple="multiple" style="display: none" @change="getFile">
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch
} from 'vue'
import {
  useStore
} from 'vuex'
export default defineComponent({
  name: 'v-Upload',
  props: {
    file: {
      type: String,
      default: 'image'
    },
    uploadtype: {
      type: String,
      default: 'weibo'
    },
    style: {
      type: String,
      default: ""
    },
    format: {
      type: String,
      default: '.jpg, .jpeg, .bmp, .gif, .png, .webp, .heif, .heic, .mp4, .mp3'
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dataList: {
      type: Array,
      default: []
    },
    maxLength: {
      type: String,
      default: "50"
    },
    mask: {
      type: Boolean,
      default: false
    }
  },
  emits: ['imgList', 'update:haschoose', 'update:file'],

  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const FileUpload: any = ref(null) // 选择文件id
    let imgList: any = ref([]) // 文件内容
    const dragging = ref(null) // 拖拽状态
    const box: any = ref(0)
    const cover: any = ref("")

    // 监听路由
    watch(() => props.dataList, (newValues, prevValues) => {
      props.dataList.map((item) => {
        imgList.value.push({
          src: item,
          status: "complete"
        })
      })
      cover.value = props.data.cover
    })

    // 选择文件
    function getFile() {
      let _obj: any = FileUpload.value
      context.emit('update:haschoose', _obj.files)
      for (let i = 0; i < _obj.files.length; i++) {
        imgList.value.push({
          src: _obj.files[i].name,
          status: "upload"
        })

        let fd = new FormData()
        fd.append('upload' + i, _obj.files[i])
        store.dispatch('common/uploadImg', {
          uploadtype: props.uploadtype,
          dir: props.data.dir,
          upload: true,
          data: fd,
          progress: (e: any) => {
            let url = URL.createObjectURL(_obj.files[i])
            let element = new Audio(url)
            let format = _obj.files[i].name.split('.')[1]
            element.addEventListener('loadedmetadata', () => {
              context.emit('update:file', {
                name: _obj.files[i].name,
                fileUrl: url,
                cover: "",
                format: format, // 格式
                duration: element.duration,
                progresstotal: e.total,
                bar: (e.loaded * 100) / e.total,
                size: `${(e.total / 1024 / 1024).toFixed(3)}MB`,
                loaded: `${(e.loaded / 1024 / 1024).toFixed(3)}MB`
              })
            })

          }
        }).then(res => {
          if (res == null || res.ifSuccess === 2) {
            imgList.value = []
            return
          }
          // 上传成功后，将状态改成完成并且展示图片
          let arr: any = imgList.value.filter((item: any) => item.status === "upload")
          arr[0].status = "complete"
          arr[0].src = res[0].img
          context.emit('imgList', img(imgList.value))
        })
      }
    }

    // 文件处理
    function img(data: any) {
      let abc = ""
      if (data.length) {
        abc = "|"
        for (let i = 0; i < data.length; i++) {
          let v = data[i].src.split("/");
          v = v[v.length - 1] + "|"
          abc += v
        }
      }
      return abc;
    }

    function handleclick() {
      let _obj: any = FileUpload.value
      _obj.dispatchEvent(new MouseEvent('click'))
    }

    function handleDragStart(e: any, item: any) {
      dragging.value = item
    }

    function handleDragEnd(e: any, item: any) {
      dragging.value = null
      document.querySelectorAll('ul>li')[box.value].removeAttribute("class")
    }

    function handleDragOver(e: any) {
      e.dataTransfer.dropEffect = 'move'
    }

    function handleDragEnter(e: any, item: any) {
      e.dataTransfer.effectAllowed = 'move'
      if (item === dragging.value) {
        return
      }
      const newItems = [...imgList.value]
      const src = newItems.indexOf(dragging.value)
      const dst = newItems.indexOf(item)

      if (box.value !== dst) {
        document.querySelectorAll('ul>li')[box.value].removeAttribute("class")
      }

      document.querySelectorAll('ul>li')[dst].setAttribute("class", "current")
      box.value = dst
      newItems.splice(dst, 0, ...newItems.splice(src, 1))
      imgList.value = newItems
      context.emit('imgList', img(imgList.value))
    }

    function remove(index: any) {
      imgList.value.splice(index, 1)
      context.emit('imgList', img(imgList.value))
    }

    // 复制图片
    function handleCopy(param: any) {
      let transfer = document.createElement('input');
      document.body.appendChild(transfer);
      let image = param.replace('thumb', 'view')
      transfer.value = image; // 这里表示想要复制的内容
      transfer.focus();
      transfer.select();
      if (document.execCommand('copy')) {
        document.execCommand('copy');
      }
      transfer.blur();
      proxy.$hlj.message({
        msg: "复制成功"
      })
      document.body.removeChild(transfer);

    }

    // 设置封面
    function handleCover(param: any) {

      const arr = param.split("/")

      store.dispatch('common/Fetch', {
        api: 'setCover',
        data: {
          coding: props.data.coding,
          id: props.data.id,
          cover: arr[arr.length - 1]
        }
      }).then((res) => {
        if (res) {
          cover.value = arr[arr.length - 1]
          proxy.$hlj.message({
            msg: "封面设置成功"
          })
        }
      })
    }

    return {
      handleclick,
      getFile,
      imgList,
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDragEnter,
      remove,
      handleCover,
      handleCopy,
      cover,
      FileUpload
    }
  }
})
</script>

<style lang="less" scoped>
.current {
  padding: 2px;
  border: 2px dashed #fff;
}

// .ablumimg {
//   li {
//     width: 100px;
//     height: 100px;
//   }
// }

.add-button-file {
  display: inline-block;
  border-radius: 60px;
  background: #f8f8fa;
  width: 80px;
  height: 80px;
  line-height: 85px;
}
</style>
