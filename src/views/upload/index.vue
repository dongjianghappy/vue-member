<template>
<div class="container w1100 p15">
  <div class="module-wrap">
    <div class="module-content ptb50 plr100">
      <div class="font20 bold">上传视频</div>
      <div class="mtb25">
        请上传10MB以下的视频，请勿上传违法视频。
      </div>
      <div class="p50" style="overflow: auto; border: 1px dashed #ddd; text-align: center;" v-show="!file">
        <v-upload ref="upload" @imgList="image" v-model:haschoose="file" :show="false" file="vidoe" v-model:file="fileInfo" uploadtype="video" format=".mp4" />
      </div>
      <div v-if="file">
        <div class="mt25" style="border-bottom: 1px solid #eee; line-height: 25px;">
          <div style="display: flex">
            <div style="flex: 1;">文件名: {{fileInfo.name}} <span class="ml5">{{fileInfo.size}}</span></div>
            <div style="width: 100px; text-align: right" @click="upload.handleclick()">重新上传</div>
          </div>
          <div>
            <v-progress :data="fileInfo" />
          </div>
        </div>
        <div style="display: flex">
          <div style="width: 50%; height: 300px; text-align: center; background: #000;">
            <video ref="show_video" id="show_video" controlslist="nodownload" controls="" autoplay loop name="media" style="width: inherit; height: inherit;">
              <source :src="fileInfo.fileUrl || data.video" type="video/mp4">
            </video>
          </div>
          <div style="flex: 1; height: 300px; text-align: center; background: #000;">
            {{coverList.length}}
            <img :src="item" alt="" style="height: inherit" v-for="(item, index) in coverList" :key="index">
            <v-covercontrol @jietu="getCover" />
          </div>
        </div>
        <div class="mtb25">
          <div class="pb10">分类</div>
          <div>
            <v-select :enums="dataList" v-model:value="data.cid" :defaultValue="data.cid = data.cid ? data.cid : '1'" />
          </div>
        </div>
        <div class="send_info mt25">
          <div class="send-input">
            <div class="send-input-box relative">
              <textarea placeholder="有什么新鲜事想分享给大家？" v-model="data.summary" @focus="handleFocus($event)" @keyup="handleKeyup" class="talkcontent-wrap" style="background: transparent; resize: none;"></textarea>
            </div>
          </div>

          <!-- 操作 -->
          <div class="operate">
            <div class="operate-left">
              <span class="infos p0">
                <v-expression @onEmoji="choose" v-if="module.choose_expression" />
              </span>
              <span class="infos" v-if="module.choose_activity">
                <v-topic ref="reftopic" :data="{topicFlag: topicFlag, content: data.summary}" @onEmoji="choose" @onClick="(e)=>topicFlag = e" />
              </span>
              <span class="infos" v-if="module.choose_user">
                <v-aite ref="refaite" :data="{flag: sssss, content: data.summary}" @onEmoji="choose" @onClick="(e)=>sssss = e" />
              </span>
            </div>
            <div class="operate-right" style=" width: 200px;">
              <v-visible v-model:visible="visible" />
              <button @click="sendTalk" class="btn" :class="{disabled: !data.summary}">发送</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  useStore,
  ref,
  watch,
  computed,
  reactive,
  durationTrans,
  onMounted,
  codings
} from '@/utils'

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const coding: any = codings.talk
const img = ref("")
const module = computed(() => store.getters['user/config_talk'].talk_send_tool || []);
const fileInfo: any = ref({})
const show_video: any = ref(null)
const imgNum = ref(0)
const upload: any = ref(null);
const file: any = ref("")
const reftopic: any = ref(null)
const topicFlag: any = ref(false)
const refaite: any = ref(null)
const visible: any = ref('public')
const sssss: any = ref(false)
const dataList: any = ref([])
const coverList: any = ref([])
const data: any = reactive({
  title: "",
  summary: "",
  img: "",
})

const checkField = [{
  name: 'content',
  message: "请输入摘要内容"
}]

