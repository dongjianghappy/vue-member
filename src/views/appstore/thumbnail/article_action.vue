<template>
  <div class="module-wrap mb15">
    <div class="module-head p20">{{action === 'add' ? '发布内容' : '编辑内容'}}</div>
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
                 class="input-sm mr10">
          <input type="text"
                 v-model="data.source_url"
                 placeholder="来源地址"
                 class="input-sm input-350">
        </li>
        <li class="li">
          <span class="label">所属分类</span>
          <span class="pr15">{{data.parent}}</span>
          <span @click="chooseCate('cate')">选择分类</span>

        </li>
        <li class="li">
          <span class="label">所属专辑</span>
          <span class="pr15">{{data.album}}</span>
          <span @click="chooseCate('album')">选择专辑</span>
        </li>
        <li class="li">
          <span class="label">颜色</span>
          <div class="color-list color-wrap"
               style="height: 30px;">
            <input field="color"
                   type="hidden"
                   value="blue">
            <a class="color"
               data-color="all"><i class="all"
                 style="border: 1px solid #eee;"></i>全部</a>
            <a class="color"
               data-color="red"><i class="red"
                 style="border: 1px solid #eee;"></i>红色</a>
            <a class="color"
               data-color="orange"><i class="orange"
                 style="border: 1px solid #eee;"></i>橙色</a>
            <a class="color"
               data-color="yellow"><i class="yellow"
                 style="border: 1px solid #eee;"></i>黄色</a>
            <a class="color"
               data-color="green"><i class="green"
                 style="border: 1px solid #eee;"></i>绿色</a>
            <a class="color"
               data-color="purple"><i class="purple"
                 style="border: 1px solid #eee;"></i>紫色</a>
            <a class="color"
               data-color="pink"><i class="pink"
                 style="border: 1px solid #eee;"></i>粉色</a>
            <a class="color"
               data-color="cyan"><i class="cyan"
                 style="border: 1px solid #eee;"></i>青色</a>
            <a class="color bg-eee"
               data-color="blue"><i class="blue"
                 style="border: 1px solid #eee;"></i>蓝色</a>
            <a class="color"
               data-color="brown"><i class="brown"
                 style="border: 1px solid #eee;"></i>棕色</a>
            <a class="color"
               data-color="white"><i class="white"
                 style="border: 1px solid #eee;"></i>白色</a>
            <a class="color"
               data-color="black"><i class="black"
                 style="border: 1px solid #eee;"></i>黑色</a>
          </div>
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
import { defineComponent, getCurrentInstance, computed, useStore, useRouter, useRoute, watch, ref, onMounted, codings, reactive } from '@/utils'
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
    const style = ref()
    const currentThem = ref()
    const data: any = ref({})
    const configData: any = ref({})
    const upload: any = ref(null);
    const mod: any = route.query.mod;
    const coding: any = codings[mod]
    const { art, } = coding
    const isShow = ref(false)
    const isShowCopy = ref(false)
    const img= ref("")
    const basic = reactive({
      currentImg: ""
    })

    watch(() => route.query.action,() => {
      data.value = {}
    })

    function init(){
      if(props.action === "edit"){
          store.dispatch('common/Fetch', {
          api: 'ArticleDetails',
          data: {
            coding: art,
            id: route.query.id
          }
      }).then(res => {
        data.value = res.result
        data.value.style = JSON.parse(res.result.style)
      })
      }
    }

    function setStyle(param: any){
      data.value.style = param
    }

    function image(a:any){
      let abc = "|"
      for(let i = 0; i < a.length; i++){
        let v = a[i].src.split("/");
        debugger
            v = v[v.length-1].split(".")[0]+"|"
        abc += v
      }
      img.value = abc
    }
    
    // 保存
    function save(){
      const { fid, pid, title, tag, method, source, source_url, summary, content, style } = data.value
      let aa = ""
      if(tag && tag.length > 1){
        aa = `|${tag.join("|")}|`
      }else{
        aa = ""
      }

      const param: any = {
        fid,
        pid,
        title,
        img: img.value,
        tag: aa,
        method,
        source,
        source_url,
        summary,
        content,
        style: JSON.stringify(style),
        coding: art,
      }
      if(props.action !== "add"){
        param.id = data.value.id
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
        console.log("ss");
      })
    }
    
    // 上传图片
    function uploadImg(){
      upload.value.handleclick()
    }

    // 监听选择分类或专辑
    function getCate(param: any){
      if(param.type === 'cate'){
        data.value.parent = param.name
        data.value.fid = param.value
      }else if(param.type === 'album'){
        data.value.pid = param.value.split("|")[1]
        data.value.album = param.name
      }
    }

    // 点击弹窗选择事件
    function chooseCate(param: any){
      if(param === 'album'){
        configData.value = {coding: 'U40001', api: 'userCategory', type:"album", name: "", value: "", title: "选择专辑"}
      }else if(param === 'cate'){
        configData.value = {coding: coding.cate, api: 'systemCate', type: "cate", name: "", value: "", title: "选择分类"}
      }
      isShow.value = true
    }

    // 复制图片
    function handelCopy(param: any){
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
      basic,
      setStyle
    }
  }
})
</script>
