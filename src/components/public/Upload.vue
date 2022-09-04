<template>
<div>
  <!-- 频道图片上传 -->
  <div class="ablumimg p0" v-if="show">
    <ul>
      <li v-for="(item, index) in imgListsss" :key="index" class="album-wraps relative" :style="style" draggable="true" @dragend="handleDragEnd($event, item)" @dragstart="handleDragStart($event, item)" @dragenter="handleDragEnter($event, item)" @dragover.prevent="handleDragOver($event, item)">
        <img draggable="true" :src="item.src" v-if="item.status ==='complete'" />
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
      <li class="upfile" :style="style" @click="handleclick"><i class="iconfont icon-add"></i></li>
    </ul>
  </div>
  <!-- 话题图片上传 -->
  <div class="ablumimg p0" v-else>
    <ul class="p15" v-if="imgListsss.length" style="overflow: hidden;">
      <li v-for="(item, index) in imgListsss" :key="index" style="width: 100px; height: 100px;" draggable="true" @dragend="handleDragEnd($event, item)" @dragstart="handleDragStart($event, item)" @dragenter="handleDragEnter($event, item)" @dragover.prevent="handleDragOver($event, item)">
        <img draggable="true" :src="item.src" v-if="item.status ==='complete'" />
        <div class="load1" v-else>
          <div class="loader">Loading...</div>
        </div>
        <div class="cover" style="top: 0; display: none;"><i class="iconfont icon-close removeimg" @click="remove(index)"></i></div>
      </li>
      <li class="upfile" style="width: 100px; height: 100px;" @click="handleclick"><i class="iconfont icon-add"></i></li>
    </ul>
  </div>
  <input type="file" id="filElem" accept=".jpg, .jpeg, .bmp, .gif, .png, .heif, .heic" multiple="multiple" class="FileUpload_file_27ilM" style="display: none" @change="getFile">
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  reactive
} from 'vue'
import {
  useStore
} from 'vuex'
export default defineComponent({
  name: 'v-Upload',
  components: {

  },
  props: {
    uploadtype: {
      type: String,
      default: 'weibo'
    },
    style: {
      type: String,
      default: ""
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
    mask: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    },
    emitName: {
      type: String,
      default: ""
    }
  },
  emits: ['imgList'],

  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const filElem = ref("filElem")
    let imgListsss: any = ref([])
    const dragging = ref(null)
    const box: any = ref(0)
    const isShowCopy = ref(false)
    const cover: any = ref("")
    const basic = reactive({
      currentImg: ""
    })

    // 监听图片初始值
    watch(() => props.dataList, (newValues, prevValues) => {
      props.dataList.map((item) => {
        imgListsss.value.push({
          src: item,
          status: "complete"
        })
      })
      cover.value = props.data.cover
    })

    function getFile() {
      let _obj: any = document.getElementById(filElem.value);
      // var fd = new imgListsss();
      debugger
      for (let i = 0; i < _obj.files.length; i++) {
        imgListsss.value.push({
          src: _obj.files[i].name,
          status: "upload"
        })

        let fd = new FormData()
        fd.append('upload' + i, _obj.files[i])

        store.dispatch('common/uploadImg', {
          uploadtype: props.uploadtype,
          upload: true,
          data: fd,
        }).then(res => {
          debugger
          let aaa: any = imgListsss.value.filter((item: any) => item.status === "upload")
          aaa[0].status = "complete"
          aaa[0].src = res[0].img
          context.emit("imgList", img(imgListsss.value))
        })
      }
    }

    function img(data: any) {
      let abc = ""
      if (data.length) {
        abc = "|"
        for (let i = 0; i < data.length; i++) {
          let v = data[i].src.split("/");
          debugger
          // v = v[v.length - 1].split(".")[0] + "|"
          v = v[v.length - 1] + "|"
          abc += v
        }
      }

      return abc;
    }

    function handleclick() {
      let _obj: any = document.getElementById(filElem.value);
      _obj.dispatchEvent(new MouseEvent('click'))
    }

    function handleDragStart(e: any, item: any) {
      dragging.value = item
      //  e.currentTarget.children[1].style.display= "none"
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
      const newItems = [...imgListsss.value]
      const src = newItems.indexOf(dragging.value)
      const dst = newItems.indexOf(item)

      if (box.value !== dst) {
        document.querySelectorAll('ul>li')[box.value].removeAttribute("class")
      }

      document.querySelectorAll('ul>li')[dst].setAttribute("class", "current")
      box.value = dst

      console.log(dst);

      newItems.splice(dst, 0, ...newItems.splice(src, 1))
      imgListsss.value = newItems
      context.emit('imgList', img(imgListsss.value))
    }

    function remove(index: any) {
      imgListsss.value.splice(index, 1)
      context.emit('imgList', img(imgListsss.value))
    }

    // 复制图片
    function handleCopy(param: any) {
      let transfer = document.createElement('input');
      document.body.appendChild(transfer);
      transfer.value = param; // 这里表示想要复制的内容
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
      imgListsss,
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDragEnter,
      remove,
      basic,
      isShowCopy,
      handleCopy,
      handleCover,
      cover
    }
  }
})
</script>

<style scoped>
.current {
  padding: 2px;
  border: 2px dashed #fff;
}
</style>
