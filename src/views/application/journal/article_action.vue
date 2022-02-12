<template>
  <div class="module-wrap mb15">
    <div class="module-head p20">{{action === 'add' ? '写日志' : '编辑日志'}}</div>
    <div class="module-content form-wrap-box detail"
         style="padding: 25px 50px !important;">
      <ul>
        <li class="li">
          <span class="label">标题</span>
          <div style="display: flex">
            <div style="flex: 1">
              <input id="title"
                     v-model="data.title"
                     type="text"
                     placeholder="请输入标题"
                     class="input-sm input-full"
                     :style="[data.style]" />
            </div>
            <v-titleattribute :style="data.style || {}"
                              :setStyle="setStyle" />
          </div>
        </li>
        <li class="li">
          <span class="label">标签</span>
          <TagList v-model:tags="data.tag" />
        </li>
        <li class="li">
          <span class="label">所属分类</span>
          <span class="pr15">{{data.parent}}</span>
          <span @click="chooseCate('album')">选择分类</span>

        </li>
        <li class="li">
          <span class="label">预览图</span>
          <ul>
            <li v-for="(img, index) in data.img"
                :key="index"
                style="width:120px; height:120px; display: inline-block;"><img :src="img"
                   style="width:120px; height:120px"
                   @click="handelCopy(img)" /></li>
          </ul>

          <v-upload ref="upload"
                    :uploadtype='mod'
                    :img="data.img"
                    @imgList="image" />
          <div>
            <a data-uploadtype="journal"
               data-temp="nineimg"
               class="cl-ccc"
               @click="uploadImg">点击上传图片</a>
            <span style=" margin-left: 25px; color:#ccc">请上传本地图片，大小不超过2MB</span>
          </div>
        </li>
      </ul>
      <div class="edit-article">
        <v-md-editor v-model="data.content"
                     height="400px"></v-md-editor>
      </div>
      <div class="summary mt25">
        <h2 class="mb5 font18 cl-999">摘要说明</h2>
        <textarea v-model="data.summary"
                  class="w-full"></textarea>
      </div>
      <div class="mt20">
        <v-button @onClick="save">保存</v-button>
      </div>
    </div>

    <CategoryDialog name="选择分类"
                    v-model:showFlag="isShow"
                    v-if="isShow"
                    :config="configData"
                    :sourceData="data"
                    @getValue="getCate" />
    <v-copy v-model:showFlag="isShowCopy"
            :img="basic.currentImg"
            v-if="isShowCopy" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  useStore,
  useRouter,
  useRoute,
  watch,
  ref,
  onMounted,
  codings,
  reactive
} from '@/utils'
import TagList from '@/components/tag/index.vue'
import CategoryDialog from '../../appstore/components/CategoryDialog.vue'

export default defineComponent({
  name: 'HomeViewiiii',
  props: {
    action: {
      type: String,
      default: "add"
    }
  },
  components: {
    TagList,
    CategoryDialog
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const route = useRoute();
    const store = useStore();
    const style = ref("-300px")
    const currentThem = ref()
    const data: any = ref({})
    const configData: any = ref({})
    const upload: any = ref(null);
    const mod: any = route.query.mod;
    const coding: any = codings[mod]
    // const { art, } = coding
    const isShow = ref(false)
    const isShowCopy = ref(false)
    const img = ref("")
    const basic = reactive({
      currentImg: ""
    })

    watch(() => route.query.action, () => {
      data.value = {}
    })

    function init() {
      if (props.action === "edit") {
        store.dispatch('common/Fetch', {
          api: 'Detail',
          data: {
            coding: "U20000",
            id: route.query.id
          }
        }).then(res => {
          data.value = res.result
        })
      }
    }

    function image(a: any) {
      let abc = "|"
      for (let i = 0; i < a.length; i++) {
        let v = a[i].src.split("/");
        debugger
        v = v[v.length - 1].split(".")[0] + "|"
        abc += v
      }
      img.value = abc
    }

    // 保存
    function save() {
      const {
        pid,
        title,
        tag,
        method,
        source,
        source_url,
        summary,
        content
      } = data.value
      let aa = ""
      if (tag && tag.length > 1) {
        aa = `|${tag.join("|")}|`
      } else {
        aa = ""
      }

      const param: any = {
        fid: pid,
        title,
        img: img.value,
        tag: aa,
        method,
        source,
        source_url,
        summary,
        content,
        coding: "U20000",
      }
      if (props.action !== "add") {
        param.id = data.value.id
      }
      proxy.$hlj.loading()
      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'Update' : "Insert",
        data: {
          ...param
        }
      }).then(res => {
        debugger
        proxy.$hlj.message({
          msg: res.returnMessage
        })
        console.log("ss");
      })
    }

    // 上传图片
    function uploadImg() {
      upload.value.handleclick()
    }

    // 监听选择分类或专辑
    function getCate(param: any) {
      if (param.type === 'cate') {
        data.value.parent = param.name
        data.value.fid = param.value
      } else if (param.type === 'album') {
        data.value.pid = param.value.split("|")[1]
        data.value.album = param.name
      }
    }

    // 点击弹窗选择事件
    function chooseCate(param: any) {
        configData.value = {
          coding: 'U20001',
          api: 'userCategory',
          type: "cate",
          name: "",
          value: "",
          title: "选择专辑"
        }
      isShow.value = true
    }

    // 复制图片
    function handelCopy(param: any) {
      basic.currentImg = param
      isShowCopy.value = true
    }
    onMounted(init)
    return {
      save,
      style,
      data,
      uploadImg,
      upload,
      getCate,
      chooseCate,
      isShow,
      coding,
      configData,
      mod,
      image,
      handelCopy,
      isShowCopy,
      basic
    }
  }
})
</script>
