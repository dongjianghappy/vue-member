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
      <li class="li">
        <span class="label">描述</span>
        <textarea v-model="detail.description" class="w-full"></textarea>
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
        <v-category name="选择分类" :data="{item: detail, coding: coding}" :isMore="true" type="text"></v-category>
      </li>
      <!--  v-if="field.album" -->
      <li class="li">
        <span class="label">所属专辑</span>
        <span class="pr15">{{detail.group}}</span>
        <v-category name="选择分类" :data="{item: detail, coding: coding.group }" :isInt="true" isGroup="true" api="customGroup" type="text"></v-category>
      </li>
      <li class="li" style="overflow: auto;">
        <span class="label">颜色</span>
        <v-color v-model:color="detail.color" />
      </li>
      <li class="li" style="overflow: auto;">
        <span class="label">预览图</span>
        <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: 'ddd'}" :dataList="detail.img || []" :uploadtype="channel" @imgList="image" :style="'width: 135px'" />
      </li>
    </ul>
    <div class="edit-article">
      <v-editor v-model:contentsss="detail.markdown" :data="detail" :coding="coding.art" />
    </div>
    <div class="summary mt25">
      <div class="mb5 font16 cl-999">摘要说明</div>
      <v-editordesc v-model:contentsss="detail.summary_markdown" :data="detail" :coding="coding.art" />
    </div>
    <div class="mt15">
      <v-visible v-model:visible="detail.visible" />
    </div>
    <div class="mt20">
      <v-button class="btn" @onClick="save">保存</v-button>
      <v-button class="btn" @onClick="saveTemp" v-if="action === 'add'">保存到草稿箱</v-button>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  marked
} from 'marked';
import {
  defineProps,
  getCurrentInstance,
  onMounted,
  ref,
  useStore,
  useRouter,
  useRoute,
  codings
} from '@/utils'

import {
  saveTemps
} from '@/utils/serverApi'

const props: any = defineProps({
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
  }
})
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
}]
const detail: any = ref({})
const img = ref("")
const upload: any = ref(null);
const coding: any = codings[props.channel]

// 设置属性
function setStyle(param: any) {
  detail.value.style = param
}

// 设置图片
function image(a: any) {
  img.value = a
}

// 保存到草稿箱
function saveTemp() {
  saveTemps({
    type: props.channel,
    content: JSON.stringify(detail.value)
  }, proxy)
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
    description,
    visible,
    summary_markdown,
    markdown,
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
      description,
      visible,
      summary: marked.parse(summary_markdown || "{}"),
      summary_markdown,
      content: marked.parse(markdown || "{}"),
      markdown,
      style: JSON.stringify(style),
      coding: coding.art,
    }
    if (props.action !== "add") {
      param.id = detail.value.id
    }
    store.dispatch('common/Fetch', {
      api: props.action !== "add" ? 'UpdateArticle' : "InsertArticle",
      data: {
        ...param
      }
    }).then(res => {
      proxy.$hlj.message({
        msg: "操作成功!"
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
      let style = JSON.parse(detail.value.style || '{}')
      detail.value.style = style instanceof Object ? style : {}
    })
  } else {
    store.dispatch('common/Fetch', {
      api: 'articleTempList',
      data: {
        type: props.channel,
      }
    }).then(res => {
      if (res.result !== "" && res.result !== null) {
        detail.value = JSON.parse(res.result)
      }
    })
  }
})
</script>
