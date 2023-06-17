<template>
<v-button v-model:show="isShow">
  <i class="iconfont icon-anonymous-iconfont" />加入
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="博客申请" :style="{width: 650, height: 710}" :hasfooter="false">
  <template v-slot:content>
    <div class="module-wrap">
      <div class="module-content ptb0 plr25">
        <ul class="form-wrap-box">
          <li class="vertical">
            <div class="label">博客名称</div>
            <div style="display: flex">
              <div class="pr5" style="flex: 1">
                <input type="text" v-model="detail.name" class="input-sm w-full" placeholder="请输入问题名称">
              </div>
            </div>
          </li>
          <li class="vertical">
            <div class="label">博客地址</div>
            <div><input type="text" v-model="detail.url" class="input-sm w-full" placeholder="请输入问题名称"></div>
          </li>
          <li class="vertical">
            <div class="label">博客标签</div>
            <v-tag v-model:tags="detail.tag" />
          </li>
          <li class="vertical">
            <div class="label">博客简介</div>
            <div>
              <textarea class="input-textarea w-full" v-model="detail.description" placeholder="请输入问题详情信息"></textarea>
            </div>
          </li>
          <li class="vertical">
            <div class="label">附件上传</div>
            <v-upload :dataList="detail.img || []" @imgList="image" uploadtype="website" :show="true" maxLength="3" />
            <span class="mt5 font12">{{`共${imgNum}张，还可以上传${3-imgNum}张`}}</span>
          </li>
        </ul>
        <div class="mt10">
          <button @click="save" class="btn btn-default cl-white" style="background: #ffc09f; border-radius: 4px;">提交</button>
        </div>
      </div>
    </div>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  getCurrentInstance,
  defineComponent,
  computed,
  useStore,
  useRoute,
  ref,
  codings
} from '@/utils'

import VueEvent from '@/utils/event'

export default defineComponent({
  name: 'HomeViewdddf',
  setup() {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const isShow = ref(false)
    const img = ref("")
    const imgNum = ref(0)
    const detail: any = ref({})

    const checkField = [{
      name: 'name',
      message: "标题不能为空"
    }, {
      name: 'description',
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
        fid,
        name,
        url,
        tag,
        description
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
          name,
          url,
          tag: tag && tag.join(',') || "",
          img: img.value,
          description
        }
        store.dispatch('common/Fetch', {
          api: "InsertArticle",
          data: {
            coding: codings.user.blog_extend,
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
      detail,
      save,
      isShow,
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
