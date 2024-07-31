<template>
<div class="font24 mb25">在线投稿</div>
<div class="p25">
  <div class="pt50 hide" style="text-align: center;">
    <v-upload ref="upload" @imgList="image" v-model:haschoose="content" :show="false" file="tougao" v-model:file="fileInfo" uploadtype="tougao" format=".zip" />
  </div>
  <ul class="form-wrap-box" style="height: auto">
    <li class="vertical">
      <input type="text" v-model="detail.title" class="input-sm w-full bd-0" placeholder="投稿标题" maxlength="30" />
    </li>

    <li class="vertical">
      <div class="label">类型</div>
      <v-select :enums="[{name: '软文', value: 'article'}, {name: '作品', value: 'work'}, {name: '特效', value: 'effect'}, {name: '动画', value: 'animate'}, {name: '设计', value: 'UI'}, {name: '摄影', value: 'image'}, {name: '教程', value: 'jiaocheng'}]" v-model:value="detail.type" :defaultValue="detail.type = detail.type ? detail.type : 'article'" />
    </li>
    <li class="vertical">
      <div class="label">说明</div>
      <textarea v-model="detail.description" class="w-full" placeholder="投稿说明(必填)"></textarea>
    </li>

    <li class="li mb25">
      <span class="label">附件上传</span>
      <div style="display: flex">
        <div style="flex: 1;">
          {{detail.file}}
        </div>
        <div class="cl-red pointer" style=" width: 60px; text-align: right" @click="upload.handleclick()">
          {{action == 'add' ? '上传' : '重新上传'}}
        </div>
      </div>
    </li>
    <li class="vertical">
      <div class="label">联系方式:</div>
      <div style="display: flex;">
        <div class="pr5" style="flex: 1 1 0%;">
          <input type="text" v-model="detail.contact" class="input-sm w-full bd-0" placeholder="请输入联系方式: QQ/Email" maxlength="30" />
        </div>
      </div>
    </li>
  </ul>
  <div class="mt10">
    <button @click="save" class="btn cl-white" style="background: var(--input-background); border-radius: 30px;">提交稿件</button>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineComponent,
  computed,
  useStore,
  useRoute,
  ref
} from '@/utils'

import VueEvent from '@/utils/event'

const store = useStore();
const route = useRoute();
const upload: any = ref(null);
const img = ref("")
const imgNum = ref(0)
const detail: any = ref({
  title: "",
  url: "",
  img: "",
  tag: "",
  summary: ""
})

// 监听图片上传
function image(a: any) {
  let len = a.split("|").length
  img.value = a
  if (len > 2) {
    imgNum.value = a.split("|").length - 2
  }
}

// 保存
function save() {
  const {
    fid,
    title,
    contact,
    type,
    description,
    content
  } = detail.value

  const param: any = {
    fid,
    title,
    type,
    contact,
    img: img.value,
    description,
    content,
    coding: "U0690005",
  }
  store.dispatch('common/Fetch', {
    api: "Insert",
    data: {
      ...param
    }
  }).then(res => {

    setTimeout(() => {
      window.postMessage("message", '*');
    }, 1000);
  })
}
</script>

<style>
body {
  background: #fff !important;
}
</style>
