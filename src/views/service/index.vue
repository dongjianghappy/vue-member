<template>
<div class="container w1100 p15">
  <div class="module-wrap">
    <div class="module-head p15">
      意见反馈
    </div>
    <div class="module-content p50">
      <div class="mb10">
        请在下面填写您遇到的问题或意见建议，描述你的问题（500字以内)，感谢您对本博客的支持!
      </div>
      <ul class="form-wrap-box">
        <li class="vertical">
          <textarea v-model="detail.content" class="w-full h150" placeholder="请输入描述(必填)" style="resize: inherit;"></textarea>
        </li>
        <li class="vertical">
          <div class="label">附件上传</div>
          <v-upload :dataList="detail.img || []" @imgList="image" uploadtype="website" :show="true" maxLength="3" />
          <span class="mt5 font12">{{`共${imgNum}张，还可以上传${3-imgNum}张`}}</span>
        </li>
      </ul>
      <div class="mt10">
        <button @click="save" class="btn btn-default cl-white" style="background: #ffc09f; border-radius: 4px;">提交反馈</button>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  getCurrentInstance,
  defineComponent,
  useStore,
  useRoute,
  ref
} from '@/utils'

export default defineComponent({
  name: 'HomeViewdddf',
  components: {},
  setup() {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const img = ref("")
    const imgNum = ref(0)
    const detail: any = ref({
      title: "",
      content: "",
      contact: ""
    })

    const checkField = [{
      name: 'content',
      message: "请输入摘要内容"
    }]

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

    // 保存
    function save() {
      const {
        title,
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
          title,
          img: img.value,
          content
        }
        store.dispatch('common/Fetch', {
          api: "feedback",
          data: {
            ...param
          }
        }).then(res => {
          proxy.$message.message({
            msg: "提交成功"
          })
          detail.value.title = ""
          detail.value.content = ""
          detail.img.value = ""
        })
      })
    }
    return {
      detail,
      save,
      handleClose,
      imgNum,
      image
    }
  }
})
</script>

<style>
body {
  background: #fff !important;
}
</style>
