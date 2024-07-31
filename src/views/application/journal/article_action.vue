<template>
<div class="module-wrap mb15">
  <div class="module-head p20">{{action === 'add' ? '写日志' : '编辑日志'}}
    <span class="pointer right font12" @click="handlePrev">返回日志列表</span>
  </div>
  <div class="module-content form-wrap-box detail" style="padding: 25px 50px !important;" :style="{background: currentPaper.color}">
    <div class="flex bg-eee p10  ptb5 ">
      <div class="flex" style="flex: 1">
        <span style=" display: inline-block;">信纸：</span>
        <span v-for="(item, index) in paper" :key="index" @click="() => currentPaper=item" style=" display: inline-block; width: 25px; height: 25px" :style="{background: item.color}">
        </span>
      </div>
      <span style=" display: inline-block; width: 70px">写模板日志</span>
    </div>
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
    <div>
      <v-visible v-model:visible="detail.visible" />
    </div>
    <div class="mt20">
      <v-button @onClick="save">保存</v-button>
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
  getCurrentInstance,
  useStore,
  useRoute,
  watch,
  ref,
  useRouter,
  onMounted,
  codings
} from '@/utils'
import TagList from '@/components/tag/index.vue'
import {
  saveTemps
} from '@/utils/serverApi'

const props: any = defineProps({
  action: {
    type: String,
    default: "add"
  }
})
const {
  proxy
}: any = getCurrentInstance();
const router = useRouter();
const coding: any = codings.talk.journal
const route = useRoute();
const store = useStore();
const detail: any = ref({})
const upload: any = ref(null);
const img = ref("")
const paper: any = ref([])
const currentPaper: any = ref({})

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
  } else {
    store.dispatch('common/Fetch', {
      api: 'articleTempList',
      data: {
        type: 'journal',
      }
    }).then(res => {
      if (res.result !== "" && res.result !== null) {
        detail.value = JSON.parse(res.result)
      }
    })
  }
}

// 信纸
function stationery() {
  store.dispatch('common/Fetch', {
    data: {
      coding: coding.stationery
    }
  }).then(res => {
    paper.value = res.result

  })
}

function handlePrev() {
  router.go(-1)
}

// 保存到草稿箱
function saveTemp() {
  saveTemps({
    type: 'journal',
    content: JSON.stringify(detail.value)
  }, proxy)
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
    visible,
    summary,
    markdown,
    style,
    paper,
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
    visible,
    summary,
    style: JSON.stringify(style),
    content: marked.parse(markdown || "{}"),
    markdown,
    paper: currentPaper.value.id,
    coding: coding.art,
  }
  if (props.action !== "add") {
    param.id = detail.value.id
  }
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

onMounted(() => {
  init()
  stationery()
})
</script>
