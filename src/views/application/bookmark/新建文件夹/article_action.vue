<template>
<div class="module-wrap mb15">
  <div class="module-head p20">{{action === 'add' ? '写日志' : '编辑日志'}}</div>
  <div class="module-content form-wrap-box detail" style="padding: 25px 50px !important;">
    <ul>
      <li class="li">
        <span class="label">标题</span>
        <div style="display: flex">
          <div style="flex: 1">
            {{data.style}}
            <input id="title" v-model="data.title" type="text" placeholder="请输入标题" class="input-sm input-full" :style="[data.style]" />
          </div>
          <v-titleattribute :style="data.style || {}" :setStyle="setStyle" />
        </div>
      </li>
      <li class="li">
        <span class="label">标签</span>
        <TagList v-model:tags="data.tag" />
      </li>
      <li class="li">
        <span class="label">所属分类</span>
        <span class="pr15">{{data.parent}}</span><v-category name="选择分类" :data="{data, coding: '123'}" type="text" api="delete"></v-category>
      </li>
      <li class="li">
        <span class="label">预览图</span>
        <ul>
          <li v-for="(img, index) in data.img" :key="index" style="width:120px; height:120px; display: inline-block;"><img :src="img" style="width:120px; height:120px" @click="handelCopy(img)" /></li>
        </ul>

        <v-upload ref="upload" :uploadtype='mod' :img="data.img" @imgList="image" />
        <div>
          <a data-uploadtype="journal" data-temp="nineimg" class="cl-ccc" @click="uploadImg">点击上传图片</a>
          <span style=" margin-left: 25px; color:#ccc">请上传本地图片，大小不超过2MB</span>
        </div>
      </li>
    </ul>
    <div class="edit-article">
      <v-md-editor v-model="data.content" height="400px"></v-md-editor>
    </div>
    <div class="summary mt25">
      <h2 class="mb5 font18 cl-999">摘要说明</h2>
      <textarea v-model="data.summary" class="w-full"></textarea>
    </div>
    <div class="mt20">
      <v-button @onClick="save">保存</v-button>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  useStore,
  useRoute,
  watch,
  ref,
  onMounted,
  reactive,
  chooseCate
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
      proxy
    }: any = getCurrentInstance();
    const route = useRoute();
    const store = useStore();
    const data: any = ref({})
    const configData: any = ref({})
    const upload: any = ref(null);
    const mod: any = route.query.mod;
    const img = ref("")
    const basic = reactive({
      currentImg: ""
    })

    watch(() => route.query.action, () => {
      data.value = {}
    })

    // 设置属性
    function setStyle(param: any) {
      data.value.style = param
    }

    // 设置图片
    function image(a: any) {
      img.value = a
    }

    // 上传图片
    function uploadImg() {
      upload.value.handleclick()
    }

    // 监听选择分类或专辑
    function getCate(param: any) {
      data.value.parent = param.name
      data.value.fid = param.value.substring(1, param.value.substring.length)
    }

    // 初始化数据
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
          data.value.style = JSON.parse(res.result.style)
        })
      }
    }

    // 保存
    function save() {
      const {
        fid,
        title,
        tag,
        method,
        source,
        source_url,
        summary,
        style,
        content
      } = data.value

      const param: any = {
        fid,
        title,
        img: img.value,
        tag: tag && tag.length > 1 ? `|${tag.join("|")}|` : "",
        method,
        source,
        source_url,
        summary,
        style: JSON.stringify(style),
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
        proxy.$hlj.message({
          msg: res.returnMessage
        })
      })
    }

    onMounted(init)
    return {
      save,
      data,
      setStyle,
      uploadImg,
      upload,
      getCate,
      configData,
      mod,
      image,
      basic
    }
  }
})
</script>
