<template>
<v-button v-model:show="isShow">
  <i class="iconfont icon-anonymous-iconfont" />博客收录申请
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="博客收录申请" :style="{width: 650, height: 600}" :hasfooter="false">
  <template v-slot:content>
    <div class="module-wrap">
      <div class="module-content ptb0 plr25">
        <ul class="form-wrap-box" style="line-height: normal;">
          <li class="vertical">
            <div class="label">名称</div>
            <div style="display: flex">
              <div class="pr5" style="flex: 1">
                <input type="text" v-model="detail.title" class="input-sm w-full" placeholder="请输入名称">
              </div>
            </div>
          </li>
          <li class="vertical">
            <div class="label">地址</div>
            <div><input type="text" v-model="detail.url" class="input-sm w-full" placeholder="请输入地址"></div>
          </li>
          <li class="vertical">
            <div class="label">标签</div>
            <v-tag v-model:tags="detail.tag" />
          </li>
          <li class="vertical">
            <div class="label">简介</div>
            <div>
              <textarea class="input-textarea w-full" v-model="detail.summary" placeholder="请输入简介信息"></textarea>
            </div>
          </li>
          <li class="vertical">
            <div class="label">所属区域</div>
            <v-select :enums="provinceType" v-model:value="detail.province" />
          </li>
          <!-- <li class="vertical">
            <div class="label">附件上传</div>
            <v-upload :dataList="detail.img || []" @imgList="image" uploadtype="website" :show="true" maxLength="3" />
            <span class="mt5 font12">{{`共${imgNum}张，还可以上传${3-imgNum}张`}}</span>
          </li> -->
        </ul>
        <div class="mt25">
          <button @click="save" class="btn" style="background: var(--input-background);
    border-radius: 30px;
    color: var(--button-font);
    width: auto;
    height: 32px;
    text-align: center;">提交</button>
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
import {
  PRIOVINCE
} from '@/assets/const'
import VueEvent from '@/utils/event'

export default defineComponent({
  name: 'HomeViewdddf',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const isShow = ref(false)
    const img = ref("")
    const imgNum = ref(0)
    const provinceType: any = PRIOVINCE
    const detail: any = ref({})

    const checkField = [{
      name: 'title',
      message: "标题不能为空"
    }, {
      name: 'summary',
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
        title,
        url,
        tag,
        summary,
        province
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
          url,
          tag: tag && tag.join(',') || "",
          img: img.value,
          summary,
          province
        }
        store.dispatch('common/Fetch', {
          api: "InsertArticle",
          data: {
            coding: props.data.coding,
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
      provinceType,
      save,
      isShow,
      handleClose,
      imgNum,
      image
    }
  }
})
</script>
