<template>
<div class="module-wrap">
  <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 560px">
    <div class="mb15 font18 bold align_center">
      <span class="font16 left" @click="handleBack">
        <i class="iconfont icon-back" />
      </span>
      视频在线提取工具
    </div>
    <div class="mt25">
      <div class="col-md-8">
        <input id="title" v-model="detail.url" type="text" placeholder="请输入m3u8链接" class="input-lg input-full" />
      </div>
      <div class="col-md-2">
        <v-button buttonType="button" @click="handleDownload()">
          原格式下载
        </v-button>
      </div>
      <div class="col-md-2">
        <v-button buttonType="button" @click="handleDownload()">
          转码为MP4下载
        </v-button>
      </div>
    </div>

  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  useRouter,
  useRoute,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'AsideView',
  components: {

  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter()
    const route = useRoute()
    const coding: any = codings.code
    const detail: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "detail",
        data: {
          coding: coding.art,
          id: route.query.item
        }
      }).then(res => {
        detail.value = res.result
      })
    }

    function handleBack() {
      router.push('/tool')
    }

    function handleDownload() {
      fetch(
          detail.value.url
        )
        .then((response) => response.text())
        .then((data) => {
          // 解析 m3u8 文件，获取所有的 ts 视频链接
          const urls = parseM3u8Urls(data)
          // 合并 ts 视频
          mergeTsVideos(urls)
        })
    }

    // 2、解析 m3u8 文件，获取所有的 ts 视频链接。
    function parseM3u8Urls(m3u8Content: any) {
      const lines = m3u8Content.trim().split('\n')
      // 找到所有的 ts 视频链接
      const urls = lines.filter((line: any) => line.trim().endsWith('.ts'))
      const pattern = /^(http|https):\/\//; // 定义正则表达式模式
      for (let i = 0; i < urls.length; i++) {
          

          if (!pattern.test(urls[i])) {
            urls[i] = "https://media001.geekbang.org/16025e907d4a71ee96ba4531859c0102/"+urls[i]
          }
        // urls[i] =
        //   'https://video-lmo.xhcdn.com/token=nva=1703232000~dirs=5~hash=0205f87f49222d4634eda/media=hls4/multi=256x144:144p,426x240:240p,854x480:480p,1280x720:720p/023/657/951/' +
        //   urls[i]
      }
      return urls
    }
    // 3、合并 ts 视频。

    async function mergeTsVideos(urls: any) {
      const blobs = []
      for (const url of urls) {
        const response = await fetch(url)
        const blob = await response.blob()
        blobs.push(blob)
      }

      // 将所有的 ts 视频合并成一个 Blob
      const mergedBlob = new Blob(blobs, {
        type: 'video/mp2t'
      })
      // 创建 URL 对象，用于播放视频
      const url = URL.createObjectURL(mergedBlob)
      // 在页面中播放视频
      // const videoElement = document.createElement('video')

      // 谷歌浏览器 创建a标签 添加download属性下载
      const downloadElement = document.createElement('a')
      downloadElement.href = url
      downloadElement.target = '_blank'
      downloadElement.download = "1.mp4"
      document.body.appendChild(downloadElement)
      downloadElement.click() // 点击下载
      document.body.removeChild(downloadElement) // 下载完成移除元素
      window.URL.revokeObjectURL(url) // 释放掉blob对象



      // videoElement.src = url

      // document.body.appendChild(videoElement)
    }

    onMounted(init)
    return {
      detail,
      init,
      handleBack,
      handleDownload
    }
  }

})
</script>
