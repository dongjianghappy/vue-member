<template>
<div class="module-wrap mb15">
  <div class="module-content font20 align_center" style="height: 100px; line-height: 85px">
    <v-button v-model:show="isShow" class="cl-999">
      <i class="iconfont icon-question font20 cl-999" />我要提问
    </v-button>
  </div>
</div>
<v-dialog ref="dialog" v-model:show="isShow" title="提问" :style="{width: 650, height: 710}" :hasfooter="false">
  <template v-slot:content>
    <ul class="form-wrap-box" style="height: 560px;">
      <li class="vertical">
        <textarea v-model="detail.title" class="w-full font24" placeholder="请输入问题" maxlength="30" style="border: none; border-bottom: 1px solid #eee; resize: inherit;"></textarea>
      </li>
      <li class="vertical">
        <textarea v-model="detail.summary" class="w-full" placeholder="请输入描述(必填)" style="border: none; resize: inherit;"></textarea>
      </li>
      <li class="vertical">
        <div class="label">附件上传</div>
        <v-upload ref="upload" @imgList="image" uploadtype="questions" :show="true" maxLength="3" />
        <span class="mt5 font12">{{`共${imgNum}张，还可以上传${3-imgNum}张`}}</span>
      </li>
    </ul>
    <div class="mt10">
      <button @click="save" class="btn btn-default cl-white" style="background: #ffc09f; border-radius: 4px;">提交问题</button>
    </div>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  getCurrentInstance,
  defineComponent,
  useStore,
  useRoute,
  ref,
  codings
} from '@/utils'

export default defineComponent({
  name: 'HomeViewdddf',
  components: {},
  setup() {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const coding = codings.questions
    const isShow = ref(false)
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

    const checkField = [{
      name: 'title',
      message: "标题不能为空"
    }, {
      name: 'summary',
      message: "请输入摘要内容"
    }]

    // 监听图片上传
    function image(a: any) {
      let len = a.split("|").length
      img.value = a
      if (len > 2) {
        imgNum.value = a.split("|").length - 2
      }
    }

    function handleClose() {
      window.postMessage("message", '*');
    }

    // 保存
    function save() {
      const {
        fid,
        title,
        summary,
        content
      } = detail.value

      proxy.$form.validate(detail.value, checkField, (valid: any, message: any) => {
        if (valid) {
          proxy.$message.message({
            msg: message
          })
          return false
        }

        const param: any = {
          fid,
          title,
          img: img.value,
          summary,
          content,
          coding: coding.art,
        }
        store.dispatch('common/Fetch', {
          api: "InsertArticle",
          data: {
            ...param
          }
        }).then(res => {
          proxy.$message.message({
            msg: "提交成功"
          })
          isShow.value = false
        })
      })
    }
    return {
      isShow,
      upload,
      detail,
      image,
      save,
      imgNum,
      handleClose
    }
  }
})
</script>

<style>
body {
  background: #fff !important;
}
</style>
