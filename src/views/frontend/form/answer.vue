<template>
  <div id="answer-page">
    <div class="p15 font24 bb" style="margin-bottom: 10px">
      <span class="answer-num">{{dataList.list && dataList.list.length || 0}}</span>人回答
    </div>
    <div class="answer-wrap">
      <div
        class="font14"
        v-for="(item, index) in dataList.list" :key="index"
        style="position: relative; padding: 5px 0px 5px 75px; min-height: 100px"
      >
        <div
          class="helped pointer radius-4"
          style="
            background: rgb(247, 248, 250);
            position: absolute;
            left: 15px;
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
          "
        >
          <span @click="handlePraise(item)"><i class="iconfont icon-like font18"></i
            ><span class="num">{{item.praise}}</span></span
          >
        </div>
        <div
          class="con-list radius-4"
          style="background: rgb(247, 248, 250); box-shadow: none"
        >
          <div class="con-wrap" style="padding-left: 60px">
            <div class="photos">
              <a :href="`/u/${item.account}/home`" target="_blank">
                <img :src="item.photos" style="width: 30px; height: 30px" />
              </a>
            </div>
            <div class="user_info pb5"><span class="username">{{item.nickname}}</span></div>
            <div class="user_from pb5">{{item.times}} 回答</div>
            <div class="user_text" v-html="item.content"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="send_info detail" style="background: rgb(247, 248, 250);">
      <v-tabs :tabs="[{name: '文本域'},{name: 'markdown编辑器'}]" v-model:index="index" :isEmit="true">
        <template v-slot:content1>
          <div class="sendtitle p0" style="color: rgb(90, 32, 85);">我来回答 TA 的问题</div>
          <div class="send-input p0">
              <div style="background: rgb(247, 248, 250); border-radius: 8px;">
                <textarea v-model="detail.content" placeholder="" class="talkcontent-wrap bg-white nobd w-full" style="background: transparent; resize: none;"></textarea>
              </div>
          </div>
        </template>
        <template v-slot:content2>
          <v-editor v-model:contentsss="detail.markdown" :data="detail" :coding="coding.answer" />
        </template>
      </v-tabs>
      <div class="operate p0 pl15"><div class="left"></div><div class="right"><div style="background: rgb(247, 248, 250); border-radius: 30px; color: rgb(102, 102, 102); width: auto; height: 32px; text-align: center;" @click="submit"> 提交答案 </div></div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  marked
} from 'marked';
import {
  defineProps,
  defineEmits,
  ref,
  useStore,
  useRoute,
  onMounted,
  watch,
  codings
} from '@/utils'

const props: any = defineProps({
  disabled: {
    type: Boolean,
    default: true
  },
  buttonType: {
    type: String,
    default: "text"
  },
  show: {
    type: Boolean,
    default: false
  }
})
const emit: any = defineEmits(['update:show', 'onClick'])
const store = useStore()
const route: any = useRoute()
const coding: any = codings.questions
const detail: any = ref({
  content: '',
  markdown: ''
})
const dataList: any = ref([])
const index: any = ref(0)

// 监听路由
watch(index, (newValues, prevValues) => {
  setTimeout(() => {
      let doc: any = document.getElementById("answer-page")
      let message = {
      type: "MSG_FROM_ABSWER",
      height: doc.clientHeight
      }
      window.parent.postMessage(message, '*');
    }, 1)
})

function init(){
  let html: any = document.getElementsByTagName("html")
  // html[0].style.overflow = "hidden"
  store.dispatch('common/Fetch', {
    api: "answerList",
    data: {
      artid: route.query.id
    }
  }).then(res => {
    dataList.value = res.result
    setTimeout(() => {
      let doc: any = document.getElementById("answer-page")
      let message = {
      type: "MSG_FROM_ABSWER",
      height: doc.clientHeight
      }
      window.parent.postMessage(message, '*');
    }, 1)
  })  
}

function handlePraise(param: any) {
  store.dispatch('common/Fetch', {
    api: 'Praise',
    data: {
      coding: coding.answer_praise,
      artid: param.id
    }
  }).then(res => {
    if (res.ifSuccess === 2) {
      return
    }
    param.praise = res.result.num
  })
}

function submit(params: any) {
  const {
    content,
    markdown
  } = detail.value
  store.dispatch('common/Fetch', {
    api: "Insert",
    data: {
      coding: coding.answer,
      artid: route.query.id,
      content: markdown ? marked.parse(markdown) : content,
      markdown,
    }
  }).then(res => {
    detail.value.content = ""
    detail.value.markdown = ""
    init()
  })
}
onMounted(() => {
  init()
})
</script>

<style>
body{
  background: none;
}
</style>
