<template>
<div class="module-wrap mb15">
  <div class="module-head p20">{{action === 'add' ? '写日志' : '编辑日志'}}
    <!-- <i class="iconfont icon-huanyuan"></i> -->
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
        <TagList v-model:tags="detail.tag" />
      </li>
      <li class="li">
        <span class="label">所属分类</span>
        <span class="pr15">{{detail.parent}}</span>
        <v-category name="选择分类" :data="{item: detail, coding: coding.cate }" :isInt="true" api="customGroup" type="text"></v-category>
      </li>
      <li class="li" style="overflow: auto;">
        <span class="label">预览图</span>
        <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: coding.art}" :dataList="detail.img || []" uploadtype="journal" @imgList="image" :style="'width: 135px'" />
      </li>
    </ul>
    <div class="edit-article">
      <v-editor v-model:contentsss="detail.markdown" />
    </div>
    <div class="summary mt25">
      <div class="mb5 cl-999">摘要说明</div>
      <textarea v-model="detail.summary" class="w-full"></textarea>
    </div>
    <div class="mt20">
      <v-button @onClick="save">保存</v-button>
      <v-button class="btn" @onClick="saveTemp" v-if="action === 'add'">保存到草稿箱</v-button>
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
  computed,
  useStore,
  useRoute,
  watch,
  ref,
  onMounted,
  reactive,
  chooseCate,
  codings
} from '@/utils'
import TagList from '@/components/tag/index.vue'
import { journal } from '@/assets/const';

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
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const coding: any = codings.talk.journal
    const route = useRoute();
    const store = useStore();
    const detail: any = ref({})
    const configData: any = ref({})
    const upload: any = ref(null);
    const mod: any = route.query.mod;
    const img = ref("")
    const basic = reactive({
      currentImg: ""
    })

    watch(() => route.query.action, () => {
      detail.value = {}
    })

    // 设置属性
    function setStyle(param: any) {
      detail.value.style = param
    }

    // 设置图片
    function image(a: any) {
      img.value = a
    }

    // 监听选择分类或专辑
    function getCate(param: any) {
      detail.value.parent = param.name
      detail.value.fid = param.value.substring(1, param.value.substring.length)
    }

    // 初始化数据
    function init() {
      if (props.action === "edit") {
        store.dispatch('common/Fetch', {
          api: 'detail',
          data: {
            coding: coding.art,
            id: route.query.id
          }
        }).then(res => {
          detail.value = res.result
          detail.value.style = JSON.parse(res.result.style)
        })
      }else{
        store.dispatch('common/Fetch', {
          api: 'articleTempList',
          data: {
            type: 'journal',
          }
        }).then(res => {
          if(res.result !== "" && res.result !== null){
            detail.value = JSON.parse(res.result)
          }
        })
      }
    }

  // 保存到草稿箱
    function saveTemp(){
      store.dispatch('common/Fetch', {
        api: "articleTempSave",
        data: {
          type: 'journal',
          content: JSON.stringify(detail.value)
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: res.returnMessage
        })
      })
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
        markdown,
        style,
        content
      } = detail.value

      const param: any = {
        fid,
        title,
        img: img.value,
        tag: tag && tag.join(',') || "",
        method,
        source,
        source_url,
        summary,
        style: JSON.stringify(style),
        content: marked.parse(markdown || "{}"),
        markdown,
        coding: coding.art,
      }
      if (props.action !== "add") {
        param.id = detail.value.id
      }
      // proxy.$hlj.loading()
      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'Update' : "Insert",
        data: {
          ...param
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "操作成功"
        })
      })
    }

    onMounted(init)
    return {
      coding,
      save,
      detail,
      setStyle,
      upload,
      getCate,
      configData,
      mod,
      image,
      basic,
      saveTemp
    }
  }
})
</script>
