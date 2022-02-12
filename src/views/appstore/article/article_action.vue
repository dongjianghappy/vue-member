<template>
  <div class="module-wrap mb15">
    <div class="module-head p20">{{action === 'add' ? '发布内容' : '编辑内容'}}</div>
    <div class="module-content form-wrap-box detail"
         style="padding: 25px 50px !important;">
      <ul>
        <li class="li">
          <span class="label">标题</span>
          <input id="title"
                 v-model="data.title"
                 type="text"
                 placeholder="请输入标题"
                 class="input-sm input-350" />
        </li>
        <li class="li">
          <span class="label">标签</span>
          <TagList v-model:tags="data.tag" />
        </li>
        <li class="li">
          <span class="label">来源方式</span>
          <span class="pr20">
            <input type="radio"
                   id="method_0"
                   value="0"
                   v-model="data.method" />
            <label for="method_0">网络分享</label>
          </span>
          <span class="pr20">
            <input type="radio"
                   id="method_1"
                   value="1"
                   v-model="data.method" />
            <label for="method_1">原创</label>
          </span>
          <span>
            <input type="radio"
                   id="method_2"
                   value="2"
                   v-model="data.method" />
            <label for="method_2">投稿</label>
          </span>
        </li>
        <li class="li">
          <span class="label">文章来源</span>
          <input type="text"
                 v-model="data.source"
                 placeholder="来源名称"
                 class="input-sm">
          <input type="text"
                 v-model="data.source_url"
                 placeholder="来源地址"
                 class="input-sm input-350">
        </li>
        <li class="li">
          <span class="label">所属分类</span>
          <span class="pr15">{{data.parent}}</span>
          <CategoryDialog name="选择分类"
                          :sourceData="data"
                          @getValue="getCate" />
        </li>
        <!--<li  class="li"><span  class="label">提供下载</span><a id="uploadfile">上传文件</a></li>-->
        <li class="li">
          <span class="label">预览图</span>
          <v-upload ref="upload"
                    uploadtype='tech' />
          <div>
            <a data-uploadtype="tech"
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
        <v-button @onClick="qqqq">保存</v-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, useStore, useRouter, useRoute, watch, ref, onMounted } from '@/utils'
import TagList from '@/components/tag/index.vue'
import CategoryDialog from '../components/CategoryDialog.vue'


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
setup(props,context) {
    const {ctx, proxy}:any = getCurrentInstance();
    const route = useRoute();
    const store = useStore();
    const showThme = ref(false)
    const style = ref("-300px")
    const currentThem = ref()
    const data: any = ref({})
const upload: any = ref(null);
   watch(() => route.query.action,() => {

data.value = {}
})

    function init(){
      if(props.action === "edit"){
          store.dispatch('common/Fetch', {
          api: 'ArticleDetails',
          data: {
            coding: "A10000",
            id: route.query.id
          }
      }).then(res => {
        data.value = res.result
      })
      }

    }
    function chooseTheme(id: any){
      currentThem.value = id
    }
    function qqqq(){

      const { fid, title, tag, method, source, source_url, summary, content } = data.value
      let aa = ""
      if(tag && tag.length > 1){
        aa = `|${tag.join("|")}|`
      }else{
        aa = ""
      }
debugger
      const param: any = {
        fid,
        title,
        tag: aa,
        method,
        source,
        source_url,
        summary,
        content,
        coding: "A10000",
      }
      if(props.action !== "add"){
        param.id = data.value.id
      }
      proxy.$loading.loading()
      store.dispatch('common/Fetch', {
          api: props.action !== "add" ? 'UpdateArticle' : "InsertArticle",
          data: {
            ...param
          }
      }).then(res => {
        proxy.$hlj.message(res.returnMessage)
        console.log("ss");
      })

    }
    function uploadImg(){
      upload.value.handleclick()
    }
    function getCate(param: any){
      data.value.parent = param.name
      data.value.fid = param.fid
    }
    init()
    // onMounted()
    return {

      chooseTheme,
      qqqq,
      style,
      data,
      uploadImg,
      upload,
      getCate
    }
  }
})
</script>
