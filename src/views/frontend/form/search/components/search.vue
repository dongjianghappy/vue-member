<template>
<div class="module-wrap mb25 p0">
  <div class="module-content p0">
      <div class="flex radius-8 relative" style="overflow: hidden; border: 1px solid #d60000">
          <i class="iconfont icon-search font32"></i>
          <input type="text" v-model="word" placeholder="输入搜索内容" class="p0" @keypress.enter="handelSearch" style="flex: 1; height:42px; font-size: 16px;" />
          <span v-if="word" class="absolute pointer" style="top: 12px; right: 90px" @click="handleClear">
            <i class="iconfont icon-close font12" />
          </span>
          <span class="searchbtn pointer" @click="handelSearch" style="background: #d60000; 
      border: 0; width:80px; height:42px; line-height: 42px; color:#fff; font-size:16px;text-align: center;">搜索</span>
      </div>
      <ul class="channel-list flex mt10">
        <li class="w50 mr15 pointer"  :class="{current: data.channel === 'all' || data.channel === ''}" @click="handelSearch('all')"><i class="iconfont icon-search m0"></i>全部</li>
        <li class="w50 mr15 pointer"  :class="{current: data.channel === 'article'}" @click="handelSearch('article')"><i class="iconfont icon-article m0"></i>文章</li>
        <li class="w50 mr15 pointer"  :class="{current: data.channel === 'tech'}" @click="handelSearch('tech')"><i class="iconfont icon-spread m0"></i>知识</li>
        <li class="w50 mr15 pointer"  :class="{current: data.channel === 'notes'}" @click="handelSearch('notes')"><i class="iconfont icon-note m0"></i>笔记</li>
        <li class="w50 mr15 pointer"  :class="{current: data.channel === 'questions'}" @click="handelSearch('questions')"><i class="iconfont icon-question m0"></i>问答</li>
        <li class="w50 mr15 pointer"  :class="{current: data.channel === 'source'}" @click="handelSearch('source')"><i class="iconfont icon-sucai m0"></i>素材</li>
        <li class="w50 mr15 pointer"  :class="{current: data.channel === 'picture'}" @click="handelSearch('picture')"><i class="iconfont icon-img m0"></i>图片</li>
        <li class="w50 mr15 pointer"  :class="{current: data.channel === 'words'}" @click="handelSearch('words')"><i class="iconfont icon-knowledge m0"></i>语录</li>
        <li class="w50 mr15 pointer"  :class="{current: data.channel === 'funny'}" @click="handelSearch('funny')"><i class="iconfont icon-smile m0"></i>搞笑</li>
      </ul>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  ref,
  watch
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const emit: any = defineEmits(['search'])
const word: any = ref('')

// 监听
watch([props.data], async (newValues, prevValues) => {
  word.value = props.data.word
})

function handleClear() {
  word.value = ""
  // props.data.word = ""
}

function handelSearch(param: any) {
  if(typeof(param) === 'string'){
    props.data.channel = param
  }
  props.data.word = word.value
  emit('search')
}
</script>


<style lang="less" scoped>
.channel-list{
  line-height: 32px;
  .current{
    background: none !important;
    border-bottom: 1px solid #d60000 ;
  }
}
</style>