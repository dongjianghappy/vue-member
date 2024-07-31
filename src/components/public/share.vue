<template>
<span v-if="title" @click="handleCopy($event, data)">{{title}}</span>
<i class="iconfont" :class="`icon-${icon}`" :title="name" @click="handleCopy($event, data)" v-else></i>
</template>

<script setup lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'

const props: any = defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'copy'
  },
  name: {
    type: String,
    default: '复制'
  },
  data: {
    type: String,
    default: ""
  }
})
const {
  proxy
}: any = getCurrentInstance();

// 复制图片
function handleCopy(e: any, param: any) {
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard 向剪贴板写文本
    proxy.$hlj.message({
      type: 'info',
      msg: "已复制链接，快去分享给好友"
    })
    return navigator.clipboard.writeText(param)
  } else {
    let copy = e.target
    let divParent = copy.parentNode; //获取该div的父节点
    let input = document.createElement('input');
    divParent.insertBefore(input, copy);
    input.focus();
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
    }
    input.blur();
    proxy.$hlj.message({
      type: 'info',
      msg: "已复制链接，快去分享给好友"
    })
    input.remove();
  }

}
</script>
