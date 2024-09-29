<template>
<i class="iconfont icon-download cl-white" style="font-size: 16px !important" @click="handleDownload"></i>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineProps,
  useStore
} from '@/utils'

const props: any = defineProps({
  data: {
    type: String,
    default: ""
  },
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore()

function addTextToImage(imageSrc: any, text: any, position: any, x: any, y: any, font: any, color: any, callback: any) {
  const img = new Image();
  img.src = imageSrc;
  img.onload = function () {
    const canvas: any = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx: any = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    ctx.font = font || '20px Arial';
    ctx.fillStyle = color || 'white';

    // 将文本节点添加到canvas元素中
    let texts = document.createTextNode(text)
    canvas.appendChild(texts)

    // 获取文本的宽度和高度
    let w = canvas.getContext("2d").measureText(texts.textContent).width
    let h = canvas.getContext("2d").measureText(texts.textContent).height
    switch (position) {
      case 'left':
        x = 15
        y = img.height - 15
        break;
      case 'center':
        x = img.width / 2 - Math.floor(w) / 2
        y = img.height - 15
        break;
      case 'right':
        x = img.width - Math.floor(w) - 15
        y = img.height - 15
        break;
    }
    ctx.fillText(text, x || 10, y || img.height - 10);
    position
    callback(canvas.toDataURL());
  };
}

function downloadFile(url: any) {
  const dom = document.createElement('a')
  dom.href = url
  debugger
  let file = props.data.file.split("/")
  dom.download = file[file.length - 1]
  dom.style.display = 'none'
  document.body.appendChild(dom)

  // 触发点击事件
  dom.click()

  // 释放资源
  URL.revokeObjectURL(dom.href)
}

function downloadBlob(param: any, watermark: any) {

  let blob = new Blob([param], {
    type: 'image/jpeg'
  })

  let img = URL.createObjectURL(blob)

  if (!watermark) {
    downloadFile(img)
  } else {
    const {
      uid,
      nickname
    }: any = props.data

    // 使用方法
    addTextToImage(img, `@${nickname || uid}`, watermark, 10, 800, '16px Arial', 'rgba(255, 255, 255, 0.75)', function (dataUrl: any) {
      downloadFile(dataUrl)
    });
  }

}

function download(watermark: any) {
  let file = props.data.file.split("/")
  store.dispatch('common/Fetch', {
    api: 'download',
    data: {
      id: props.data.id,
      img: file[file.length - 1],
      responseType: 'blob'
    }
  }).then((res: any) => {
    if (res.ifSuccess == -1) {
      proxy.$message.message({
        type: 'info',
        msg: res.returnMessage
      })
    } else {
      downloadBlob(res, watermark)
    }
  })
}

function handleDownload() {
  store.dispatch('common/Fetch', {
    api: 'downloadVerification',
    data: {
      id: props.data.id
    }
  }).then((res: any) => {
    if (res.ifSuccess == -1) {
      proxy.$message.message({
        type: 'info',
        msg: res.returnMessage
      })
    } else {
      download(res.result.watermark)
    }
  })
}
</script>
