<template>
<div class="container w1100 pb25" style=" background: var(--module-background); border-radius: 4px;">
  <div class="module-wrap">
    <div class="module-head p15">
      意见反馈
    </div>
    <div class="module-content plr30">
      <div class="mb10">
        给博主提需求、反馈 bug。请在下面填写意见建议或问题描述(500字以内)，感谢您对本博客的支持!
      </div>
      <ul class="form-wrap-box">
        <li class="vertical send_info">
          <div class="send-input ptb0">
            <div class="send-input-box relative">
              <textarea placeholder="" v-model="detail.content" class="talkcontent-wrap" style="background: transparent; resize: none;"></textarea>
            </div>
          </div>
          <v-upload ref="upload" @imgList="image" file="talk" uploadtype="feedback" :mask="true" maxLength="3" />
          <div class="operate">
            <div class="operate-left">
              <span class="infos" @click="upload.handleclick()">
                上传图片附件
              </span>
              (<span class="mt5 font12">{{`共${imgNum}张，还可以上传${3-imgNum}张`}}</span>)
            </div>
            <div class="operate-right" style=" width: 200px;">
              <button @click="save" class="btn" :class="{disabled: !isCommit}" :disabled="!isCommit">提交</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="home plr15">
    <List :sourceData="dataList.list" />
    <div class="pt25 align_right" v-if="dataList.total > 25">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  reactive,
  computed,
  useStore,
  ref,
  onMounted
} from '@/utils'

import List from './components/index.vue'

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const isCommit = computed(() => {
  return detail.content || detail.img
});
const imgNum = ref(0)
const dataList: any = ref([])
const upload: any = ref(null);
const detail: any = reactive({
  title: "",
  content: "",
  contact: "",
  img: ""
})

const checkField = [{
  name: 'content',
  message: "请输入摘要内容"
}]

// 监听图片上传
function image(a: any) {
  let len = a.split("|").length
  detail.img = a
  if (len > 2) {
    imgNum.value = a.split("|").length - 2
  }
}

function init(param: any = {}) {

  const params: any = {
    page: 1,
    pagesize: 25
  }

  Object.assign(params, param)

  store.dispatch('common/Fetch', {
    api: "feedbackList",
    data: {
      ...params
    }
  }).then((res: any) => {
    dataList.value = res.result
  })
}

// 保存
function save() {
  const {
    title,
    content
  } = detail

  proxy.$form.validate(detail, checkField, (valid: any, message: any) => {
    if (valid) {
      proxy.$message.message({
        msg: message
      })
      return false
    }

    const param: any = {
      title,
      img: detail.img,
      content
    }
    store.dispatch('common/Fetch', {
      api: "feedback",
      data: {
        ...param
      }
    }).then(res => {
      if (res.ifSuccess === 2) {
        return
      }
      proxy.$message.message({
        msg: "提交成功"
      })
      detail.title = ""
      detail.content = ""
      detail.img = ""
      init()
    })
  })
}

onMounted(() => {
  init()
})
</script>