// 监听
watch([() => fileInfo.value.fileUrl], async (newValues: any, prevValues) => {
  show_video.value.load()
  coverList.value = []
  setTimeout(() => {

    let audio: any = document.getElementById('show_video');
    data.title = fileInfo.value.name.substring(0, fileInfo.value.name.lastIndexOf("."))
    // data.duration = show_video.value.duration
    data.format = fileInfo.value.format
    data.duration = fileInfo.value.duration
    data.time = durationTrans(fileInfo.value.duration)
    data.size = fileInfo.value.progresstotal

    let unit = data.duration / 4

    const canvas = document.createElement('canvas');
    canvas.width = 250;
    canvas.height = 500;
    const ctx: any = canvas.getContext('2d');
    ctx.drawImage(show_video.value, 0, 0, 250, 500);
    const dataBase64 = canvas.toDataURL('image/png'); // 完成base64图片的创建
    fileInfo.value.cover = dataBase64;
    if (dataBase64) {
      const imgFile = dataURLtoFile(dataBase64, `${new Date().getTime()}.png`);
      coverList.value.push(dataBase64)
    }
  }, 1000)

})

function getCover() {
  coverList.value = []
  const canvas = document.createElement('canvas');
  canvas.width = 250;
  canvas.height = 500;
  const ctx: any = canvas.getContext('2d');
  ctx.drawImage(show_video.value, 0, 0, 250, 500);
  const dataBase64 = canvas.toDataURL('image/png'); // 完成base64图片的创建
  fileInfo.value.cover = dataBase64;
  if (dataBase64) {
    const imgFile = dataURLtoFile(dataBase64, `${new Date().getTime()}.png`);
    coverList.value.push(dataBase64)
  }
}

function dataURLtoFile(dataBase64: any, filename: any) {
  const arr = dataBase64.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n: any = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime
  });
}

function handleClose() {
  window.postMessage("message", '*');
}

// 监听图片上传
function image(a: any) {
  let len = a.split("|").length
  img.value = a
  if (len > 2) {
    imgNum.value = a.split("|").length - 2
  }
}

// 选择表情或话题
function choose(param: any) {
  let word_arr = data.summary.split('#')
  let arr2 = data.summary.split('@')

  if (param[0] === '@' || (param.indexOf("@") > -1 && arr2[arr2.length - 1].indexOf(" ") === -1)) {
    if (data.summary[data.summary.length - 1] === '@') {
      let str = data.summary.substring(0, data.summary.length - 1)
      data.summary = str + param
    } else if (arr2[arr2.length - 1].indexOf(" ") === -1) {
      let index = data.summary.lastIndexOf('@' + arr2[arr2.length - 1])
      let str = data.summary.substr(0, index)
      data.summary = str + param
    } else {
      data.summary = data.summary + param
    }
  } else if (param[0] === '#' || (param.indexOf("#") > -1 && word_arr[word_arr.length - 1].indexOf(" ") === -1)) {
    if (data.summary[data.summary.length - 1] === '#') {
      let str = data.summary.substring(0, data.summary.length - 1)
      data.summary = str + param
    } else if (word_arr[word_arr.length - 1].indexOf(" ") === -1) {
      let index = data.summary.lastIndexOf('#' + word_arr[word_arr.length - 1])
      let str = data.summary.substr(0, index)
      data.summary = str + param
    } else {
      data.summary = data.summary + param
    }
  } else {
    data.summary = data.summary + param
  }
}

function handleFocus(param: any) {
  if (param.data === "@" && !sssss.value) {
    sssss.value = true
    refaite.value.click(sssss.value)
  }
}

function handleKeyup(param: any) {
  if (param.key === "@" && !sssss.value) {
    sssss.value = true
    refaite.value.click(sssss.value)
  } else if (param.key === "#" && !topicFlag.value) {
    topicFlag.value = true
    reftopic.value.click(topicFlag.value)
  }
}

function init() {
  dataList.value = []
  store.dispatch('common/Fetch', {
    data: {
      coding: coding.cate
    }
  }).then(res => {
    res.result.map((item: any) => {
      dataList.value.push({
        name: item.name,
        value: item.id
      })
    })
  })
}

// 话题发布
function sendTalk() {
  // proxy.$hlj.loading()
  store.dispatch('common/Fetch', {
    api: 'InsertTalk',
    data: {
      cid: `|${data.cid}|`,
      visible: visible.value,
      type: "video",
      img: data.img,
      summary: data.summary,
      cover: fileInfo.value.cover,
      format: data.format,
      duration: data.duration,
      time: data.time,
      size: data.size
    }
  }).then(res => {
    if (res.ifSuccess === 0) {
      proxy.$hlj.message({
        msg: res.returnMessage
      })
      return
    }
    data.summary = ""
    data.img = ""
    data.video = {}
    proxy.$message.message({
      msg: "发布成功",
      type: 'success'
    })
  })
}

onMounted(init)
</script>
