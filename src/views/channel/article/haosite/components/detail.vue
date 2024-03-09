<template>
<v-button v-model:show="isShow">
  <i class="iconfont icon-edit" />
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" action="edit" title="网站编辑" :style="{width: 650, height: 650}" :data="{coding: data.coding, id: data.id}" :hasfooter="false">
  <template v-slot:content>
    <div class="module-wrap">
      <div class="module-content ptb0 plr25">
        <ul class="form-wrap-box">
          <li class="vertical">
            <div class="label">网站名称</div>
            <div style="display: flex">
              <div class="pr5" style="flex: 1">
                <input type="text" v-model="detail.title" class="input-sm w-full" placeholder="请输入问题名称">
              </div>
            </div>
          </li>
          <li class="vertical">
            <div class="label">网站地址</div>
            <div><input type="text" v-model="detail.url" class="input-sm w-full" placeholder="请输入问题名称"></div>
          </li>
          <li class="vertical">
            <div class="label">网站标签</div>
            <v-tag v-model:tags="detail.tag" />
          </li>
          <li class="vertical">
            <div class="label">网站简介</div>
            <div>
              <textarea class="input-textarea w-full" v-model="detail.summary" placeholder="请输入问题详情信息"></textarea>
            </div>
          </li>
          <li class="vertical">
            <div class="label">所属区域</div>
            <v-select :enums="provinceType" v-model:value="detail.province" :defaultValue="detail.province = detail.province ? detail.province : '5'" />
          </li>
          <!-- <li class="vertical">
            <div class="label">附件上传</div>
            <v-upload :dataList="detail.img || []" @imgList="image" uploadtype="website" :show="true" maxLength="3" />
            <span class="mt5 font12">{{`共${imgNum}张，还可以上传${3-imgNum}张`}}</span>
          </li> -->
        </ul>
        <div class="mt25">
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
  watch,
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
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const isShow = ref(false)
    const dialog: any = ref(null)
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

// 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await dialog.value.init()
      }
    })    

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
        id,
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
          id,
          fid,
          title,
          url,
          tag: tag && tag.join(',') || "",
          img: img.value,
          summary,
          province
        }
        store.dispatch('common/Fetch', {
          api: "UpdateArticle",
          data: {
            coding: props.data.coding,
            ...param
          }
        }).then(res => {
          props.render()
          isShow.value = false
        })
      })
    }
    return {
      detail,
      dialog,
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
