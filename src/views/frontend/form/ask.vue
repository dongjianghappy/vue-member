<template>
<div class="module-wrap">
    <div class="module-content plr50">
        <ul class="form-wrap-box">
            <li class="vertical">
              <textarea v-model="detail.title" class="w-full font24" placeholder="请输入问题" maxlength="30"
                    style="border-top: none; border-right: none; border-bottom: 1px solid rgb(238, 238, 238); border-left: none; border-image: initial; resize: inherit;"></textarea>
            </li>
            <li class="vertical mb25">
                <v-tag v-model:tags="detail.tag" />
            </li>
            <li class="vertical mb25">
                {{detail.parent}}
                <v-category name="选择分类" :data="{item: detail, coding: coding.cate }" :isMore="true" type="text"></v-category>
            </li>
            <li class="vertical mb25">
              <textarea v-model="detail.description" class="w-full bd-0 h150 bg-f7f8fa font18" placeholder="请输入问题描述" maxlength="250" ></textarea>
            </li>
            <li class="vertical">
                <v-editor v-model:contentsss="detail.markdown" :data="detail" :coding="coding.art" />
            </li>
            <li class="vertical">
                <div class="label">附件上传（复制图片地址到编辑器图片插入进行替换）</div>
                <v-upload ref="upload" @imgList="image" uploadtype="questions" maxLength="3" />
                <span class="mt5 font12">{{`共${imgNum}张，还可以上传${3-imgNum}张`}}</span>
            </li>
        </ul>
        <div class="mt10">
          <button class="btn btn-default cl-white"
                @click="submit"
                style="background: rgb(255, 192, 159); border-radius: 4px;">提交问题</button>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import {
  marked
} from 'marked';
import {
  getCurrentInstance,
  defineProps,
  defineEmits,
  ref,
  useStore,
  useRoute,
  onMounted,
  watch,
  codings
} from '@/utils'

const props: any = defineProps({
  disabled: {
    type: Boolean,
    default: true
  },
  buttonType: {
    type: String,
    default: "text"
  },
  show: {
    type: Boolean,
    default: false
  }
})
const emit: any = defineEmits(['update:show', 'onClick'])
const {
  proxy
}: any = getCurrentInstance();
const store = useStore()
const route: any = useRoute()
const coding: any = codings.questions
const detail: any = ref({
  fid: '',
  title: '',
  description: '',
  tag: [],
  markdown: '',
  img: ''
})
const imgNum = ref(0)
const dataList: any = ref([])

const checkField = [{
  name: 'title',
  message: "标题不能为空"
}, {
  name: 'fid',
  message: "请选择分类"
}, {
  name: 'tag',
  message: "标签不能空"
}, {
  name: 'description',
  message: "描述不能空"
}]

// 监听图片上传
function image(a: any) {
  let len = a.split("|").length
  detail.value.img = a
  if (len > 2) {
    imgNum.value = a.split("|").length - 2
  }
}

function submit() {

  proxy.$form.validate(detail.value, checkField, (valid: any, message: any) => {
    if (valid) {
      proxy.$message.message({
        msg: message
      })
      return false
    }
    const {
      fid,
      title,
      description,
      tag,
      markdown,
      img
    } = detail.value
    debugger
    store.dispatch('common/Fetch', {
      api: "InsertArticle",
      data: {
        coding: coding.art,
        fid,
        title,
        description,
        tag: tag && tag.join(',') || "",
        content: marked.parse(markdown || '{}'),
        markdown,
        img,
      }
    }).then(res => {
      detail.value.content = ""
      detail.value.markdown = ""
    })
  })
}
</script>

<style>
body{
  background: none;
}
</style>
