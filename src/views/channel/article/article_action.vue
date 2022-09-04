<template>
<div class="module-wrap mb15">
  <div class="module-head p20">
    {{action === 'add' ? '发布内容' : '编辑内容'}}
    <span class="pointer ml25" @click="handlePrev">返回</span>
  </div>
  <div class="module-content form-wrap-box detail" style="padding: 25px 50px !important;">
    <ul>
      <li class="li">
        <span class="label">标题</span>
        <div style="display: flex">
          <div style="flex: 1">
            <input id="title" v-model="detail.title" type="text" placeholder="请输入标题" class="input-sm input-full" :style="[detail.style]" />
          </div>
          <v-titleattribute :style="detail.style || {}" :setStyle="setStyle" />
        </div>
      </li>
      <li class="li">
        <span class="label">标签</span>
        <v-tag v-model:tags="detail.tag" />
      </li>

      <li class="li" v-if="!columns.includes('method')">
        <span class="label">来源方式</span>
        <v-radio label="网络分享" name="method" value="0" v-model:checked="detail.method" />
        <v-radio label="原创" name="method" value="1" v-model:checked="detail.method" />
        <v-radio label="投稿" name="method" value="2" v-model:checked="detail.method" />
      </li>
      <li class="li" v-if="!columns.includes('source')">
        <span class="label">文章来源</span>
        <input type="text" v-model="detail.source" placeholder="来源名称" class="input-sm mr10">
        <input type="text" v-model="detail.source_url" placeholder="来源地址" class="input-sm input-350">
      </li>
      <li class="li">
        <span class="label">所属分类</span>
        <span class="pr15">{{detail.parent}}</span>
        <v-category name="选择分类" :data="{item: detail, coding: coding}" type="text"></v-category>
      </li>
      <li class="li" v-if="field.album">
        <span class="label">所属专辑</span>
        <span class="pr15">{{detail.album}}</span>
        <v-category name="选择分类" :data="{item: detail, coding: '123'}" type="text"></v-category>
      </li>
      <li class="li" v-if="field.color">
        <span class="label">颜色</span>
        <v-color />
      </li>
      <li class="li" style="min-height: 150px;">
        <span class="label">预览图</span>
        <!-- <ul>
          <li v-for="(img, index) in detail.img" :key="index" style="width:120px; height:120px; display: inline-block;"><img :src="img" style="width:120px; height:120px" @click="handelCopy(img)" /></li>
        </ul> -->
        <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: 'ddd'}" :dataList="detail.img" :uploadtype="channel" @imgList="image" :style="'width: 135px'" />
        <!-- <v-upload ref="upload" :data="{id: detail.cover, coding: '123'}" :dataList="detail.img" :uploadtype="channel" @imgList="image" :style="'width: 135px'" /> -->
        <!-- <v-upload ref="upload" :uploadtype='channel' :img="detail.img" @imgList="image" /> -->
        <!-- <div>
          <a data-uploadtype="tech" data-temp="nineimg" class="cl-ccc" @click=" upload.handleclick()">点击上传图片</a>
          <span style=" margin-left: 25px; color:#ccc">请上传本地图片，大小不超过2MB</span>
        </div> -->
      </li>
    </ul>
    <div class="edit-article">
      <v-blogeditor v-model:contentsss="detail.markdown" />
    </div>
    <div class="summary mt25">
      <h2 class="mb5 font18 cl-999">摘要说明</h2>
      <textarea v-model="detail.summary" class="w-full"></textarea>
    </div>
    <div class="mt20">
      <v-button @onClick="save">保存</v-button>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  marked
} from 'marked';
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  watch,
  ref,
  reactive,
  useStore,
  useRouter,
  useRoute,
  codings
} from '@/utils'

export default defineComponent({
  name: 'ArticleView',
  props: {
    action: {
      type: String,
      default: "add"
    },
    columns: {
      type: Object,
      default: []
    },
    channel: {
      type: String,
      default: ""
    },
    field: {
      type: Object,
      default: () => {
        return {
          album: true,
          color: true
        }
      }
    }
  },
  components: {},
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const checkField = [{
      name: 'title',
      message: "标题不能为空"
    }, {
      name: 'tag',
      message: "标签不能为空"
    }, {
      name: 'fid',
      message: "请选择分类"
    }, {
      name: 'summary',
      message: "请输入摘要内容"
    }]
    const detail: any = ref({})
    const configData: any = ref({})
    const img = ref("")
    const upload: any = ref(null);
    const channel: any = props.channel;
    const coding: any = codings[props.channel]
    const basic = reactive({
      currentImg: ""
    })

    // 设置属性
    function setStyle(param: any) {
      detail.value.style = param
    }

    // 设置图片
    function image(a: any) {
      img.value = a
    }

    // 保存
    function save() {

      const {
        fid,
        pid,
        title,
        tag,
        method,
        source,
        source_url,
        summary,
        markdown,
        content,
        style
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
          pid,
          title,
          img: img.value,
          tag: tag && tag.join(',') || "",
          method,
          source,
          source_url,
          summary,
          content: marked.parse(markdown || "{}"),
          markdown,
          style: JSON.stringify(style),
          coding: coding.art,
        }
        if (props.action !== "add") {
          param.id = detail.value.id
        }
        proxy.$hlj.loading()
        store.dispatch('common/Fetch', {
          api: props.action !== "add" ? 'UpdateArticle' : "InsertArticle",
          data: {
            ...param
          }
        }).then(res => {
          proxy.$hlj.message({
            msg: res.returnMessage
          })
        })
      })

    }

    function handlePrev() {
      router.go(-1)
    }

    onMounted(() => {
      if (props.action === "edit") {
        store.dispatch('common/Fetch', {
          api: 'ArticleDetails',
          data: {
            coding: coding.art,
            id: route.query.id
          }
        }).then(res => {
          detail.value = res.result
          // detail.value.style = JSON.parse(res.result.style)
          let style = JSON.parse(detail.value.style || '{}')
          detail.value.style = style instanceof Object ? style : {}
        })
      }
    })
    return {
      save,
      detail,
      upload,
      configData,
      channel,
      coding,
      image,
      basic,
      setStyle,
      handlePrev
    }
  }
})
</script>
